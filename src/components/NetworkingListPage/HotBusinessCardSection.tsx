import React from 'react';
import HotBusinessCardBox from './HotBusinessCardBox';
import { ScrollArea } from '@components/ui/scroll-area';
const HotBusinessCardSection = (): React.JSX.Element => {
  return (
    <div className="flex flex-col gap-[20px] items-start shrink-0">
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
      <ScrollArea className="w-full relative">
        <div className="flex flex-row gap-[10px] flex-nowrap">
          <HotBusinessCardBox />
          <HotBusinessCardBox />
          <HotBusinessCardBox />
          <HotBusinessCardBox />
          <HotBusinessCardBox />
        </div>
      </ScrollArea>
      <h2
        className="  
        text-[var(--text-primary)]   
          font-[NanumGothic]        
          text-[18px]             
          font-normal                 
          leading-[140%]           
          tracking-[-0.27px]         
          self-stretch
          
          "
      >
        <span className="text-[var(--text-accent)]">해담</span>님과 네트워킹 타입이 똑같아요
      </h2>
      <ScrollArea className="w-full relative">
        <div className="flex flex-row gap-[10px] flex-nowrap ">
          <HotBusinessCardBox />
          <HotBusinessCardBox />
          <HotBusinessCardBox />
          <HotBusinessCardBox />
          <HotBusinessCardBox />
        </div>
      </ScrollArea>
      <div className="flex flex-row relative gap-[10px] overflow-x-auto flex-nowrap"></div>
    </div>
  );
};
export default HotBusinessCardSection;
