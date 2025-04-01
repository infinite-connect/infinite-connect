import React from 'react';
import NetworkType from './UI/NetworkTypeCircle';
import SeparationLine from './UI/SeparationLine';
import PopularIcon from './UI/PopularIcon';
import { useGetBusinessCardByIdQuery } from '@features/BusinessCard/api/businessCardApi';
import { maskName } from '@utils/formatName';
import { useNavigate } from 'react-router-dom';

interface HotBusinessCardBoxProps {
  cardId: string;
}

const HotBusinessCardBox: React.FC<HotBusinessCardBoxProps> = ({ cardId }): React.JSX.Element => {
  const { data, isLoading, error } = useGetBusinessCardByIdQuery(cardId);
  const navigate = useNavigate();
  const goToDetailPageNavigate = () => {
    navigate(`/${data?.name}/${cardId}`);
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생</div>;
  if (!data) return <div>데이터 없음</div>;

  const displayName =
    data.businessName && data.businessName.trim() !== ''
      ? data.businessName
      : maskName(data.name || '');

  return (
    <div
      onClick={goToDetailPageNavigate}
      className=" flex
      flex-col
      h-[154px]
      w-[222px]
      px-[18px]
      py-[14px]
      items-start
      justify-between
      rounded-sm
      border
      border-[#7B61FF]
      bg-[rgba(255,255,255,0.07)]
      cursor-pointer"
    >
      <div>
        <div className="flex items-center">
          <NetworkType cardType={data.cardType} />
          <span className=" text-[14px] ml-[4px] font-bold not-italic uppercase">
            {data.fieldsOfExpertise}
          </span>
        </div>
        <div className="flex flex-row mb-[14px] items-center">
          <span className="text-[14px] not-italic font-medium mr-[6px]">{data.subExpertise}</span>
          {data.department && data.department.trim() !== '' && (
            <>
              <SeparationLine />
              <span className="text-[14px] font-medium ml-[6px]">{data.department}</span>
            </>
          )}
        </div>
        <span className="">{displayName}</span>
      </div>
      <div className="flex flex-row items-center justify-between w-full">
        <span className="h-full  text-[10px] font-medium flex items-center ">Infinite Connect</span>
        <div className="flex items-center bg-[rgba(255,255,255,0.07)] rounded-sm p-[4px]">
          <PopularIcon />
          <span className=" text-[12px] gap-[2px] font-normal  rounded-sm p-[4px]">인기있는</span>
        </div>
      </div>
    </div>
  );
};

export default HotBusinessCardBox;
