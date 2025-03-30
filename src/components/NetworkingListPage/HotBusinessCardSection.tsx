import React from 'react';
import HotBusinessCardBox from './HotBusinessCardBox';
import { ScrollArea } from '@components/ui/scroll-area';
import { useGetTop5DailyIdsQuery } from '@features/Networking/networkingApi';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';

const HotBusinessCardSection = (): React.JSX.Element => {
  const primaryCard = useSelector((state: RootState) => state.userBusinessCard.primaryCard);

  // primaryCard가 없으면 빈 문자열로 처리
  const sub = primaryCard ? primaryCard.sub_expertise : '';
  const { data, isLoading } = useGetTop5DailyIdsQuery({ sub });
  console.log('상위명함:', data);

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <div className="flex flex-col items-start shrink-0 pl-[16px] mb-[30px] mt-[3rem]">
      <h2
        className="  
        text-[var(--text-primary)]   
          font-[NanumGothic]        
          text-[18px]             
          font-bold                 
          leading-[140%]           
          tracking-[-0.27px]         
          self-stretch
          mb-2
          "
      >
        잠깐! 주목할 만한 명함들이에요
      </h2>
      <h3
        className="    
          font-[NanumSquareOTF]        
          text-[14px] 
        text-[var(--text-secondary)]
          font-normal                
          leading-[140%]             
          tracking-[-0.21px]          
          self-stretch
          mb-[30px]
          "
      >
        오늘 가장 조회수가 높은 명함이에요 :)
      </h3>
      <ScrollArea className="w-full relative scrollbar-hide">
        {/* 가로 스크롤을 위한 래퍼 */}
        <div className="flex flex-nowrap gap-[10px]">
          {data &&
            data.map((item) => {
              return (
                <HotBusinessCardBox key={item.business_card_id} cardId={item.business_card_id} />
              );
            })}
        </div>
      </ScrollArea>
    </div>
  );
};
export default HotBusinessCardSection;
