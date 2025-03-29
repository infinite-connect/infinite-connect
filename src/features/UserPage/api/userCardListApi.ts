import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@utils/supabaseClient';

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
  }),
});

export const { useGetUserBusinessCardsQuery } = userCardListApi;
