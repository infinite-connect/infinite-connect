import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@utils/supabaseClient';

export const exchangeApi = createApi({
  reducerPath: 'exchangeApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    // 1. 단방향 교환 API
    oneWayExchange: builder.mutation<
      { success: boolean },
      {
        follower_nickname: string;
        follower_card_id: string;
        following_card_id: string;
        following_nickname: string;
      }
    >({
      queryFn: async ({
        follower_nickname,
        follower_card_id,
        following_card_id,
        following_nickname,
      }) => {
        const { error } = await supabase.from('business_card_exchanges').insert({
          follower_nickname,
          follower_card_id,
          following_card_id,
          following_nickname,
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
    // 2-1. 유저 단방향 교환 조회 API (특정 유저가 대상자의 명함을 가지고 있는지 조회)
    checkAllOneWayExchange: builder.query<
      { exists: boolean },
      { follower_nickname: string; following_card_id: string }
    >({
      queryFn: async ({ follower_nickname, following_card_id }) => {
        const { data, error } = await supabase
          .from('business_card_exchanges')
          .select('*')
          .eq('follower_nickname', follower_nickname)
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
        try {
          // 1. 먼저 기존 관계를 확인 - 쿼리 구문 수정
          const { data: firstDirection, error: firstError } = await supabase
            .from('business_card_exchanges')
            .select('*')
            .eq('follower_nickname', follower_nickname)
            .eq('follower_card_id', follower_card_id)
            .eq('following_nickname', following_nickname)
            .eq('following_card_id', following_card_id);

          const { data: secondDirection, error: secondError } = await supabase
            .from('business_card_exchanges')
            .select('*')
            .eq('follower_nickname', following_nickname)
            .eq('follower_card_id', following_card_id)
            .eq('following_nickname', follower_nickname)
            .eq('following_card_id', follower_card_id);

          if (firstError || secondError) {
            return { error: firstError?.message || secondError?.message };
          }

          // 2. 삽입할 레코드 준비
          const recordsToInsert = [];

          // 첫 번째 방향이 없으면 추가
          if (!firstDirection || firstDirection.length === 0) {
            recordsToInsert.push({
              follower_nickname,
              follower_card_id,
              following_nickname,
              following_card_id,
            });
          }

          // 두 번째 방향이 없으면 추가
          if (!secondDirection || secondDirection.length === 0) {
            recordsToInsert.push({
              follower_nickname: following_nickname,
              follower_card_id: following_card_id,
              following_nickname: follower_nickname,
              following_card_id: follower_card_id,
            });
          }

          // 3. 필요한 레코드만 삽입
          if (recordsToInsert.length > 0) {
            // 한 번에 하나씩 삽입하여 오류 처리를 더 정확하게 함
            for (const record of recordsToInsert) {
              const { error: insertError } = await supabase
                .from('business_card_exchanges')
                .insert([record]);

              if (insertError) {
                console.error('삽입 오류:', insertError);
                // unique constraint 위반은 무시하고 계속 진행
                if (!insertError.message.includes('unique constraint')) {
                  return { error: insertError.message };
                }
              }
            }
          }

          return { data: { success: true } };
        } catch (err: unknown) {
          if (err instanceof Error) {
            return { error: err.message };
          }
          return { error: '알 수 없는 오류가 발생했습니다.' };
        }
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
        // 첫 번째 방향 (1->2)
        const { data: data1, error: error1 } = await supabase
          .from('business_card_exchanges')
          .select('*')
          .eq('follower_nickname', follower_nickname_1)
          .eq('follower_card_id', follower_card_id_1)
          .eq('following_nickname', follower_nickname_2)
          .eq('following_card_id', follower_card_id_2);

        // 두 번째 방향 (2->1)
        const { data: data2, error: error2 } = await supabase
          .from('business_card_exchanges')
          .select('*')
          .eq('follower_nickname', follower_nickname_2)
          .eq('follower_card_id', follower_card_id_2)
          .eq('following_nickname', follower_nickname_1)
          .eq('following_card_id', follower_card_id_1);

        if (error1 || error2) return { error: error1?.message || error2?.message };

        // 양방향 교환이 존재하는지 확인
        const exists = data1?.length > 0 && data2?.length > 0;
        return { data: { exists } };
      },
    }),
    // 5. 팔로우한 카드 ID 리스트 조회 API (기존)
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

    // 6. 팔로우하는 카드 ID 리스트 조회 API (기존)
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

    // 7. 특정 사용자가 팔로우한 모든 카드 리스트 조회 API
    getFollowedCardsByUserNickname: builder.query<
      { cards: { cardId: string; nickname: string }[] },
      { followerNickname: string }
    >({
      queryFn: async ({ followerNickname }) => {
        const { data, error } = await supabase
          .from('business_card_exchanges')
          .select('following_card_id, following_nickname')
          .eq('follower_nickname', followerNickname);

        if (error) return { error: error.message };

        const cards = data.map((record) => ({
          cardId: record.following_card_id,
          nickname: record.following_nickname,
        }));

        return { data: { cards } };
      },
    }),
    // 8. 특정 사용자를 팔로우한 모든 카드 리스트 조회 API
    getCardsFollowedByUserNickname: builder.query<
      { cards: { cardId: string; nickname: string }[] },
      { nickname: string }
    >({
      queryFn: async ({ nickname }) => {
        const { data, error } = await supabase
          .from('business_card_exchanges')
          .select('follower_card_id, follower_nickname')
          .eq('following_nickname', nickname);

        if (error) return { error: error.message };

        const cards = data.map((record) => ({
          cardId: record.follower_card_id,
          nickname: record.follower_nickname,
        }));

        return { data: { cards } };
      },
    }),
    // 9. 관계 삭제 API
    deleteExchange: builder.mutation<
      { success: boolean },
      { follower_card_id: string; following_card_id: string }
    >({
      queryFn: async ({ follower_card_id, following_card_id }) => {
        const { error } = await supabase.from('business_card_exchanges').delete().match({
          follower_card_id,
          following_card_id,
        });

        if (error) return { error: error.message };
        return { data: { success: true } };
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
  useGetFollowedCardsByUserNicknameQuery,
  useGetCardsFollowedByUserNicknameQuery,
  useDeleteExchangeMutation,
  useCheckAllOneWayExchangeQuery,
} = exchangeApi;
