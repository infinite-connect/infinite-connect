import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';
import useWindowHeight from '@hooks/useWindowHeight';
import useWindowWidth from '@hooks/useWindowWidth';
import './styles.css';
import { Button } from '../Button/Button';
import { RootState } from '@store/store';
import { useGetUserBusinessCardsQuery } from '@features/UserPage/api/userCardListApi';
import { useSelector } from 'react-redux';
import { useGetBusinessCardNamesAndTypesQuery } from '@features/BusinessCard/api/businessCardApi';
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from '@components/ui/carousel';
import { Drawer, DrawerContent } from '@components/ui/drawer';
import { CardType } from '@components/SelectCardDesignPage/types';
import { CARD_TYPE_IMAGES } from '@constants/cardType';
import HorizontalCardPreview from '../Card/HorizontalCardPreview';
import {
  useCheckTwoWayExchangeQuery,
  useTwoWayExchangeMutation,
} from '@features/BusinessCard/api/exchangeApi';

interface QRScannerTabContentProps {
  isActive: boolean;
  onClose: () => void;
}

const QRScannerTabContent: React.FC<QRScannerTabContentProps> = ({ isActive, onClose }) => {
  const scannerRef = useRef<HTMLDivElement>(null);
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();
  const windowWidth = useWindowWidth();
  const windowHeight = useWindowHeight();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [tempSelectedCardId, setTempSelectedCardId] = useState<string>('');
  const [locationY, setLocationY] = useState<number>(0);

  // Shadcn UI의 CarouselApi 사용
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nickname = useSelector((state: RootState) => state.user.userInfo?.nickname);
  const { data: businessCards = [] } = useGetUserBusinessCardsQuery(nickname || '', {
    skip: !nickname,
  });

  // 교환 상태 확인을 위한 파라미터 상태 추가
  const [checkExchangeParams, setCheckExchangeParams] = useState({
    follower_nickname_1: '',
    follower_card_id_1: '',
    follower_nickname_2: '',
    follower_card_id_2: '',
  });

  // 교환 상태 확인 쿼리
  const { data: exchangeStatus } = useCheckTwoWayExchangeQuery(checkExchangeParams, {
    skip: !checkExchangeParams.follower_nickname_1,
    refetchOnMountOrArgChange: true,
  });

  const businessCardsRef = useRef(businessCards);
  useEffect(() => {
    businessCardsRef.current = businessCards;
  }, [businessCards]);

  // 초기값은 빈 문자열로 설정하되, 조건부 초기화 로직 추가
  const [selectedCardId, setSelectedCardId] = useState<string>(() => {
    // 초기 렌더링 시 businessCards가 이미 있다면 첫 번째 카드 ID 반환
    return businessCardsRef.current.length > 0 ? businessCardsRef.current[0] : '';
  });

  // businessCards가 로드되면 첫 번째 카드를 선택
  useEffect(() => {
    if (businessCards.length > 0 && !selectedCardId) {
      setSelectedCardId(businessCards[0]);
    }
  }, [businessCards, selectedCardId]);

  // 카드 이름과 타입 가져오기
  const { data: cardDetails = {} } = useGetBusinessCardNamesAndTypesQuery(businessCards, {
    skip: businessCards.length === 0,
  });

  // 드로워가 열릴 때 현재 선택된 카드 ID를 임시 상태에 저장
  useEffect(() => {
    if (isDrawerOpen) {
      setTempSelectedCardId(selectedCardId);

      // 현재 선택된 카드의 인덱스 찾기
      const selectedIndex = businessCards.findIndex((cardId) => cardId === selectedCardId);
      if (selectedIndex !== -1 && api) {
        // 약간의 지연 후 이동 (캐러셀이 완전히 초기화된 후)
        setTimeout(() => {
          api.scrollTo(selectedIndex, false);
        }, 100);
      }
    }
  }, [isDrawerOpen, selectedCardId, businessCards, api]);

  // CarouselApi 이벤트 핸들러
  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      setCurrentIndex(api.selectedScrollSnap());
    };

    api.on('select', onSelect);

    // 초기 인덱스 설정
    setCurrentIndex(api.selectedScrollSnap());

    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  // 인덱스가 변경될 때 임시 카드 ID 업데이트
  useEffect(() => {
    if (isDrawerOpen && businessCards[currentIndex]) {
      setTempSelectedCardId(businessCards[currentIndex]);
    }
  }, [currentIndex, businessCards, isDrawerOpen]);

  useEffect(() => {
    const distance = windowHeight / 2 - 137 - 50;
    setLocationY(distance);
  }, [windowHeight]);

  // QR 스캐너 시작/중지 로직
  useEffect(() => {
    const startScanner = async () => {
      if (scannerRef.current && !html5QrCodeRef.current) {
        html5QrCodeRef.current = new Html5Qrcode('qr-scanner');
      }

      if (html5QrCodeRef.current) {
        setIsTransitioning(true);
        try {
          const aspectRatio = windowWidth / windowHeight;
          await html5QrCodeRef.current.start(
            { facingMode: 'environment' },
            {
              fps: 10,
              qrbox: 275,
              aspectRatio,
            },
            (decodedText) => {
              console.log('Decoded text:', decodedText);
              alert(decodedText);
              // 스캔 성공 시 즉시 스캐너 중지
              if (html5QrCodeRef.current) {
                // 여기에 null 체크 추가
                html5QrCodeRef.current
                  .stop()
                  .then(() => {
                    console.log('QR 코드 스캐너가 중지되었습니다.');
                    // 스캔 결과 처리
                    handleQRCodeScan(decodedText);
                  })
                  .catch((err) => {
                    console.error('QR 코드 스캐너 중지 중 오류 발생:', err);
                  });
              }
            },
            (errorMessage) => {
              console.warn('QR Code Scan Error:', errorMessage);
            },
          );
        } catch (err) {
          console.error('QR 코드 스캐너 시작 실패:', err);
        } finally {
          setIsTransitioning(false);
        }
      }
    };

    const stopScanner = async () => {
      if (html5QrCodeRef.current) {
        setIsTransitioning(true);
        try {
          await html5QrCodeRef.current.stop();
        } catch (err) {
          console.error('QR 코드 스캐너 중지 실패:', err);
        } finally {
          html5QrCodeRef.current = null;
          setIsTransitioning(false);
        }
      }
    };

    if (isActive && !isTransitioning) {
      startScanner();
    } else if (!isActive && !isTransitioning) {
      stopScanner();
    }

    return () => {
      stopScanner();
    };
    // eslint-disable-next-line
  }, [isActive, navigate, windowWidth, windowHeight]);

  const [twoWayExchange] = useTwoWayExchangeMutation();

  // 교환 상태 변경 감지
  useEffect(() => {
    // exchangeStatus가 undefined가 아니고 파라미터가 설정되어 있을 때만 처리
    if (exchangeStatus !== undefined && checkExchangeParams.follower_nickname_1) {
      console.log('교환 상태 확인 결과:', exchangeStatus);

      // exists 속성이 true인 경우에만 "이미 교환된 명함" 메시지 표시
      if (exchangeStatus.exists === true) {
        alert('이미 교환된 명함입니다.');
        onClose();
        navigate('/');
      }
      // exists 속성이 명확하게 false인 경우에만 교환 진행
      else if (exchangeStatus.exists === false) {
        console.log('새로운 명함 교환 시작');
        performExchange(
          checkExchangeParams.follower_nickname_1,
          checkExchangeParams.follower_nickname_2,
          checkExchangeParams.follower_card_id_1,
          checkExchangeParams.follower_card_id_2,
        );
      }
      // 그 외의 경우 (undefined 등) 아무 작업도 수행하지 않음
    }
    // eslint-disable-next-line
  }, [exchangeStatus, checkExchangeParams]);

  const handleGoBack = () => {
    setIsDrawerOpen(false);
    // selectedCardId는 변경하지 않음 (원래 선택된 카드 유지)
  };

  // 선택 완료 버튼 핸들러 - 임시 선택된 카드를 실제 선택으로 적용
  const handleConfirmSelection = () => {
    setSelectedCardId(tempSelectedCardId);
    setIsDrawerOpen(false);
  };

  // 실제 교환 수행 함수
  const performExchange = async (
    followerNickname: string,
    followingNickname: string,
    followerCardId: string,
    followingCardId: string,
  ) => {
    try {
      const exchangeResult = await twoWayExchange({
        follower_nickname: followerNickname,
        following_nickname: followingNickname,
        follower_card_id: followerCardId,
        following_card_id: followingCardId,
      }).unwrap();

      if (exchangeResult.success) {
        alert('명함 교환이 완료되었습니다!');
        const moveToCardPage = confirm(`${followingNickname}님의 명함 페이지로 이동하시겠습니까?`);

        if (moveToCardPage) {
          onClose();
          // 사용자가 '예'를 선택한 경우 해당 명함 페이지로 이동
          navigate(`/${followingNickname}/${followingCardId}`);
        } else {
          onClose();
          // '아니오'를 선택한 경우 홈으로 이동
          navigate('/');
        }
      }
    } catch (error) {
      console.error('명함 교환 중 오류:', error);
      alert('명함 교환 중 오류가 발생했습니다.');
    }
  };

  const handleQRCodeScan = (decodedText: string) => {
    try {
      // URL에서 nickname과 cardId 추출
      // URL 형식: https://infinite-connect.site/user/{nickname}/{cardId}
      const urlPattern = /\/user\/([^/]+)\/([^/]+)/;
      const match = decodedText.match(urlPattern);

      if (match && match.length === 3) {
        const followingNickname = match[1]; // 스캔된 사용자의 nickname
        const followingCardId = match[2]; // 스캔된 사용자의 cardId

        // 현재 사용자 정보 확인
        if (nickname && selectedCardId) {
          // 자기 자신과 교환하려는 경우 방지
          if (nickname === followingNickname) {
            alert('자신의 명함과는 교환할 수 없습니다.');
            return;
          }

          // 교환 상태 확인을 위한 파라미터 설정
          console.log('교환 정보:', selectedCardId, nickname, followingCardId, followingNickname);
          setCheckExchangeParams({
            follower_nickname_1: nickname,
            follower_card_id_1: selectedCardId,
            follower_nickname_2: followingNickname,
            follower_card_id_2: followingCardId,
          });
        } else {
          alert('명함 교환을 위해 내 명함을 먼저 선택해주세요.');
        }
      } else {
        alert('유효하지 않은 QR 코드입니다.');
      }
    } catch (error) {
      console.error('QR 코드 처리 중 오류:', error);
      alert('QR 코드 처리 중 오류가 발생했습니다.');
    }
  };

  const selectedCardDetails = selectedCardId ? cardDetails[selectedCardId] : null;
  const selectedCardName = selectedCardDetails?.cardName || '명함';
  const selectedCardType = (selectedCardDetails?.cardType as CardType) || 'dawn';

  return (
    <div className="relative w-full h-full bg-transparent">
      {/* 카메라 화면 */}
      <div
        id="qr-scanner"
        ref={scannerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 5,
        }}
      />
      <div
        className={`
          absolute w-[240px] h-[20px] text-[22px] font-bold left-1/2 transform -translate-x-1/2
          text-center text-white z-50
        `}
        style={{ top: `${locationY}px` }}
      >
        QR 코드를 스캔하세요
      </div>

      <div className="absolute flex flex-row w-[335px] h-[82px] px-[16px] py-[22px] bg-[#2a2a2a] rounded-[8px] border-1 border-[#7b61ff] bottom-[60px] left-1/2 transform -translate-x-1/2 z-50">
        <div className="w-full h-full flex items-center gap-[10px]">
          <div className="mr-3 h-[38px] w-[62px] flex-shrink-0">
            <img
              src={CARD_TYPE_IMAGES[selectedCardType]?.sHorizontal}
              alt={`${selectedCardType} 카드`}
              className="h-full w-full object-contain rounded-md"
            />
          </div>
          <div className="flex-1 text-white text-[12px] leading-[150%]">
            교환할 명함 <br />[{selectedCardName}]
          </div>
          <Button
            btntype="enabled"
            className="w-[58px] h-[38px] py-[7px] rounded-[6px]"
            onClick={() => setIsDrawerOpen(true)}
          >
            <div className="text-[12px] leading-[24px]">변경</div>
          </Button>
        </div>
      </div>
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} handleOnly={true}>
        <DrawerContent hideIndicator className="bg-[#1a1a1a] pt-[21px] text-white">
          <div>
            <div className="flex flex-col justify-center item-center px-[24px] py-[30px] gap-[8px]">
              <div></div>
              <div className="flex justify-center text-[18px] leading-[140%] tracking-[-0.27px] text-[var(--text-primary)]">
                스캔하면 공유되는 내 명함 확인하세요!
              </div>
              <div className="flex justify-center text-[12px] leading-[20px] text-[var(--text-secondary)]">
                공유하고 싶은 명함을 선택해 주세요
              </div>
            </div>
            <div>
              <Carousel
                setApi={setApi}
                opts={{
                  align: 'center',
                  containScroll: 'trimSnaps',
                  duration: 20,
                  skipSnaps: false, // 스냅 포인트를 건너뛰지 않도록 설정
                  dragFree: false, // 드래그 후 항상 스냅 포인트에 정렬되도록 설정
                }}
              >
                <CarouselContent>
                  {businessCards.map((cardId) => {
                    return (
                      <CarouselItem key={cardId} className=" flex-shrink-0">
                        <div className="flex justify-center items-center">
                          <HorizontalCardPreview cardId={cardId} />
                        </div>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
              </Carousel>
              <div className="flex justify-center items-center mt-5 gap-[8px]">
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
            <div className="flex flex-col justify-center mt-4 px-[25px] pb-[40px] gap-[4px]">
              <Button btntype="enabled" className="w-full" onClick={handleConfirmSelection}>
                선택 완료
              </Button>
              <Button btntype="secondary" className="w-full" onClick={handleGoBack}>
                돌아가기
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default QRScannerTabContent;
