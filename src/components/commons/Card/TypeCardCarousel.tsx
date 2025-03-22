import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import TypeCard from './TypeCard'; // TypeCard 컴포넌트 import

import cardOneFront from '@assets/cardOneFront.png';
import cardOneBack from '@assets/cardOneBack.png';
import cardTwoFront from '@assets/cardTwoFront.png';
import cardTwoBack from '@assets/cardTwoBack.png';
import cardThreeFront from '@assets/cardThreeFront.png';
import cardThreeBack from '@assets/cardThreeBack.png';
import cardFourFront from '@assets/cardFourFront.png';
import cardFourBack from '@assets/cardFourBack.png';
import cardFiveFront from '@assets/cardFiveFront.png';
import cardFiveBack from '@assets/cardFiveBack.png';

// 이미지 파일 경로 상수 선언 (위에서 정의한 CARD_IMAGES 사용)
const CARD_IMAGES = [
  { frontImage: cardOneFront, backImage: cardOneBack },
  { frontImage: cardTwoFront, backImage: cardTwoBack },
  { frontImage: cardThreeFront, backImage: cardThreeBack },
  { frontImage: cardFourFront, backImage: cardFourBack },
  { frontImage: cardFiveFront, backImage: cardFiveBack },
];

const TypeCardCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0); // 현재 선택된 슬라이드 추적
  const [animatingSlide, setAnimatingSlide] = useState<number | null>(null); // 애니메이션 중인 슬라이드 추적

  const settings = {
    dots: true,
    infinite: true,
    centerMode: true,
    centerPadding: '15%', // 양쪽 이웃 카드가 균일하게 보이도록 설정
    slidesToShow: 1,
    speed: 500,
    swipeToSlide: true,
    adaptiveHeight: false,
    beforeChange: (_: number, newIndex: number) => {
      setAnimatingSlide(newIndex); // 애니메이션 중인 슬라이드 업데이트
      setCurrentSlide(newIndex); // 현재 슬라이드 업데이트
    },
  };

  return (
    <div className="w-120 mx-auto overflow-visible">
      <Slider {...settings}>
        {CARD_IMAGES.map((card, index) => (
          <TypeCard
            key={index}
            isActive={animatingSlide === index || currentSlide === index}
            frontImage={card.frontImage}
            backImage={card.backImage}
          />
        ))}
      </Slider>
    </div>
  );
};

export default TypeCardCarousel;
