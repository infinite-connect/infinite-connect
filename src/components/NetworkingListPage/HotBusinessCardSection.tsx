import React from 'react';
import HotBusinessCardBox from './HotBusinessCardBox';
import { ScrollArea } from '@components/ui/scroll-area';
const HotBusinessCardSection = (): React.JSX.Element => {
  return (
    <div className="flex flex-col gap-[20px] items-start shrink-0 pl-[16px] mb-[30px]">
      <h2
        className="  
        text-[var(--text-primary)]   
          font-[NanumGothic]        
          text-[18px]             
          font-bold                 
          leading-[140%]           
          tracking-[-0.27px]         
          self-stretch
          "
      >
        잠깐! 주목할 만한 명함들이에요
      </h2>
      <h3
        className=" text-[var(--text-primary)]   
          font-[NanumSquareOTF]        
          text-[14px]                 
          font-normal                
          leading-[140%]             
          tracking-[-0.21px]          
          self-stretch
          "
      >
        잠깐 주목할 만한 명함들이에요
      </h3>
      <ScrollArea className="w-full relative scrollbar-hide">
        {/* 가로 스크롤을 위한 래퍼 */}
        <div className="flex flex-nowrap gap-[10px]">
          <HotBusinessCardBox />
          <HotBusinessCardBox />
          <HotBusinessCardBox />
          <HotBusinessCardBox />
          <HotBusinessCardBox />
        </div>
      </ScrollArea>
    </div>
  );
};
export default HotBusinessCardSection;
