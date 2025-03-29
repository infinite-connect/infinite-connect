import NetworkType from './UI/NetworkTypeCircle';
import PopularIcon from './UI/PopularIcon';
import SeparationLine from './UI/SeparationLine';
const SimilarTypeBox = () => {
  return (
    <div className="w-[320px] px-[16px] flex-col bg-[rgba(255,255,255,0.07)] rounded-sm">
      <div className="py-[16px]">
        <div className="">
          <div className="flex flex-row items-center justify-between w-full">
            <div className="flex">
              <NetworkType />
              <span className="flex text-[14px] ml-[4px] font-bold font-[Roboto] not-italic uppercase">
                development
              </span>
            </div>
            <span>Anna</span>
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
        </div>

        <div className="flex flex-row justify-between">
          <span className="font-[Inter] text-[10px] font-medium ">Infinite Connect</span>
          <div className="flex items-center bg-[rgba(255,255,255,0.07)] rounded-sm p-[4px]">
            <PopularIcon />
            <span className=" text-[12px] gap-[2px] font-normal  rounded-sm p-[4px]">인기있는</span>
          </div>
        </div>
      </div>

      <hr className="border-t border-t-[rgba(255,255,255,0.5)]" />

      <div className="py-[16px]">
        <div className="">
          <div className="flex flex-row items-center justify-between w-full">
            <div className="flex">
              <NetworkType />
              <span className="flex text-[14px] ml-[4px] font-bold font-[Roboto] not-italic uppercase">
                development
              </span>
            </div>
            <span>Anna</span>
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
        </div>

        <div className="flex flex-row justify-between">
          <span className="font-[Inter] text-[10px] font-medium ">Infinite Connect</span>
          <div className="flex items-center bg-[rgba(255,255,255,0.07)] rounded-sm p-[4px]">
            <PopularIcon />
            <span className=" text-[12px] gap-[2px] font-normal  rounded-sm p-[4px]">인기있는</span>
          </div>
        </div>
      </div>

      <hr className="border-t border-t-[rgba(255,255,255,0.5)]" />

      <div className="py-[16px]">
        <div className="">
          <div className="flex flex-row items-center justify-between w-full">
            <div className="flex">
              <NetworkType />
              <span className="flex text-[14px] ml-[4px] font-bold font-[Roboto] not-italic uppercase">
                development
              </span>
            </div>
            <span>Anna</span>
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
        </div>

        <div className="flex flex-row justify-between">
          <span className="font-[Inter] text-[10px] font-medium ">Infinite Connect</span>
          <div className="flex items-center bg-[rgba(255,255,255,0.07)] rounded-sm p-[4px]">
            <PopularIcon />
            <span className=" text-[12px] gap-[2px] font-normal  rounded-sm p-[4px]">인기있는</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimilarTypeBox;
