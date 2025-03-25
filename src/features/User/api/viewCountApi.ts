import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@utils/supabaseClient';

export const viewCountApi = createApi({
  reducerPath: 'viewCountApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['ViewCount'],
  endpoints: (builder) => ({
    incrementViewCount: builder.mutation<void, { nickname: string; businessCardId: string }>({
      async queryFn({ nickname, businessCardId }) {
        try {
          // Supabase RPC 호출
          const { data, error } = await supabase.rpc('increment_view_count', {
            input_nickname: nickname, // 현재 접속 중인 유저의 닉네임
            input_business_card_id: businessCardId!,
          });

          if (error) {
            return { error: error.message };
          }

          return { data };
        } catch (err) {
          return { error: (err as Error).message };
        }
      },
      invalidatesTags: [{ type: 'ViewCount', id: 'LIST' }],
    }),
  }),
});

export const { useIncrementViewCountMutation } = viewCountApi;
