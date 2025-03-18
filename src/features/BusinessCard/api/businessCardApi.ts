import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { supabase } from '@utils/supabaseClient';

// 명함 데이터 인터페이스 (카멜 케이스)
export interface BusinessCard {
  businessCardId: string;
  cardName: string;
  fieldsOfExpertise: string;
  subExpertise: string;
  company?: string;
  interests?: string[];
  phone?: string;
  email?: string;
  linkedin?: string;
  businessWebsite?: string;
  website?: string;
  experienceYears?: number;
  viewCount?: number;
  isPublic?: boolean;
  isPrimary?: boolean;
  createdAt?: string;
  qrImageUrl?: string;
  nickname: string;
  cardType: string;
}

interface DbBusinessCard {
  business_card_id: string;
  card_name: string;
  fields_of_expertise: string;
  sub_expertise: string;
  company?: string;
  interests?: string[]; // JSON 배열로 저장된 문자열 배열
  phone?: string;
  email?: string;
  linkedin?: string;
  business_website?: string;
  website?: string;
  experience_years?: number | null;
  view_count?: number | null;
  is_public?: boolean | null;
  is_primary?: boolean | null;
  created_at?: string | null;
  qr_image_url?: string | null;
  nickname: string;
  card_type: string | null;
}

export interface User {
  userId: string;
  nickname: string;
  email: string;
  name: string;
}

export const businessCardApi = createApi({
  reducerPath: 'businessCardApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['BusinessCard', 'User'],
  endpoints: (builder) => ({
    getBusinessCardById: builder.query<BusinessCard | null, string>({
      queryFn: async (cardId) => {
        try {
          const { data, error } = (await supabase
            .from('business_cards')
            .select(
              `
              business_card_id,
              card_name,
              fields_of_expertise,
              sub_expertise,
              company,
              interests,
              phone,
              email,
              linkedin,
              business_website,
              website,
              experience_years,
              view_count,
              is_public,
              is_primary,
              created_at,
              qr_image_url,
              nickname,
              card_type
            `,
            )
            .eq('business_card_id', cardId)
            .limit(1)
            .single()) as PostgrestSingleResponse<DbBusinessCard>;

          if (error) throw error;
          if (!data) return { data: null };

          // 스네이크 케이스 -> 카멜 케이스 변환
          const transformedData: BusinessCard = {
            businessCardId: data.business_card_id,
            cardName: data.card_name,
            fieldsOfExpertise: data.fields_of_expertise,
            subExpertise: data.sub_expertise,
            company: data.company ?? '',
            interests: Array.isArray(data.interests) ? data.interests : [],
            phone: data.phone ?? '',
            email: data.email ?? '',
            linkedin: data.linkedin ?? '',
            businessWebsite: data.business_website ?? '',
            website: data.website ?? '',
            experienceYears: data.experience_years ?? 0,
            viewCount: data.view_count ?? 0,
            isPublic: data.is_public ?? true,
            isPrimary: data.is_primary ?? false,
            createdAt: data.created_at ?? '',
            qrImageUrl: data.qr_image_url ?? '',
            nickname: data.nickname ?? '',
            cardType: data.card_type ?? 'day',
          };

          return { data: transformedData };
        } catch (error) {
          // 직렬화 가능한 에러 객체로 변환
          return {
            error: {
              message: error instanceof Error ? error.message : 'Unknown error',
              name: error instanceof Error ? error.name : 'Error',
            },
          };
        }
      },
      providesTags: (_, __, cardId) => [{ type: 'BusinessCard', id: cardId }],
    }),
    getUserByNickname: builder.query<User | null, string>({
      queryFn: async (nickname) => {
        try {
          const { data, error } = (await supabase
            .from('users')
            .select('user_id, nickname, email, name')
            .eq('nickname', nickname)
            .limit(1)
            .single()) as PostgrestSingleResponse<User>;

          if (error) throw error;

          if (!data) return { data: null };

          return { data };
        } catch (error) {
          return {
            error: {
              message: error instanceof Error ? error.message : 'Unknown error',
              name: error instanceof Error ? error.name : 'Error',
            },
          };
        }
      },
      providesTags: (_, __, nickname) => [{ type: 'User', id: nickname }],
    }),
    addBusinessCard: builder.mutation<BusinessCard, { nickname: string }>({
      queryFn: async ({ nickname }) => {
        try {
          const { data, error } = await supabase
            .from('business_cards')
            .insert({
              card_name: '', // 기본값
              fields_of_expertise: '', // 기본값
              sub_expertise: '', // 기본값
              nickname, // 추가한 사람의 닉네임
              is_public: false, // 기본값으로 비공개 설정
              is_primary: false, // 대표 명함 아님
              card_type: 'day', // 기본값으로 'day'
            })
            .select()
            .single();

          if (error) throw error;

          const transformedData = {
            businessCardId: data.business_card_id,
            cardName: data.card_name,
            fieldsOfExpertise: data.fields_of_expertise,
            subExpertise: data.sub_expertise,
            company: data.company ?? '',
            interests: Array.isArray(data.interests) ? data.interests : [],
            phone: data.phone ?? '',
            email: data.email ?? '',
            linkedin: data.linkedin ?? '',
            businessWebsite: data.business_website ?? '',
            website: data.website ?? '',
            experienceYears: 0, // 기본값
            viewCount: 0, // 기본값
            isPublic: false, // 비공개
            isPrimary: false, // 대표 명함 아님
            createdAt: new Date().toISOString(), // 현재 시간
            qrImageUrl: '',
            nickname,
            cardType: 'day',
          };

          return { data: transformedData };
        } catch (error) {
          return {
            error:
              error instanceof Error
                ? { message: error.message, name: error.name }
                : { message: 'Unknown Error', name: 'Error' },
          };
        }
      },
      invalidatesTags: ['BusinessCard'],
    }),
  }),
});

export const {
  useGetBusinessCardByIdQuery,
  useAddBusinessCardMutation,
  useGetUserByNicknameQuery,
} = businessCardApi;
