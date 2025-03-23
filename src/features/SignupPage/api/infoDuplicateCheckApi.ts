import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { formatPhoneNumber } from '@utils/formatPhoneNumber';
import { supabase } from '@utils/supabaseClient';

export const infoDuplicateCheckApi = createApi({
  reducerPath: 'infoDuplicateCheck',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    checkEmailDuplicate: builder.query<boolean, string>({
      queryFn: async (email) => {
        const { data, error } = await supabase.from('users').select('email').eq('email', email);

        if (error) {
          return { error };
        }

        return { data: data.length > 0 }; // 중복된 이메일이 있으면 true 반환
      },
    }),
    checkNicknameDuplicate: builder.query<boolean, string>({
      queryFn: async (nickname) => {
        const { data, error } = await supabase
          .from('users')
          .select('nickname')
          .eq('nickname', nickname);

        if (error) {
          return { error };
        }

        return { data: data.length > 0 }; // 중복된 닉네임이 있으면 true 반환
      },
    }),
    checkPhoneNumberDuplicate: builder.query<boolean, string>({
      queryFn: async (phoneNumber) => {
        // 전화번호를 변환하여 서버에 전달
        const formattedPhoneNumber = formatPhoneNumber(phoneNumber);

        const { data, error } = await supabase
          .from('users')
          .select('phone_number')
          .eq('phone_number', formattedPhoneNumber);

        if (error) {
          return { error };
        }

        return { data: data.length > 0 }; // 중복된 전화번호가 있으면 true 반환
      },
    }),
  }),
});

export const {
  useCheckEmailDuplicateQuery,
  useLazyCheckEmailDuplicateQuery,
  useCheckNicknameDuplicateQuery,
  useLazyCheckNicknameDuplicateQuery,
  useCheckPhoneNumberDuplicateQuery,
  useLazyCheckPhoneNumberDuplicateQuery,
} = infoDuplicateCheckApi;
