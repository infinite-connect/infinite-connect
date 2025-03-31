import React, { useEffect, useRef, useState } from 'react';
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader } from '@components/ui/drawer';
import { Button } from '@components/commons/Button/Button';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import HorizontalCard from './HorizontalCard';
import VerticalCard from './VerticalCard';
import QRCodeStyling from 'qr-code-styling';
import { generateQRCodeUrl, generateShareUrl } from '@utils/generateQRCodeUrl';
import logo from '@assets/logo.svg';
import { CardType } from '@components/SelectCardDesignPage/types';
import { CARD_TYPE_IMAGES } from '@constants/cardType';
import { subExpertiseMaps } from '@constants/subExpertiseMap';
import { Link2Icon } from '@radix-ui/react-icons';
import domtoimage from 'dom-to-image';

// LazyLoadTypes 타입 정의
type LazyLoadTypes = 'ondemand' | 'progressive';

interface CardShareDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  nickname: string;
  selectedCardId: string;
  cardType: string;
  subExpertise: string;
  businessName?: string;
  name: string;
}

const CardShareDrawer: React.FC<CardShareDrawerProps> = ({
  isOpen,
  onOpenChange,
  nickname,
  selectedCardId,
  cardType,
  subExpertise,
  businessName,
  name,
}) => {
  const sliderRef = useRef<Slider>(null);
  const horizontalCardRef = useRef<HTMLDivElement>(null);
  const verticalCardRef = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const thumbnailCardRef = useRef<HTMLDivElement>(null);

  const [qrImage, setQrImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  const settings = {
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
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
  };

  const type = (cardType || 'none') as CardType;
  const shareUrl = generateShareUrl(nickname, selectedCardId);

  useEffect(() => {
    if (selectedCardId && nickname) {
      setIsLoading(true);

      const generateQRImage = async () => {
        try {
          const qrCode = new QRCodeStyling({
            width: 219,
            height: 219,
            type: 'svg',
            data: generateQRCodeUrl(nickname, selectedCardId),
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
            qrOptions: {
              errorCorrectionLevel: 'L', // 가장 낮은 오류 수정 레벨 (7%)
            },
          });

          const dataUrl = await qrCode.getRawData('png');
          const imageUrl = URL.createObjectURL(dataUrl as Blob);
          setQrImage(imageUrl);
          setIsLoading(false);
        } catch (error) {
          console.error('QR 코드 이미지 생성 오류:', error);
          setIsLoading(false);
        }
      };

      generateQRImage();

      return () => {
        if (qrImage) URL.revokeObjectURL(qrImage);
      };
    }
    // eslint-disable-next-line
  }, [selectedCardId, nickname]);

  const saveImage = async (element: HTMLElement | null, filename: string) => {
    if (!element) return;

    try {
      const blob = await domtoimage.toBlob(element);
      const link = document.createElement('a');
      link.download = filename;
      link.href = URL.createObjectURL(blob);
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('이미지 저장 오류:', error);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('클립보드 복사 오류:', error);
    }
  };

  const renderActionButton = () => {
    switch (currentSlide) {
      case 0:
        return (
          <Button
            btntype="enabled"
            className="w-full"
            onClick={() => saveImage(horizontalCardRef.current, `${nickname}_가로형_명함.png`)}
          >
            명함 이미지 저장하기
          </Button>
        );
      case 1:
        return (
          <Button
            btntype="enabled"
            className="w-full"
            onClick={() => saveImage(verticalCardRef.current, `${nickname}_세로형_명함.png`)}
          >
            명함 이미지 저장하기
          </Button>
        );
      case 2:
        return (
          <Button
            btntype="enabled"
            className="w-full"
            onClick={() => saveImage(qrCodeRef.current, `${nickname}_QR코드.png`)}
          >
            QR 코드 저장하기
          </Button>
        );
      case 3:
        return (
          <Button btntype="enabled" className="w-full" onClick={() => copyToClipboard(shareUrl)}>
            {isCopied ? '복사 완료!' : '링크 복사하기'}
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent
        hideIndicator
        className="flex justify-center items-center bg-[#1a1a1a] text-white rounded-t-3xl"
      >
        <DrawerHeader className="w-full flex justify-center items-center pt-[40px] pb-[24px] px-[24px]">
          <div className="text-[18px] font-bold text-[var(--text-primary)] leading-[140%] tracking-[-0.27px]">
            내 명함을 공유할까요?
          </div>
          <div className="text-[12px]  text-[var(--text-primary)] leading-[20px] ">
            간단하게 공유하고 깊은 연결을 이어가세요 ✨
          </div>
        </DrawerHeader>

        <div className="w-full">
          {/* 슬라이더 컨테이너에 클래스 추가 */}
          <div className="w-full [&_.slick-slider]:!h-[280px] [&_.slick-list]:!h-full [&_.slick-track]:!h-full [&_.slick-slide]:!h-full [&_.slick-slide>div]:!h-full">
            <Slider ref={sliderRef} {...settings} className="w-full">
              {/* 첫번째 슬라이드 */}
              <div className="flex items-center justify-center h-full">
                <div className="scale-75 h-full flex items-center justify-center">
                  <div ref={horizontalCardRef}>
                    <HorizontalCard cardId={selectedCardId} />
                  </div>
                </div>
              </div>
              {/* 두번째 슬라이드 */}
              <div className="flex items-center justify-center h-full py-2">
                <div className="scale-70 h-full flex items-center justify-center">
                  <div ref={verticalCardRef}>
                    <VerticalCard cardId={selectedCardId} />
                  </div>
                </div>
              </div>
              {/* 세번째 슬라이드 */}
              <div className="flex items-center justify-center h-full">
                {isLoading ? (
                  <div>QR 코드 생성 중...</div>
                ) : qrImage ? (
                  <div className="flex items-center justify-center h-full">
                    <div ref={qrCodeRef}>
                      <img
                        src={qrImage}
                        alt="QR Code"
                        className="w-[219px] h-[219px] object-contain rounded-[6px]"
                      />
                    </div>
                  </div>
                ) : (
                  <div>QR 코드를 생성할 수 없습니다.</div>
                )}
              </div>
              {/* 네번째 슬라이드 */}
              <div className="flex items-center justify-center h-full">
                <div className="flex h-full items-center justify-center">
                  <div
                    ref={thumbnailCardRef}
                    onClick={() => copyToClipboard(shareUrl)}
                    className="flex flex-col w-[192px] h-[250px] bg-white rounded-lg overflow-hidden"
                  >
                    <img
                      src={CARD_TYPE_IMAGES[type]?.header || ''}
                      alt={`${nickname}의 명함 링크 복사`}
                      className="w-[192px] h-[170px] object-cover"
                    />
                    <div className="flex flex-col pt-[7px] pb-[10px] px-[10px] gap-[6px] text-black">
                      <div className="p-0 gap-[2px]">
                        <div className="text-[14px] font-bold leading-[18px] tracking-[-0.21px]">
                          {subExpertiseMaps[subExpertise || '']}
                        </div>
                        <div className="flex flex-row gap-[2px]">
                          {businessName && (
                            <div className="text-[10px] leading-[15px]">{businessName}.</div>
                          )}
                          <span className="text-[10px] leading-[15px]">{name}</span>
                        </div>
                      </div>

                      <div className="flex flex-row items-start justify-start">
                        <Link2Icon className="w-[12px] h-[12px] flex-shrink-0" />
                        <span className="text-[12px] leading-[10.5px] ml-1 truncate">
                          {generateShareUrl(nickname, selectedCardId)}sss
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
        <div className="h-[20px] flex flex-row justify-center items-center gap-[4px]">
          {currentSlide === 3 && (
            <>
              <Link2Icon className="w-[20px] h-[20px]" />
              탭해도 복사돼요!
            </>
          )}
        </div>

        <div className="flex justify-center items-center gap-2 mt-5">
          {[0, 1, 2, 3].map((index) => (
            <button
              key={index}
              className={`w-[8px] h-[8px] rounded-full ${
                currentSlide === index ? 'bg-white' : 'bg-[#6E6B6B]'
              }`}
            ></button>
          ))}
        </div>

        <DrawerFooter className="w-full flex justify-center items-center pt-[40px] pb-[24px] px-[24px] gap-[4px]">
          {renderActionButton()}
          <Button btntype="secondary" className="w-full">
            더보기
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CardShareDrawer;
