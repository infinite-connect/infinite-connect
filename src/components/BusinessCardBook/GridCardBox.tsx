import SeparationLine from '@components/NetworkingListPage/UI/SeparationLine';
import NetworkType from '@components/NetworkingListPage/UI/NetworkTypeCircle';
import React from 'react';
import { useGetBusinessCardQuery } from '@features/Networking/networkingApi';
import { CardType } from '@components/SelectCardDesignPage/types';
import { useNavigate } from 'react-router-dom';

interface HotCardTestBoxProps {
  cardId: string;
  nickName: string;
}

const GridCardBox: React.FC<HotCardTestBoxProps> = ({ cardId, nickName }) => {
  const navigate = useNavigate();
  const { data: cardData } = useGetBusinessCardQuery(cardId);

  return (
    <div
      onClick={() => {
        navigate(`/${nickName}/${cardId}`);
      }}
      className="flex flex-col h-[154px] w-full px-[18px] py-[14px] items-start justify-between rounded-sm bg-[rgba(255,255,255,0.07)]"
    >
      <div>
        <div className="flex items-center">
          <NetworkType cardType={cardData?.card_type as CardType} />
          <span className="text-[14px] ml-[4px] font-bold uppercase">
            {cardData?.fields_of_expertise}
          </span>
        </div>
        <div className="flex flex-row mb-[14px] items-center">
          <span className="text-[14px] font-medium mr-[6px]">{cardData?.sub_expertise}</span>
          {cardData?.department && cardData?.department.trim() !== '' && (
            <>
              <SeparationLine />
              <span className="text-[14px] font-medium ml-[6px]">{cardData?.department}</span>
            </>
          )}
        </div>
        <span>
          {cardData?.business_name && cardData?.business_name.trim() !== ''
            ? cardData?.business_name
            : cardData?.name}
        </span>
      </div>
      <div className="flex flex-row items-center justify-between w-full">
        <span className=" text-[10px] font-medium">Infinite Connect</span>
      </div>
    </div>
  );
};

export default GridCardBox;
