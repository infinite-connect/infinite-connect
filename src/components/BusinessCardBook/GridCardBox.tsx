import PopularIcon from '@components/NetworkingListPage/UI/PopularIcon';
import SeparationLine from '@components/NetworkingListPage/UI/SeparationLine';
import NetworkType from '@components/NetworkingListPage/UI/NetworkTypeCircle';
import React from 'react';

interface HotCardTestBoxProps {
  fieldsOfExpertise: string;
  subExpertise: string;
  department: string;
  cardType: 'dawn' | 'morning' | 'day' | 'evening' | 'night';
  businessName: string;
  name: string;
  isPopular?: boolean;
}

const GridCardBox: React.FC<HotCardTestBoxProps> = ({
  fieldsOfExpertise,
  subExpertise,
  department,
  cardType,
  businessName,
  name,
  isPopular = true,
}) => {
  return (
    <div className="flex flex-col h-[154px] w-full px-[18px] py-[14px] items-start justify-between rounded-sm bg-[rgba(255,255,255,0.07)]">
      <div>
        <div className="flex items-center">
          <NetworkType cardType={cardType} />
          <span className="text-[14px] ml-[4px] font-bold font-[Roboto] uppercase">
            {fieldsOfExpertise}
          </span>
        </div>
        <div className="flex flex-row mb-[14px] items-center">
          <span className="text-[14px] font-medium mr-[6px]">{subExpertise}</span>
          {department && department.trim() !== '' && (
            <>
              <SeparationLine />
              <span className="text-[14px] font-medium ml-[6px]">{department}</span>
            </>
          )}
        </div>
        <span>{businessName && businessName.trim() !== '' ? businessName : name}</span>
      </div>
      <div className="flex flex-row items-center justify-between w-full">
        <span className=" text-[10px] font-medium">Infinite Connect</span>
        {isPopular && (
          <div className="flex items-center bg-[rgba(255,255,255,0.07)] rounded-sm p-[4px]">
            <PopularIcon />
            <span className="text-[12px] ml-1">인기있는</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default GridCardBox;
