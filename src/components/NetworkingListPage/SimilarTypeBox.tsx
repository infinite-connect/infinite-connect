import React from 'react';
import { useNavigate } from 'react-router-dom';
import NetworkType from './UI/NetworkTypeCircle';
import SeparationLine from './UI/SeparationLine';
import { maskName } from '@utils/formatName';

export interface UserCardItem {
  business_card_id: string;
  nickname: string;
  business_name: string;
  fields_of_expertise: string;
  sub_expertise: string;
  card_type: 'dawn' | 'morning' | 'day' | 'evening' | 'night';
  department?: string;
  name: string;
}

interface SimilarTypeBoxProps {
  items: UserCardItem[];
}

/**
 * 한 박스 안에 최대 3명의 사용자 정보를 표시하는 컴포넌트
 */
const SimilarTypeBox: React.FC<SimilarTypeBoxProps> = ({ items }) => {
  const navigate = useNavigate();

  return (
    <div className="w-[320px] px-[16px] flex-col bg-[rgba(255,255,255,0.07)] rounded-sm">
      {items.map((user, idx) => {
        // 비즈니스 네임이 있으면 그대로 사용, 없으면 이름을 마스킹 처리
        const displayName =
          user.business_name && user.business_name.trim() !== ''
            ? user.business_name
            : maskName(user.name);
        return (
          <React.Fragment key={user.business_card_id}>
            <div
              onClick={() => navigate(`/${user.nickname}/${user.business_card_id}`)}
              className="py-[16px] cursor-pointer"
            >
              {/* 상단부 */}
              <div className="flex flex-row items-center justify-between w-full">
                <div className="flex">
                  <NetworkType cardType={user.card_type} />
                  <span className="flex text-[14px] ml-[4px] font-bold font-[Roboto] not-italic uppercase">
                    {user.fields_of_expertise}
                  </span>
                </div>
                {/* 비즈니스 네임이 있으면 그것, 없으면 마스킹된 이름 */}
                <span>{displayName}</span>
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

            {/* 아이템들 사이 구분선 (마지막 아이템 제외) */}
            {idx < items.length - 1 && <hr className="border-t border-t-[rgba(255,255,255,0.5)]" />}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default SimilarTypeBox;
