import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import TypeCard from './TypeCard';
import { CardType } from '@components/SelectCardDesignPage/types';
import { CARD_TYPE_TEXT } from '@constants/cardType';

interface TypeCardCarouselProps {
  onCardTypeChange: (newCardType: CardType) => void;
}

const TypeCardCarousel = ({ onCardTypeChange }: TypeCardCarouselProps): React.JSX.Element => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [animatingSlide, setAnimatingSlide] = useState<number | null>(null);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 1,
    speed: 500,
    swipeToSlide: true,
    adaptiveHeight: false,
    beforeChange: (_: number, newIndex: number) => {
      setAnimatingSlide(newIndex);
      setCurrentSlide(newIndex);

      // 카드 타입 변경 로직
      const newCardType = ['dawn', 'morning', 'day', 'evening', 'night'][newIndex] as CardType;
      onCardTypeChange(newCardType);
    },
  };

  // 현재 슬라이드에 해당하는 시간 범위 가져오기
  const currentType =
    CARD_TYPE_TEXT[['dawn', 'morning', 'day', 'evening', 'night'][currentSlide] as CardType].type;

  // 현재 슬라이드에 해당하는 시간 범위 가져오기
  const currentTimeRange =
    CARD_TYPE_TEXT[['dawn', 'morning', 'day', 'evening', 'night'][currentSlide] as CardType]
      .timeRange;

  return (
    <div>
      <div className="text-center gap-[8px] px-3 py-1.5 mb-[26px]">
        <div className="text-[22px] font-bold text-white">{currentType}</div>
        <div className="text-[16px] font-bold text-white">{currentTimeRange}</div>
      </div>
      <div className="w-[100vw] mb-[20px] border-2 border-red-500">
        <Slider {...settings}>
          {['dawn', 'morning', 'day', 'evening', 'night'].map((type, index) => (
            <TypeCard
              key={index}
              isActive={animatingSlide === index || currentSlide === index}
              type={type as CardType} // 카드 타입 전달
            />
          ))}
        </Slider>
      </div>
      <div className="flex justify-center gap-[8px]">
        {['dawn', 'morning', 'day', 'evening', 'night'].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)} // 클릭 시 슬라이드 이동
            className={`w-[8px] h-[8px] rounded-full ${
              currentSlide === index ? 'bg-white' : 'bg-[#6E6B6B]'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default TypeCardCarousel;
