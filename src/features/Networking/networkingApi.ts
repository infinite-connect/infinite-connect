import { CardType } from '@components/SelectCardDesignPage/types';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@utils/supabaseClient';

// 리스트 페이지에서 보여줄 타입
export interface BusinessCardList {
  business_card_id: string;
  nickname: string;
  business_name: string;
  fields_of_expertise: string;
  sub_expertise: string;
  card_type: 'dawn' | 'morning' | 'day' | 'evening' | 'night';
}

// 명함 상세 정보 타입
export interface BusinessCard {
  business_card_id: string;
  department?: string;
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
  name: string;
  card_type: CardType;
}

// 명함 공개 여부 및 사용자 직무, 세무직무 타입
export interface BusinessCardVisibility {
  business_card_id: string;
  is_public: boolean;
  is_primary: boolean;
  fields_of_expertise: string;
  sub_expertise: string;
  card_type: 'dawn' | 'morning' | 'day' | 'evening' | 'night';
  interests?: string[];
}

export interface AllPrimaryBusinessCardList {
  business_card_id: string;
  nickname: string;
  business_name: string;
  name: string;
  department: string;
  fields_of_expertise: string;
  sub_expertise: string;
  card_type: 'dawn' | 'morning' | 'day' | 'evening' | 'night';
  interests?: string[];
}

// 🔹 RTK Query API 생성
export const networkingApi = createApi({
  reducerPath: 'networkingApi',
  baseQuery: fakeBaseQuery<unknown>(), // 여기서 제네릭 타입 인수를 추가
  tagTypes: ['Networking', 'BusinessCard'],
  endpoints: (builder) => ({
    // 하루 상위 5개 조회수 높은거 카드 아이디 값 가져오기.
    getTop5DailyIds: builder.query<
      { business_card_id: string; daily_view_count: number }[],
      { sub: string }
    >({
      async queryFn({ sub }) {
        try {
          const { data, error } = await supabase
            .from('daily_top_5_by_expertise')
            .select(
              `
          business_card_id,
          daily_view_count
        `,
            )
            .eq('sub_expertise', sub)
            .order('daily_view_count', { ascending: false })
            .limit(5);
          if (error) throw error;
          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),
    getBusinessCard: builder.query<BusinessCard | null, string>({
      async queryFn(businessCardId) {
        try {
          const { data, error } = await supabase
            .from('business_cards')
            .select(
              `
              business_card_id, nickname, card_name, fields_of_expertise, sub_expertise, 
              company, phone, email, website, experience_years, view_count, name, department,
              is_public, is_primary, created_at, business_name, interests, card_type
              `,
            )
            .eq('business_card_id', businessCardId)
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
    // 로그인한 사용자의 대표 명함이 공개인지 확인 및 직무, 세무직무, 카드타입 가져오기.
    checkUserBusinessCardVisibility: builder.query<BusinessCardVisibility | null, string>({
      async queryFn(nickname) {
        try {
          const { data, error } = await supabase
            .from('business_cards')
            .select(
              'business_card_id, fields_of_expertise, sub_expertise, is_public, is_primary, card_type, interests',
            )
            .eq('nickname', nickname)
            .eq('is_primary', true)
            .single();
          if (error) throw error;
          if (!data) return { data: null };
          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),
    // 사용자 공개할래요 누를시 대표명함 공개로 전환 하는 api
    updateBusinessCardVisibility: builder.mutation<
      { success: boolean },
      { business_card_id: string; is_public: boolean }
    >({
      async queryFn({ business_card_id, is_public }) {
        try {
          const { data: currentData, error: fetchError } = await supabase
            .from('business_cards')
            .select('is_public')
            .eq('business_card_id', business_card_id)
            .single();
          if (fetchError) throw fetchError;
          if (currentData?.is_public === is_public) {
            return { data: { success: true } };
          }
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
    // 로그인한 유저와 네트워킹 타입이 같은 사람 요청 api
    getSameCardTypeUsers: builder.query<
      BusinessCardList[],
      { cardType: string; excludeNickname: string }
    >({
      async queryFn({ cardType, excludeNickname }) {
        try {
          const { data, error } = await supabase
            .from('business_cards')
            .select(
              `
            business_card_id,
            nickname,
            business_name,
            name,
            fields_of_expertise,
            sub_expertise,
            department,
            card_type
          `,
            )
            .eq('card_type', cardType)
            .neq('nickname', excludeNickname)
            .eq('is_public', true) // 공개된 명함만 보고 싶다면
            .eq('is_primary', true)
            .limit(15); // 원하는 만큼 제한
          if (error) throw error;
          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),
    // ✅ user_primary_business 테이블에서 전체 목록 (로그인 유저 제외) + interests
    getUserAllPrimaryBusinessList: builder.query<AllPrimaryBusinessCardList[], string>({
      async queryFn(excludeNickname) {
        try {
          // user_primary_business 테이블에서 nickname != excludeNickname
          const { data, error } = await supabase
            .from('user_primary_business_cards')
            .select(
              `
            business_card_id,
            nickname,
            name,
            business_name,
            fields_of_expertise,
            department,
            sub_expertise,
            card_type,
            interests
          `,
            )
            .neq('nickname', excludeNickname);
          if (error) throw error;
          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),
    // 로그인한 사용자 모든 명함의 조회수,카드타입 가져오기 API
    getUserCardsViewCounts: builder.query<
      {
        business_card_id: string;
        view_count: number;
        card_type: CardType;
        card_name: string;
        is_primary: boolean;
      }[],
      string
    >({
      async queryFn(nickname: string) {
        try {
          const { data, error } = await supabase
            .from('business_cards')
            .select('business_card_id, view_count, card_type, card_name, is_primary')
            .eq('nickname', nickname);
          if (error) throw error;
          return { data: data || [] };
        } catch (error) {
          return { error: error instanceof Error ? error.message : 'Unknown error' };
        }
      },
    }),
    // businessCardId로 interests 값을 가져오는 API
    getCardInterests: builder.query<string[], string>({
      async queryFn(businessCardId) {
        try {
          const { data, error } = await supabase
            .from('business_cards')
            .select('interests')
            .eq('business_card_id', businessCardId)
            .single();
          if (error) throw error;
          // data.interests가 null이면 빈 배열로 반환
          return { data: data?.interests || [] };
        } catch (error) {
          return { error: error instanceof Error ? error.message : 'Unknown error' };
        }
      },
    }),
  }),
});
// 🔹 React에서 사용할 훅 생성
export const {
  useGetTop5DailyIdsQuery,
  useGetBusinessCardQuery,
  useCheckUserBusinessCardVisibilityQuery,
  useUpdateBusinessCardVisibilityMutation,
  useGetSameCardTypeUsersQuery,
  useGetUserAllPrimaryBusinessListQuery,
  useGetUserCardsViewCountsQuery,
  useGetCardInterestsQuery,
} = networkingApi;
