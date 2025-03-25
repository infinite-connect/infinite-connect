import React from 'react';
import NetworkType from './UI/NetworkType';
import SeparationLine from './UI/SeparationLine';

const HotBusinessCardBox = (): React.JSX.Element => {
  return (
    <div
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
      bg-[rgba(255,255,255,0.07)]"
    >
      <div className="">
        <div className="flex items-center">
          <NetworkType />
          <span className=" text-[14px] ml-[4px] font-bold font-[Roboto] not-italic uppercase">
            development
          </span>
        </div>
        <div className="flex flex-row mb-[14px] items-center">
          <span className="text-[14px] font-[Inter] not-italic font-medium mr-[6px]">
            프론트엔드
          </span>
          <SeparationLine />
          <span className="text-[14px] font-[Inter] not-italic font-medium ml-[6px]">
            Engineering팀
          </span>
        </div>
        <span className="">Jacob.K</span>
      </div>
      <div className="flex flex-row items-center justify-between w-full">
        <span className="font-[Inter] text-[10px] font-medium ">Infinite Connect</span>
        <span className=" text-[12px] gap-[2px] rounded-sm p-[4px] bg-amber-700">✨ 인기있는</span>
      </div>
    </div>
  );
};

export default HotBusinessCardBox;
