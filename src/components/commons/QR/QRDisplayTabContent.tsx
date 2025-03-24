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
import useWindowWidth from '@hooks/useWindowWidth';

// 추후 카드 실제 이미지로 변경
const cardImages = [
  { key: 'dawn', src: dawnFront },
  { key: 'day', src: dayFront },
  { key: 'morning', src: morningFront },
];

const QRDisplayTabContent: React.FC = () => {
  const nickname = useSelector((state: RootState) => state.user.userInfo?.nickname);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const {
    data: businessCards = [],
    isLoading,
    isError,
  } = useGetUserBusinessCardsQuery(nickname || '');

  const mainSliderRef = useRef<Slider | null>(null); // 초기값을 null로 설정
  const navSliderRef = useRef<Slider | null>(null); // 초기값을 null로 설정

  const windowWidth = useWindowWidth();
  const imageWidth = 150;

  const calculateCenterPadding = (screenWidth: number, imageWidth: number): string => {
    const padding = (screenWidth - imageWidth) / 2; // %로 계산
    return `${padding}px`;
  };

  const centerPadding = calculateCenterPadding(windowWidth, imageWidth);
  console.log(centerPadding);

  const syncedImages =
    businessCards && businessCards.length > 0
      ? cardImages.slice(0, businessCards.length) // 명함 개수에 맞게 이미지 자르기
      : [];

  // 메인 슬라이더 설정
  const mainSettings = {
    dots: false,
    infinite: businessCards.length > 1,
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
    infinite: businessCards.length > 1,
    speed: 500,
    slidesToShow: 1, // 한 개만 보여줌
    slidesToScroll: 1,
    centerMode: true,
    centerPadding,
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
      <div className="mt-6 slider-container w-full relative">
        <Slider {...navSettings} ref={navSliderRef}>
          {syncedImages.map(({ key, src }, index) => (
            <div
              key={key}
              className={`w-[150px] h-[180px] rounded-2xl transition-transform duration-500 relative ${
                index === currentIndex ? 'scale-100' : 'scale-80'
              }`}
            >
              {/* 검은색 배경 */}
              <div
                className={`absolute rounded-2xl inset-0 ${
                  index === currentIndex ? 'bg-transparent z-10' : 'bg-black z-20 opacity-100'
                }`}
              ></div>
              {/* 이미지 렌더링 */}
              <img
                src={src}
                alt={`${key} card`}
                className="w-full h-full rounded-2xl object-contain relative z-10"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default QRDisplayTabContent;
