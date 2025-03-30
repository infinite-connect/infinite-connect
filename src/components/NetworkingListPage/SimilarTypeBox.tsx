import React from 'react';
import NetworkType from './UI/NetworkTypeCircle';
import SeparationLine from './UI/SeparationLine';
import { CardType } from '@components/SelectCardDesignPage/types';
import { useNavigate } from 'react-router-dom';

/** API로부터 가져온 각 사용자 카드 타입 */
interface UserCardItem {
  business_card_id: string;
  nickname: string;
  business_name: string;
  fields_of_expertise: string;
  sub_expertise: string;
  card_type: string; // 'dawn' | 'morning' | 'day' | 'evening' | 'night'
  department?: string; // 부서가 있을 수도, 없을 수도
}

/** 한 박스에 들어갈 최대 3개의 사용자 목록 */
interface SimilarTypeBoxProps {
  items: UserCardItem[];
}

/**
 * 한 박스(SimilarTypeBox) 안에 최대 3명의 사용자 정보를 표시
 */
const SimilarTypeBox: React.FC<SimilarTypeBoxProps> = ({ items }) => {
  const navigate = useNavigate();

  return (
    <div className="w-[320px] px-[16px] flex-col bg-[rgba(255,255,255,0.07)] rounded-sm">
      {items.map((user, idx) => (
        <React.Fragment key={user.business_card_id}>
          <div
            onClick={() => {
              navigate(`/${user.nickname}/${user.business_card_id}`);
            }}
            className="py-[16px]"
          >
            {/* 상단부 */}
            <div className="flex flex-row items-center justify-between w-full">
              <div className="flex">
                {/* 네트워킹 타입 아이콘 */}
                <NetworkType cardType={user.card_type as CardType} />
                <span className="flex text-[14px] ml-[4px] font-bold font-[Roboto] not-italic uppercase">
                  {user.fields_of_expertise}
                </span>
              </div>
              {/* 이름 or 닉네임 or business_name */}
              <span>{user.business_name || user.nickname}</span>
            </div>

            {/* 중단부 (직무/부서) */}
            <div className="flex flex-row mb-[14px] items-center">
              <span className="text-[14px] font-[Inter] not-italic font-medium mr-[6px]">
                {user.sub_expertise}
              </span>
              <SeparationLine />
              <span className="text-[14px] font-[Inter] not-italic font-medium ml-[6px]">
                {user.department || 'Engineering팀'}
              </span>
            </div>

            {/* 하단부 */}
            <div className="flex flex-row justify-between">
              <span className="font-[Inter] text-[10px] font-medium">Infinite Connect</span>
            </div>
          </div>

          {/* 아이템들 사이에 구분선 (마지막 아이템 뒤에는 표시 X) */}
          {idx < items.length - 1 && <hr className="border-t border-t-[rgba(255,255,255,0.5)]" />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default SimilarTypeBox;
