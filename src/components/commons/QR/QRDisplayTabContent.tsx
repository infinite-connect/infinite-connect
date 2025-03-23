import React, { useState, useRef } from 'react';
import Slider, { LazyLoadTypes } from 'react-slick';
import { QRCodeCanvas } from 'qrcode.react';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { useGetUserBusinessCardsQuery } from '@features/UserPage/api/userCardListApi';
import { generateQRCodeUrl } from '@utils/generateQRCodeUrl';

// 이미지 import
import dawnFront from '@assets/CardDesign/dawnFront.png';
import dayFront from '@assets/CardDesign/dayFront.png';
import morningFront from '@assets/CardDesign/morningFront.png';

// 추후 카드 실제 이미지로 변경
const cardImages = [
  { key: 'dawn', src: dawnFront },
  { key: 'day', src: dayFront },
  { key: 'morning', src: morningFront },
];

const QRDisplayTabContent: React.FC = () => {
  const nickname = useSelector((state: RootState) => state.user.userInfo?.nickname);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const { data: businessCards, isLoading, isError } = useGetUserBusinessCardsQuery(nickname || '');

  const mainSliderRef = useRef<Slider | null>(null); // 초기값을 null로 설정
  const navSliderRef = useRef<Slider | null>(null); // 초기값을 null로 설정

  // 메인 슬라이더 설정
  const mainSettings = {
    dots: false,
    infinite: true,
    centerMode: true,
    speed: 500,
    centerPadding: '0px',
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    focusOnSelect: true,
    lazyLoad: 'ondemand' as LazyLoadTypes,
    afterChange: (index: number) => {
      setCurrentIndex(index); // 현재 슬라이드 인덱스 업데이트
      navSliderRef.current?.slickGoTo(index); // 네비게이션 슬라이더 이동
    },
  };

  // 네비게이션 슬라이더 설정
  const navSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // 한 개만 보여줌
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '10%',
    focusOnSelect: true,
    lazyLoad: 'ondemand' as LazyLoadTypes,
    beforeChange: (_current: number, next: number) => {
      setCurrentIndex(next); // 네비게이션 변경 시 메인 슬라이더 이동
      mainSliderRef.current?.slickGoTo(next);
    },
  };

  if (!nickname) {
    return null;
  }

  if (isLoading) {
    return <p className="text-center text-gray-500">로딩 중...</p>;
  }

  if (isError || !businessCards || businessCards.length === 0) {
    return <p className="text-center text-gray-500">등록된 명함이 없습니다.</p>;
  }

  return (
    <div className="relative w-full h-full">
      {/* 현재 슬라이드의 business_card_id 표시 */}
      <div className="text-center text-lg font-bold mb-4 text-black">
        현재 QR의 ID: {businessCards[currentIndex]}
      </div>

      {/* 메인 슬라이더 */}
      <div className="slider-container">
        <Slider
          {...mainSettings}
          ref={mainSliderRef}
          asNavFor={navSliderRef.current as Slider | undefined}
        >
          {businessCards.map((businessCardId) => (
            <div key={businessCardId} className="flex justify-center items-center w-full h-full">
              <div className="flex justify-self-center">
                <QRCodeCanvas
                  value={generateQRCodeUrl(nickname, businessCardId)}
                  size={250}
                  bgColor="#FFFFFF"
                  fgColor="#000000"
                  level="M"
                  className="rounded-md self-center"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* 네비게이션 슬라이더 */}
      <div className="mt-6 slider-container">
        <Slider
          {...navSettings}
          ref={navSliderRef}
          asNavFor={mainSliderRef.current as Slider | undefined}
        >
          {cardImages.map(({ key, src }) => (
            <div key={key}>
              <img
                src={src}
                alt={`${key} card`}
                className="w-[331px] h-[248px] object-contain transform rotate-90"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default QRDisplayTabContent;
