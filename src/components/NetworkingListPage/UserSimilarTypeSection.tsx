import React from 'react';
import { ScrollArea } from '@components/ui/scroll-area';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { useGetSameCardTypeUsersQuery } from '@features/Networking/networkingApi';
import SimilarTypeBox from './SimilarTypeBox';

/** 최대 박스 개수 */
const MAX_BOX_COUNT = 5;
/** 박스 하나당 최대 아이템(사용자) 개수 */
const ITEMS_PER_BOX = 3;

const UserSimilarTypeSection = (): React.JSX.Element => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const nickname = userInfo?.nickname ?? '';
  const primaryCard = useSelector((state: RootState) => state.userBusinessCard.primaryCard);

  // 카드 타입이 있고, 닉네임이 있을 때만 호출
  const { data, isLoading } = useGetSameCardTypeUsersQuery(
    primaryCard
      ? { cardType: primaryCard.card_type, excludeNickname: nickname }
      : { cardType: '', excludeNickname: '' },
    {
      skip: !primaryCard, // primaryCard 없으면 호출하지 않음
    },
  );

  if (isLoading) return <div>로딩 중...</div>;
  if (!data || data.length === 0) {
    return (
      <div className="pl-[16px] text-white">
        <h2 className="text-[18px]">유사한 네트워킹 타입 사용자가 없습니다.</h2>
      </div>
    );
  }

  // 1) 최대 15개까지만 사용
  const slicedData = data.slice(0, MAX_BOX_COUNT * ITEMS_PER_BOX);

  // 2) 3개씩 묶어서 박스 단위로 만들기
  const chunked: (typeof data)[] = [];
  for (let i = 0; i < slicedData.length; i += ITEMS_PER_BOX) {
    chunked.push(slicedData.slice(i, i + ITEMS_PER_BOX));
  }

  // 3) 박스도 최대 5개까지만
  const finalBoxes = chunked.slice(0, MAX_BOX_COUNT);

  return (
    <div className="flex flex-col pl-[16px] gap-[20px]">
      <h2
        className="
          text-[var(--text-primary)]                     
          text-[18px]             
          font-normal                 
          leading-[140%]           
          tracking-[-0.27px]         
          self-stretch
        "
      >
        <span className="text-[var(--text-accent)]">{userInfo?.name}</span>님과 네트워킹 타입이
        똑같아요
      </h2>

      <ScrollArea className="w-full relative">
        <div className="flex flex-row gap-[10px] flex-nowrap">
          {finalBoxes.map((boxItems, index) => (
            <SimilarTypeBox key={index} items={boxItems} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default UserSimilarTypeSection;
