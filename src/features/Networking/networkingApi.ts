import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@utils/supabaseClient';

// 리스트 페이지에서 보여줄 타입
export interface BusinessCardList {
  business_card_id: string;
  nickname: string;
  business_name: string;
  fields_of_expertise: string;
  sub_expertise: string;
}

// 명함 상세 정보 타입
export interface BusinessCard {
  business_card_id: string;
  nickname: string;
  card_name: string;
  fields_of_expertise: string;
  sub_expertise: string;
  interests?: string;
  company?: string;
  phone?: string;
  email?: string;
  linkedin?: string;
  website?: string;
  experience_years?: number;
  view_count?: number;
  is_public: boolean;
  is_primary: boolean;
  created_at: string;
  qr_image_url?: string;
  business_name?: string;
}

// 명함 공개 여부 타입
export interface BusinessCardVisibility {
  business_card_id: string;
  is_public: boolean;
  is_primary: boolean;
}

// 🔹 RTK Query API 생성
export const networkingApi = createApi({
  reducerPath: 'networkingApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Networking', 'BusinessCard'],
  endpoints: (builder) => ({
    // ✅ 네트워킹 리스트 가져오기 (로그인한 사용자 제외 + 공개된 명함만 조회)
    getNetworkingList: builder.query<BusinessCardList[], string>({
      async queryFn(loggedInNickname: string) {
        try {
          // RPC 함수를 호출하여 로그인 사용자의 닉네임을 전달
          const { data, error } = await supabase.rpc('get_filtered_networking_list', {
            p_nickname: loggedInNickname,
          });
          if (error) throw error;
          return { data };
        } catch (error) {
          return { error };
        }
      },
      providesTags: [{ type: 'Networking', id: 'LIST' }],
    }),

    // 이 api는 명함 상세 페이지에 사용되는 api여서 나중에 위치 이동이 필요하다고 생각
    // ✅ 특정 비즈니스 명함 정보 가져오기 (비즈니스 카드 ID 기반 조회)
    getBusinessCard: builder.query<BusinessCard | null, string>({
      async queryFn(businessCardId) {
        try {
          const { data, error } = await supabase
            .from('business_cards')
            .select(
              `
              business_card_id, nickname, card_name, fields_of_expertise, sub_expertise, 
              company, phone, email, linkedin, website, experience_years, view_count,  
              is_public, is_primary, created_at, qr_image_url, business_name, interests
            `,
            )
            .eq('business_card_id', businessCardId) // 🔹 특정 명함 ID로 조회
            .single();

          if (error) throw error;

          if (!data) return { data: null };

          return { data };
        } catch (error) {
          return { error };
        }
      },
      providesTags: (result) =>
        result ? [{ type: 'BusinessCard', id: result.business_card_id }] : [],
    }),

    // ✅ 로그인한 사용자의 대표 명함 공개 여부 확인 API (is_public & is_primary 체크)
    checkUserBusinessCardVisibility: builder.query<BusinessCardVisibility | null, string>({
      async queryFn(nickname) {
        try {
          const { data, error } = await supabase
            .from('business_cards')
            .select('business_card_id, is_public, is_primary')
            .eq('nickname', nickname)
            .eq('is_primary', true) // 대표 명함만 조회
            .single();

          if (error) throw error;

          if (!data) return { data: null };

          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),

    // 명함 공개 여부 업데이트 API
    updateBusinessCardVisibility: builder.mutation<
      { success: boolean },
      { business_card_id: string; is_public: boolean }
    >({
      async queryFn({ business_card_id, is_public }) {
        try {
          // 현재 공개 상태 확인
          const { data: currentData, error: fetchError } = await supabase
            .from('business_cards')
            .select('is_public')
            .eq('business_card_id', business_card_id)
            .single();

          if (fetchError) throw fetchError;
          if (currentData?.is_public === is_public) {
            return { data: { success: true } };
          }

          // 공개 여부 업데이트
          const { error } = await supabase
            .from('business_cards')
            .update({ is_public })
            .eq('business_card_id', business_card_id);

          if (error) throw error;
          return { data: { success: true } };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: [{ type: 'Networking', id: 'LIST' }],
    }),
  }),
});

// 🔹 React에서 사용할 훅 생성
export const {
  useGetNetworkingListQuery,
  useGetBusinessCardQuery,
  useCheckUserBusinessCardVisibilityQuery,
  useUpdateBusinessCardVisibilityMutation,
} = networkingApi;
