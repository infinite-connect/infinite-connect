// userCardApi.ts
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@utils/supabaseClient';

// 명함 추가(스캔) 시 필요한 파라미터 타입 정의
export interface ConnectionInsert {
  owner_id: string; // 명함 주인(상대방)의 닉네임 (고정 유니크 식별자)
  scanner_id: string; // 명함을 추가하는(스캔한) 사용자 닉네임
  business_card_id: string; // 추가되는 명함의 고유 ID
  exchange_method?: string; // 'ONLINE' (온라인 시나리오)
  status?: string; // 'active'
}

// 사용자가 추가하려는 명함 정보 타입
export interface Connection {
  connection_id: string;
  owner_id: string;
  scanner_id: string;
  business_card_id: string;
  status: string;
  exchange_method: string;
}

export const userCardApi = createApi({
  reducerPath: 'userCardApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    createConnection: builder.mutation<{ success: boolean }, ConnectionInsert>({
      async queryFn(connectionData) {
        try {
          const { error } = await supabase
            .from('connections')
            .insert({
              ...connectionData,
              status: connectionData.status ?? 'active',
              exchange_method: connectionData.exchange_method ?? 'online',
            })
            .select();
          if (error) throw error;
          return { data: { success: true } };
        } catch (error) {
          return { error };
        }
      },
    }),
    // 현재 로그인 사용자가 해당 명함을 이미 추가했는지 확인하는 Query
    getConnection: builder.query<
      Connection | null,
      { scanner_id: string; business_card_id: string }
    >({
      async queryFn({ scanner_id, business_card_id }) {
        try {
          const { data, error } = await supabase
            .from('connections')
            .select('*')
            .eq('scanner_id', scanner_id)
            .eq('business_card_id', business_card_id)
            .maybeSingle();
          if (error) throw error;
          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const { useCreateConnectionMutation, useGetConnectionQuery } = userCardApi;
