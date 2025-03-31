import React, { useState, useRef, useEffect } from 'react';
import Slider, { LazyLoadTypes } from 'react-slick';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { useGetUserBusinessCardsQuery } from '@features/UserPage/api/userCardListApi';
import { generateQRCodeUrl } from '@utils/generateQRCodeUrl';
import { ChevronLeft, ChevronRight } from 'lucide-react';
// import useWindowWidth from '@hooks/useWindowWidth';
import QRCodeStyling from 'qr-code-styling';
import logo from '@assets/logo.svg';
import { useGetBusinessCardNamesQuery } from '@features/BusinessCard/api/businessCardApi';
import HorizontalCardPreview from '../Card/HorizontalCardPreview';

const QRDisplayTabContent: React.FC = () => {
  const nickname = useSelector((state: RootState) => state.user.userInfo?.nickname);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [qrImages, setQrImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const {
    data: businessCards = [],
    isLoading: isCardLoading,
    isError,
  } = useGetUserBusinessCardsQuery(nickname || '');

  const { data: cardNames = {} } = useGetBusinessCardNamesQuery(businessCards, {
    skip: businessCards.length === 0,
  });

  const isMultiCards = businessCards?.length > 1;

  const mainSliderRef = useRef<Slider | null>(null);
  const navSliderRef = useRef<Slider | null>(null);

  // QR 코드를 이미지로 생성
  useEffect(() => {
    if (businessCards.length > 0 && nickname) {
      setIsLoading(true);

      const generateQRImages = async () => {
        try {
          const images = await Promise.all(
            businessCards.map(async (businessCardId) => {
              const qrCode = new QRCodeStyling({
                width: 253,
                height: 253,
                type: 'svg',
                data: generateQRCodeUrl(nickname, businessCardId),
                image: logo,
                imageOptions: {
                  crossOrigin: 'anonymous',
                  margin: 10,
                  imageSize: 0.3,
                },
                dotsOptions: {
                  color: '#000000',
                  type: 'square',
                },
                backgroundOptions: {
                  color: '#ffffff',
                },
                cornersSquareOptions: {
                  type: 'square',
                },
                cornersDotOptions: {
                  type: 'dot',
                },
                // qrOptions: {
                //   errorCorrectionLevel: 'L', // 가장 낮은 오류 수정 레벨 (7%)
                // },
              });

              // QR 코드를 이미지 URL로 변환
              const dataUrl = await qrCode.getRawData('png');
              return URL.createObjectURL(dataUrl as Blob);
            }),
          );

          setQrImages(images);
          setIsLoading(false);
        } catch (error) {
          console.error('QR 코드 이미지 생성 오류:', error);
          setIsLoading(false);
        }
      };

      generateQRImages();

      // 컴포넌트 언마운트 시 URL 정리
      return () => {
        qrImages.forEach((url) => URL.revokeObjectURL(url));
      };
    }
    // eslint-disable-next-line
  }, [businessCards, nickname]);

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
      setCurrentIndex(index);
      navSliderRef.current?.slickGoTo(index);
    },
  };

  // 네비게이션 슬라이더 설정
  const navSettings = {
    dots: false,
    infinite: businessCards.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerPadding: '0px',
    centerMode: true,
    arrows: false,
    focusOnSelect: true,
    lazyLoad: 'ondemand' as LazyLoadTypes,
    beforeChange: (_current: number, next: number) => {
      setCurrentIndex(next);
      mainSliderRef.current?.slickGoTo(next);
    },
  };

  if (!nickname) {
    return null;
  }

  if (isCardLoading || isLoading) {
    return <p className="text-center text-gray-500">로딩 중...</p>;
  }

  if (isError || !businessCards || businessCards.length === 0) {
    return <p className="text-center text-gray-500">등록된 명함이 없습니다.</p>;
  }

  const currentCardId = businessCards[currentIndex];
  const currentCardName = cardNames[currentCardId] || '명함';

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
          className="min-w-[160px] text-center text-[16px] leading-[20px] font-extrabold"
          style={{ width: 'fit-content' }}
        >
          {currentCardName}
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
          {qrImages.map((imageUrl, index) => (
            <div
              key={`qr-${index}`}
              className="flex w-[253px] h-[253px] justify-center items-center"
            >
              <div className="flex justify-center items-center">
                <img
                  src={imageUrl}
                  alt={`QR Code ${index + 1}`}
                  className="rounded-md self-center"
                  width={253}
                  height={253}
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* 네비게이션 슬라이더 */}
      <div className="slider-container mb-[28px] w-full h-[155px]">
        <Slider {...navSettings} ref={navSliderRef}>
          {businessCards.map((businessCardId) => (
            <div key={businessCardId} className="w-[253px] h-[155px] m-0 p-0">
              <div className="flex justify-center items-center">
                <HorizontalCardPreview cardId={businessCardId} />
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="flex justify-center items-center mt-4 gap-[8px]">
        {businessCards.map((_, index) => (
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
