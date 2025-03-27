// userCardApi.ts
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@utils/supabaseClient';

export const exchangeApi = createApi({
  reducerPath: 'exchangeApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    // 1. 단방향 교환 API
    oneWayExchange: builder.mutation<
      { success: boolean },
      { follower_nickname: string; follower_card_id: string; following_card_id: string }
    >({
      queryFn: async ({ follower_nickname, follower_card_id, following_card_id }) => {
        const { error } = await supabase.from('business_card_exchanges').insert({
          follower_nickname,
          follower_card_id,
          following_card_id,
        });
        if (error) return { error: error.message };
        return { data: { success: true } };
      },
    }),

    // 2. 단방향 교환 조회 API
    checkOneWayExchange: builder.query<
      { exists: boolean },
      { follower_nickname: string; follower_card_id: string; following_card_id: string }
    >({
      queryFn: async ({ follower_nickname, follower_card_id, following_card_id }) => {
        const { data, error } = await supabase
          .from('business_card_exchanges')
          .select('*')
          .eq('follower_nickname', follower_nickname)
          .eq('follower_card_id', follower_card_id)
          .eq('following_card_id', following_card_id);
        if (error) return { error: error.message };
        return { data: { exists: data.length > 0 } };
      },
    }),

    // 3. 쌍방향 교환 API
    twoWayExchange: builder.mutation<
      { success: boolean },
      {
        follower_nickname: string;
        following_nickname: string;
        follower_card_id: string;
        following_card_id: string;
      }
    >({
      queryFn: async ({
        follower_nickname,
        following_nickname,
        follower_card_id,
        following_card_id,
      }) => {
        const { error } = await supabase.from('business_card_exchanges').insert([
          {
            follower_nickname,
            follower_card_id,
            following_card_id,
          },
          {
            follower_nickname: following_nickname,
            follower_card_id: following_card_id,
            following_card_id: follower_card_id,
          },
        ]);
        if (error) return { error: error.message };
        return { data: { success: true } };
      },
    }),

    // 4. 쌍방향 교환 조회 API
    checkTwoWayExchange: builder.query<
      { exists: boolean },
      {
        follower_nickname_1: string;
        follower_card_id_1: string;
        follower_nickname_2: string;
        follower_card_id_2: string;
      }
    >({
      queryFn: async ({
        follower_nickname_1,
        follower_card_id_1,
        follower_nickname_2,
        follower_card_id_2,
      }) => {
        const { data, error } = await supabase
          .from('business_card_exchanges')
          .select('*')
          .or(
            `follower_nickname.eq.${follower_nickname_1},follower_card_id.eq.${follower_card_id_1},following_card_id.eq.${follower_card_id_2}`,
          )
          .or(
            `follower_nickname.eq.${follower_nickname_2},follower_card_id.eq.${follower_card_id_2},following_card_id.eq.${follower_card_id_1}`,
          );
        if (error) return { error: error.message };
        return { data: { exists: data.length === 2 } }; // 두 레코드가 존재해야 쌍방향 교환으로 간주
      },
    }),

    // 5. 팔로우한 카드 ID 리스트 조회 API
    getFollowersByCardId: builder.query<{ cardIds: string[] }, { cardId: string }>({
      queryFn: async ({ cardId }) => {
        const { data, error } = await supabase
          .from('business_card_exchanges')
          .select('follower_card_id')
          .eq('following_card_id', cardId);
        if (error) return { error: error.message };
        const cardIds = data.map((record) => record.follower_card_id);
        return { data: { cardIds } };
      },
    }),

    // 6. 팔로우하는 카드 ID 리스트 조회 API
    getFollowingByCardId: builder.query<{ cardIds: string[] }, { cardId: string }>({
      queryFn: async ({ cardId }) => {
        const { data, error } = await supabase
          .from('business_card_exchanges')
          .select('following_card_id')
          .eq('follower_card_id', cardId);
        if (error) return { error: error.message };
        const cardIds = data.map((record) => record.following_card_id);
        return { data: { cardIds } };
      },
    }),
  }),
});

export const {
  useOneWayExchangeMutation,
  useCheckOneWayExchangeQuery,
  useTwoWayExchangeMutation,
  useCheckTwoWayExchangeQuery,
  useGetFollowersByCardIdQuery,
  useGetFollowingByCardIdQuery,
} = exchangeApi;
