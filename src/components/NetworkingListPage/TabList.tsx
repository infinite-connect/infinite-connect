import React from 'react';
import { ScrollArea } from '@components/ui/scroll-area';
import TabListFilterIcon from './UI/TabListFilterIcon';

const TABS = ['ALL', 'DEVELOPMENT', 'INFRASTRUCTURE', 'DESIGN', 'BUSINESS', 'CORPORATE'];

type TabListProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onFilterClick: () => void;
};

const TabList = ({ activeTab, onTabChange, onFilterClick }: TabListProps): React.JSX.Element => {
  return (
    // 컨테이너: 회색 라인 (1px)으로 전체 하단 보더
    <div className="relative  flex items-center w-full mt-[20px] border-b border-b-[rgba(255,255,255,0.4)]">
      {/* 스크롤 영역 */}
      <ScrollArea className="w-full">
        <div className="flex flex-nowrap gap-4 px-[12px] py-[6px]">
          {TABS.map((tab) => {
            const isActive = tab === activeTab;
            return (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className={`
                  relative 
                  text-[14px] uppercase
                  ${isActive ? 'text-white' : 'text-[rgba(255,255,255,0.4)]'}
                `}
              >
                {tab}
                {/* 활성 탭일 때만 흰색 라인(span)으로 덮어씌움 */}
                {isActive && (
                  <span className="absolute -bottom-[6px] left-0 right-0 h-[1px] bg-white z-10 " />
                )}
              </button>
            );
          })}
        </div>
      </ScrollArea>

      {/* 오른쪽 그라디언트 페이드 효과 */}
      <div className="pointer-events-none absolute top-0 right-0 h-full w-[75px] bg-gradient-to-l from-black/80 to-transparent" />

      {/* 필터 버튼 */}
      <button onClick={onFilterClick} className="absolute right-0 top-0 pr-[17px] py-[6px] z-10">
        <TabListFilterIcon />
      </button>
    </div>
  );
};

export default TabList;
