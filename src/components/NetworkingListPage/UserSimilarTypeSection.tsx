import React from 'react';
import SimilarTypeBox from './SimilarTypeBox';
import { ScrollArea } from '@components/ui/scroll-area';
const UserSimilarTypeSection = (): React.JSX.Element => {
  return (
    <div className="flex flex-col pl-[16px] gap-[20px]">
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
          <SimilarTypeBox />
          <SimilarTypeBox />
          <SimilarTypeBox />
        </div>
      </ScrollArea>
    </div>
  );
};

export default UserSimilarTypeSection;
