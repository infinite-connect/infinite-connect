import React from 'react';
import SeparationLine from './UI/SeparationLine';
import NetworkTypeCard from './UI/NetworkTypeCard';
import { useNavigate } from 'react-router-dom';

interface UserListCardProps {
  cardId: string;
  fieldsOfExpertise: string;
  subExpertise: string;
  businessName: string;
  cardType: 'dawn' | 'morning' | 'day' | 'evening' | 'night';
  interests: string[];
  nickName: string;
  name: string;
  department: string;
}

// 이름을 마스킹하는 헬퍼
const maskName = (name: string): string => {
  if (!name) return '';
  const firstChar = name[0];
  const maskedPart = '*'.repeat(name.length - 1);
  return firstChar + maskedPart;
};

const UserListCard: React.FC<UserListCardProps> = ({
  cardId,
  nickName,
  fieldsOfExpertise,
  subExpertise,
  businessName,
  cardType,
  interests,
  name,
  department,
}) => {
  // 비즈니스 네임이 있으면 그것을, 없으면 이름을 마스킹해서 표시
  const displayName = businessName && businessName.trim() !== '' ? businessName : maskName(name);
  const goToDetailPageNavigate = () => {
    navigate(`/${nickName}/${cardId}`);
  };
  const navigate = useNavigate();
  return (
    <div
      onClick={goToDetailPageNavigate}
      className="w-full flex flex-row justify-between rounded-md bg-[rgba(255,255,255,0.07)] px-[18px] py-[14px] text-white"
    >
      {/* 이미지 영역 */}
      <div className="flex w-full flex-row gap-[10px]">
        <div className="aspect-[49/66] w-[66px] h-full flex-shrink-0 relative">
          <NetworkTypeCard cardType={cardType} />
          {/* <img src={imageUrl} alt="user" className="object-cover w-full h-full rounded-md" /> */}
        </div>
        <div className="flex flex-col justify-between">
          <span className="text-sm font-bold uppercase">{fieldsOfExpertise}</span>
          <div className="flex flex-row mb-[14px] flex-1 items-center ">
            <span className="text-[14px] font-[Inter] not-itarlic font-medium mr-[6px] whitespace-nowrap">
              {subExpertise}
            </span>
            {department && department.trim() !== '' && (
              <>
                <SeparationLine />
                <span className="text-[12px] font-[Inter] not-italic font-medium ml-[6px] whitespace-nowrap">
                  {department}
                </span>
              </>
            )}
          </div>
          <div className="text-[10px] font-[Inter] font-medium">Infinite Connect</div>
        </div>
      </div>
      {/* 텍스트 영역 */}
      <div className="flex flex-col items-end justify-between">
        <span className="text-sm whitespace-nowrap ">{displayName}</span>
      </div>
    </div>
  );
};

export default UserListCard;
