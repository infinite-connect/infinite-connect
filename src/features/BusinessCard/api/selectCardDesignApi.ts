import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@utils/supabaseClient';

export const selectCardDesignApi = createApi({
  reducerPath: 'selectCardDesignApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['BusinessCard'],
  endpoints: (builder) => ({
    // 명함 타입 업데이트 API
    updateBusinessCardType: builder.mutation<void, { cardId: string; cardType: string }>({
      async queryFn({ cardId, cardType }) {
        try {
          // Supabase를 이용해 데이터 업데이트
          const { error } = await supabase
            .from('business_cards')
            .update({ card_type: cardType }) // 업데이트할 필드
            .eq('business_card_id', cardId); // 조건: business_card_id가 일치

          if (error) {
            return { error: error.message }; // 오류 반환
          }

          return { data: undefined }; // 성공 시 반환값 없음
        } catch (err) {
          return { error: (err as Error).message }; // 예상치 못한 오류 처리
        }
      },
      invalidatesTags: (_, error, { cardId }) =>
        error ? [] : [{ type: 'BusinessCard', id: cardId }],
    }),
  }),
});

export const { useUpdateBusinessCardTypeMutation } = selectCardDesignApi;
