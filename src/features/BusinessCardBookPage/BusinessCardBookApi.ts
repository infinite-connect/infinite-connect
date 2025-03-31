import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@utils/supabaseClient';

// following_view 테이블의 레코드 타입
interface FollowingDetailedCardRecord {
  following_card_id: string;
  following_nickname: string;
  fields_of_expertise: string;
  sub_expertise: string;
  experience_years: number;
  interests: string[];
  company: string;
  name: string;
  business_name: string;
  card_type: string;
  created_at: string;
  is_mutual_exchange: boolean;
}

// follower_view 테이블의 레코드 타입
interface FollowerDetailedCardRecord {
  follower_card_id: string;
  follower_nickname: string;
  fields_of_expertise: string;
  sub_expertise: string;
  experience_years: number;
  interests: string[];
  company: string;
  name: string;
  business_name: string;
  card_type: string;
  created_at: string;
  is_mutual_exchange: boolean;
}

// 최종 반환할 상세 카드 타입 – 모든 필드를 포함
export interface DetailedCard {
  cardId: string;
  nickname: string;
  fields_of_expertise: string;
  sub_expertise: string;
  experience_years: number;
  interests: string[];
  company: string;
  name: string;
  business_name: string;
  card_type: string;
  created_at: string;
  is_mutual_exchange: boolean;
}

export const businessCardBookApi = createApi({
  reducerPath: 'businessCardBookApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getFollowingView: builder.query<{ cards: DetailedCard[] }, { myNickname: string }>({
      queryFn: async ({ myNickname }) => {
        const { data, error } = await supabase
          .from('following_view')
          .select(
            `
            following_card_id,
            following_nickname,
            fields_of_expertise,
            sub_expertise,
            experience_years,
            interests,
            company,
            name,
            business_name,
            card_type,
            created_at,
            is_mutual_exchange
          `,
          )
          .eq('my_nickname', myNickname);
        if (error) return { error: error.message };
        // FollowingDetailedCardRecord를 DetailedCard로 매핑
        const cards: DetailedCard[] = data.map((record: FollowingDetailedCardRecord) => ({
          cardId: record.following_card_id,
          nickname: record.following_nickname,
          fields_of_expertise: record.fields_of_expertise,
          sub_expertise: record.sub_expertise,
          experience_years: record.experience_years,
          interests: record.interests,
          company: record.company,
          name: record.name,
          business_name: record.business_name,
          card_type: record.card_type,
          created_at: record.created_at,
          is_mutual_exchange: record.is_mutual_exchange,
        }));
        return { data: { cards } };
      },
    }),
    getFollowerView: builder.query<{ cards: DetailedCard[] }, { myNickname: string }>({
      queryFn: async ({ myNickname }) => {
        const { data, error } = await supabase
          .from('follower_view')
          .select(
            `
            follower_card_id,
            follower_nickname,
            fields_of_expertise,
            sub_expertise,
            experience_years,
            interests,
            company,
            name,
            business_name,
            card_type,
            created_at,
            is_mutual_exchange
          `,
          )
          .eq('my_nickname', myNickname);
        if (error) return { error: error.message };
        // FollowerDetailedCardRecord를 DetailedCard로 매핑
        const cards: DetailedCard[] = data.map((record: FollowerDetailedCardRecord) => ({
          cardId: record.follower_card_id,
          nickname: record.follower_nickname,
          fields_of_expertise: record.fields_of_expertise,
          sub_expertise: record.sub_expertise,
          experience_years: record.experience_years,
          interests: record.interests,
          company: record.company,
          name: record.name,
          business_name: record.business_name,
          card_type: record.card_type,
          created_at: record.created_at,
          is_mutual_exchange: record.is_mutual_exchange,
        }));
        return { data: { cards } };
      },
    }),
    // 나머지 엔드포인트는 기존 코드 유지…
  }),
});

export const { useGetFollowingViewQuery, useGetFollowerViewQuery } = businessCardBookApi;
