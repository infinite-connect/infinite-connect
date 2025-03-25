import React, { useState, useRef } from 'react';
import Slider, { LazyLoadTypes } from 'react-slick';
import { QRCodeCanvas } from 'qrcode.react';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { useGetUserBusinessCardsQuery } from '@features/UserPage/api/userCardListApi';
import { generateQRCodeUrl } from '@utils/generateQRCodeUrl';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useWindowWidth from '@hooks/useWindowWidth';

// 이미지 import
import dawnHorizontal from '@assets/CardDesign/HorizontalCard/dawnHorizontal.png';
import morningHorizontal from '@assets/CardDesign/HorizontalCard/morningHorizontal.png';
import dayHorizontal from '@assets/CardDesign/HorizontalCard/dayHorizontal.png';

// 추후 카드 실제 이미지로 변경
const cardImages = [
  { key: 'dawn', src: dawnHorizontal },
  { key: 'day', src: morningHorizontal },
  { key: 'morning', src: dayHorizontal },
];

const QRDisplayTabContent: React.FC = () => {
  const nickname = useSelector((state: RootState) => state.user.userInfo?.nickname);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const {
    data: businessCards = [],
    isLoading,
    isError,
  } = useGetUserBusinessCardsQuery(nickname || '');

  const isMultiCards = businessCards?.length > 1;

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
    centerPadding: '0px',
    centerMode: true,
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
    <div className="relative flex-col justify-center items-center w-[100vw]">
      <div className="flex items-center justify-center mb-[20px] w-full text-white">
        {isMultiCards && (
          <button
            className="rounded-none border-none bg-transparent z-10"
            onClick={() => mainSliderRef.current?.slickPrev()}
          >
            <ChevronLeft className="w-[26px] h-[26px]" />
          </button>
        )}
        <span
          className="min-w-[160px] text-center text-[16px] font-extrabold"
          style={{ width: 'fit-content' }}
        >
          carss
        </span>
        {isMultiCards && (
          <button
            className="rounded-none border-none bg-transparent z-10"
            onClick={() => mainSliderRef.current?.slickNext()}
          >
            <ChevronRight className="w-[26px] h-[26px]" />
          </button>
        )}
      </div>

      {/* 메인 슬라이더 */}
      <div className="slider-container w-full h-[253px] mb-[16px]">
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
                  size={253}
                  bgColor="#000000"
                  fgColor="#ffffff"
                  level="M"
                  className="rounded-md self-center"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* 네비게이션 슬라이더 */}
      <div className="slider-container mb-[28px] w-full h-[155px]">
        <Slider {...navSettings} ref={navSliderRef}>
          {syncedImages.map(({ key, src }, index) => (
            <div
              key={key}
              className={`w-[253px] h-[155px] m-0 transition-transform duration-500 p-0 ${
                index === currentIndex ? 'scale-100' : 'scale-80'
              }`}
            >
              {/* 이미지 렌더링 */}
              <img
                src={src}
                alt={`${key} card`}
                className="flex justify-self-center w-[253px] h-[155px] z-10 object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className="flex justify-center items-center mt-4 gap-[8px]">
        {syncedImages.map((_, index) => (
          <div
            key={index}
            className={`w-[8px] h-[8px] rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-gray-400'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default QRDisplayTabContent;
