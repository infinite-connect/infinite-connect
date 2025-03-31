import { RootState } from '@store/store';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { useGetUserCardsViewCountsQuery } from '@features/Networking/networkingApi';
import { useGetCardsAlarmFollowedByUserNicknameQuery } from '@features/BusinessCard/api/exchangeApi';
import AlarmListBox from './AlarmListBox';
const AlarmContents = (): React.JSX.Element => {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const [activeTab, setActiveTab] = useState(0);
  const { data: cards } = useGetUserCardsViewCountsQuery(userInfo?.nickname || '');
  console.log(cards);

  // 카드 배열에서 is_primary가 true인 카드가 있다면 첫 번째로 배치
  const orderedCards = useMemo(() => {
    if (!cards) return [];
    const primaryCard = cards.find((card) => card.is_primary);
    if (primaryCard) {
      const restCards = cards.filter(
        (card) => card.business_card_id !== primaryCard.business_card_id,
      );
      return [primaryCard, ...restCards];
    }
    return cards;
  }, [cards]);

  // 선택된 카드 (탭) 가져오기
  const selectedCard = orderedCards[activeTab];

  // 선택된 카드에 해당하는 알림만 가져옴
  const { data: alarmsData } = useGetCardsAlarmFollowedByUserNicknameQuery({
    nickname: userInfo?.nickname || '',
    cardId: selectedCard?.business_card_id || '',
  });
  console.log(alarmsData);

  return (
    <div className="w-full bg-#121212 text-white">
      {/* 탭 헤더 영역 */}
      <div className="flex border-b border-gray-700">
        {orderedCards.map((card, index) => {
          const isActive = activeTab === index;
          return (
            <button
              key={card.business_card_id}
              onClick={() => setActiveTab(index)}
              className={`flex-1 relative px-3 py-2 text-sm focus:outline-none ${
                isActive ? 'font-semibold' : 'font-normal opacity-50'
              }`}
            >
              {card.card_name}
              {/* 활성 탭 하단에 표시되는 라인 */}
              {isActive && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white" />}
            </button>
          );
        })}
      </div>

      {/* 탭별 콘텐츠 영역 */}
      <div className="flex flex-col gap-[8px] p-4 ">
        {alarmsData && alarmsData.cards.length > 0 ? (
          alarmsData.cards.map((item) => (
            <AlarmListBox
              key={item.cardId}
              cardId={item.cardId}
              nickname={item.nickname}
              userName={userInfo?.name || ''}
              createdAt={item.createdAt}
            />
          ))
        ) : (
          <div className="w-full p-4 bg-neutral-900 rounded flex items-center justify-center">
            <span className="text-xs text-gray-400">알림이 없습니다.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlarmContents;
