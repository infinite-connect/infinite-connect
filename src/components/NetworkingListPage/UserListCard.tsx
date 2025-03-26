import React from 'react';
import PopularIcon from './UI/PopularIcon';
import SeparationLine from './UI/SeparationLine';

interface UserListCardProps {
  imageUrl: string;
  mainLabel: string; // 예: "DEVELOPMENT"
  name: string; // 예: "Anna"
  badge?: string; // 예: "인기있는"
}

const UserListCard: React.FC<UserListCardProps> = ({ imageUrl, mainLabel, name, badge }) => {
  return (
    <div className="w-full flex flex-row justify-between rounded-md bg-[rgba(255,255,255,0.07)] px-[18px] py-[14px] text-white">
      {/* 이미지 영역 (16:9 비율 예시) */}
      <div className="flex w-full flex-row gap-[10px]">
        <div className="aspect-[49/66] w-[80px] flex-shrink-0 relative">
          <img src={imageUrl} alt="user" className="object-cover w-full h-full rounded-md" />
        </div>
        <div className="flex flex-col justify-between">
          <span className="text-sm font-bold uppercase">{mainLabel}</span>
          <div className="flex flex-row mb-[14px] flex-1 items-center">
            <span className="text-[14px] font-[Inter] not-itarlic font-medium mr-[6px]">
              FrontEnd
            </span>
            <SeparationLine />
            <span className="text-[12px] font-[Inter] not-italic font-medium ml-[6px]">
              Engineering팀
            </span>
          </div>
          <div className="text-[10px] font-[Inter] font-medium ">Infinite Connect</div>
        </div>
      </div>
      {/* 텍스트 영역 */}
      <div className="flex flex-col items-end justify-between">
        <span className="text-sm">{name}</span>
        {badge && (
          <div className="w-[72px] flex items-center bg-[rgba(255,255,255,0.07)] rounded-sm p-[4px]">
            <PopularIcon />
            <span className="text-[12px] font-normal">{badge}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserListCard;
