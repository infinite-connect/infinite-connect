import React from 'react';
import Slider from 'react-slick';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { useGetUserCardsViewCountsQuery } from '@features/Networking/networkingApi';

import CardSlide from './CardSlice';
import AddCardSlide from './AddCardSlide';

const MyCardSection = (): React.JSX.Element => {
  const primaryCard = useSelector((state: RootState) => state.userBusinessCard.primaryCard);
  const userInfo = useSelector((state: RootState) => state.user.userInfo);

  const { data: userCards } = useGetUserCardsViewCountsQuery(userInfo?.nickname || '');
  console.log(userCards);
  if (!primaryCard) {
    return <div>로딩 중...</div>;
  }

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: false, // 옆 슬라이드 노출 방지
    centerPadding: '0px', // 옆 슬라이드 노출 방지
    arrows: false,
  };

  // userCards가 없는 경우
  if (!userCards) return <div>값이 없습니다.</div>;

  // 3장 이상인 경우에는 AddCardSlide를 추가하지 않음
  const shouldShowAddCard = userCards.length <= 2;

  // 대표 명함이 항상 첫번째에 오도록 배열 재정렬
  const orderedCards = userCards
    ? [
        ...userCards.filter((card) => card.business_card_id === primaryCard.business_card_id),
        ...userCards.filter((card) => card.business_card_id !== primaryCard.business_card_id),
      ]
    : [];

  return (
    <div className="mx-4 px-4 py-4 flex flex-col bg-[#1E1E1E] rounded-md">
      <div className="">
        <Slider key={userCards?.length} {...settings}>
          {orderedCards?.map((userCard) => (
            <div key={userCard.business_card_id}>
              <CardSlide
                business_card_id={userCard.business_card_id}
                viewCount={userCard.view_count}
                cardType={userCard.card_type}
              />
            </div>
          ))}
          {/* 만약 2장 이하라면 마지막에 +슬라이드 추가 */}
          {shouldShowAddCard && (
            <AddCardSlide
              onAddCardClick={() => {
                console.log('새 명함 추가 버튼 클릭!');
                // 필요한 Modal 열기 또는 페이지 이동 등
              }}
            />
          )}
        </Slider>
      </div>
    </div>
  );
};

export default MyCardSection;
