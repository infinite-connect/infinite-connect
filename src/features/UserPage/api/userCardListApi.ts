import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@utils/supabaseClient';

interface BusinessCardWithType {
  business_card_id: string;
  card_type: string;
}

export const userCardListApi = createApi({
  reducerPath: 'userCardListApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['userCardList'],
  endpoints: (builder) => ({
    getUserBusinessCards: builder.query<string[], string>({
      async queryFn(userId) {
        try {
          // Supabase 쿼리 실행
          const { data, error } = await supabase
            .from('business_cards')
            .select('business_card_id')
            .eq('nickname', userId) // nickname이 userId와 매칭되는 데이터 조회
            .order('is_primary', { ascending: false })
            .order('created_at', { ascending: false });

          if (error) {
            return { error: error.message };
          }

          // business_card_id 배열 반환
          return { data: data.map((card) => card.business_card_id) };
        } catch (err) {
          return { error: (err as Error).message };
        }
      },
      providesTags: (result) =>
        result
          ? result.map((id) => ({ type: 'userCardList', id }))
          : [{ type: 'userCardList', id: 'LIST' }],
    }),
    getUserBusinessCardsWithType: builder.query<BusinessCardWithType[], string>({
      async queryFn(userId) {
        try {
          // Supabase 쿼리 실행 - ID와 타입 함께 가져오기
          const { data, error } = await supabase
            .from('business_cards')
            .select('business_card_id, card_type')
            .eq('nickname', userId)
            .order('is_primary', { ascending: false })
            .order('created_at', { ascending: false });

          if (error) {
            return { error: error.message };
          }

          return { data };
        } catch (err) {
          return { error: (err as Error).message };
        }
      },
      providesTags: (result) =>
        result
          ? result.map((card) => ({ type: 'userCardList', id: card.business_card_id }))
          : [{ type: 'userCardList', id: 'LIST' }],
    }),
  }),
});

export const { useGetUserBusinessCardsQuery, useGetUserBusinessCardsWithTypeQuery } =
  userCardListApi;
