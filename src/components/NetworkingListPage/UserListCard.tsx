import React from 'react';
import SeparationLine from './UI/SeparationLine';
import NetworkTypeCard from './UI/NetworkTypeCard';
import { useNavigate } from 'react-router-dom';
import { maskName } from '@utils/formatName';
import { useGetBusinessCardQuery } from '@features/Networking/networkingApi';
import { CardType } from '@components/SelectCardDesignPage/types';

interface UserListCardProps {
  cardId: string;
  nickName: string;
}

const UserListCard: React.FC<UserListCardProps> = ({ cardId, nickName }) => {
  const navigate = useNavigate();
  const { data: cardData } = useGetBusinessCardQuery(cardId);
  console.log('card데이터:', cardData);
  // 비즈니스 네임이 있으면 그것을, 없으면 이름을 마스킹해서 표시
  const displayName =
    cardData?.business_name && cardData?.business_name.trim() !== ''
      ? cardData?.business_name
      : maskName(cardData?.name || '');

  const goToDetailPageNavigate = () => {
    navigate(`/${nickName}/${cardId}`);
  };

  return (
    <div
      onClick={goToDetailPageNavigate}
      className="w-full flex flex-row justify-between rounded-md bg-[rgba(255,255,255,0.07)] px-[18px] py-[14px] text-white"
    >
      {/* 이미지 영역 */}
      <div className="flex w-full flex-row gap-[10px]">
        <div className="aspect-[49/66] w-[66px] h-full flex-shrink-0 relative">
          <NetworkTypeCard cardType={cardData?.card_type as CardType} />
          {/* <img src={imageUrl} alt="user" className="object-cover w-full h-full rounded-md" /> */}
        </div>
        <div className="flex flex-col justify-between">
          <span className="text-sm font-bold uppercase">{cardData?.fields_of_expertise}</span>
          <div className="flex flex-row mb-[14px] flex-1 items-center ">
            <span className="text-[14px] font-medium mr-[6px] whitespace-nowrap">
              {cardData?.sub_expertise}
            </span>
            {cardData?.department && cardData?.department.trim() !== '' && (
              <>
                <SeparationLine />
                <span className="text-[12px] font-medium ml-[6px] whitespace-nowrap">
                  {cardData?.department}
                </span>
              </>
            )}
          </div>
          <div className="text-[10px] font-medium">Infinite Connect</div>
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
