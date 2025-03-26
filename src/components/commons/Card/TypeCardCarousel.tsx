import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import TypeCard from './TypeCard';
import { CardType } from '@components/SelectCardDesignPage/types';
import { CARD_TYPE_TEXT } from '@constants/cardType';
import useWindowWidth from '@hooks/useWindowWidth';

interface TypeCardCarouselProps {
  onCardTypeChange: (newCardType: CardType) => void;
}

const TypeCardCarousel = ({ onCardTypeChange }: TypeCardCarouselProps): React.JSX.Element => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [animatingSlide, setAnimatingSlide] = useState<number | null>(null);

  const windowWidth = useWindowWidth();
  const imageWidth = 236;

  const calculateCenterPadding = (screenWidth: number, imageWidth: number): string => {
    const padding = (screenWidth - imageWidth) / 2; // %로 계산
    return `${padding}px`;
  };

  const centerPadding = calculateCenterPadding(windowWidth, imageWidth);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    centerMode: true,
    centerPadding,
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
      .carouselTime;

  return (
    <div>
      <div className="w-[100vw] h-[460px]">
        <div className="text-center flex justify-center items-center h-[32px] gap-[8px] px-[12px] py-[6px] mb-[26px]">
          <div className="flex justify-center items-center h-[20px] font-bold text-white gap-[8px]">
            <span className="text-[20px] leading-[20px]">{currentType}</span>
            <span className="text-[16px] leading-[20px]"> {currentTimeRange} </span>
          </div>
        </div>
        <Slider {...settings}>
          {['dawn', 'morning', 'day', 'evening', 'night'].map((type, index) => (
            <TypeCard
              key={index}
              isActive={animatingSlide === index || currentSlide === index}
              type={type as CardType} // 카드 타입 전달
            />
          ))}
        </Slider>
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
    </div>
  );
};

export default TypeCardCarousel;
