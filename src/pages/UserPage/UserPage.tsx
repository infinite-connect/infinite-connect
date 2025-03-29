// UserCardPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { RootState } from '@store/store';
import {
  useGetBusinessCardByIdQuery,
  // useSetPrimaryBusinessCardMutation,
} from '@features/BusinessCard/api/businessCardApi';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@components/ui/carousel';
import HorizontalCard from '@components/commons/Card/HorizontalCard';
import { Header } from '@components/commons/Header/Header';
import { IconButton } from '@components/commons/Button/IconButton';
import QRScanDisplayModal from '@components/commons/QR/QRScanDisplayModal';
import ContactInfo from '@components/CardInfo/ContactInfo';
import CareerInfo from '@components/CardInfo/CareerInfo';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useGetUserBusinessCardsQuery } from '@features/UserPage/api/userCardListApi';
import AlarmIcon from '@components/NetworkingListPage/UI/AlarmIcon';
import QrIcon from '@components/NetworkingListPage/UI/QrIcon';
import { Logo } from '@components/commons/Header/Logo';
import { Plus } from 'lucide-react';

const UserPage: React.FC = (): React.JSX.Element => {
  // const navigate = useNavigate();
  const { nickname } = useParams<{ nickname: string }>();
  // const userInfo = useSelector((state: RootState) => state.user.userInfo);
  // const isMyPage = userInfo?.nickname === nickname;

  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isHeaderSolid, setIsHeaderSolid] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  // const [setPrimaryBusinessCard] = useSetPrimaryBusinessCardMutation();

  // const handleSetPrimary = async (cardId: string) => {
  //   try {
  //     await setPrimaryBusinessCard(cardId).unwrap();
  //     // 성공 처리 (예: 토스트 메시지 표시)
  //   } catch (error) {
  //     // 오류 처리
  //     console.error('대표 명함 설정 실패:', error);
  //   }
  // };

  // 명함 목록 조회
  const { data: businessCards = [], isLoading } = useGetUserBusinessCardsQuery(nickname || '', {
    skip: !nickname,
  });

  // 현재 선택된 명함 데이터
  const selectedCardId = businessCards[selectedIndex];
  const { data: businessCard } = useGetBusinessCardByIdQuery(selectedCardId, {
    skip: !selectedCardId,
  });

  // 캐러셀 인덱스 업데이트
  useEffect(() => {
    if (!api) return;

    const updateIndex = () => {
      setSelectedIndex(api.selectedScrollSnap());
    };

    api.on('select', updateIndex);
    return () => {
      api.off('select', updateIndex);
    };
  }, [api]);

  // 스크롤 이벤트 핸들러
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsHeaderSolid(scrollPosition > 56);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handlePrevCard = () => {
    if (api) {
      api.scrollPrev();
    }
  };

  // 다음 카드로 이동하는 함수
  const handleNextCard = () => {
    if (api) {
      api.scrollNext();
    }
  };

  if (isLoading)
    return <div className="min-h-screen flex items-center justify-center">로딩 중...</div>;
  if (!businessCards.length)
    return (
      <div className="min-h-screen flex items-center justify-center">등록된 명함이 없습니다</div>
    );

  return (
    <div
      className="min-h-screen text-white flex flex-col justify-start flex-grow overflow-y-auto"
      style={{
        background: 'linear-gradient(0deg, #121212 86.3%, #606171 100%)',
      }}
    >
      <Header
        className={`px-[16px] fixed top-0 left-0 z-12 w-full transition-colors duration-500 ${
          isHeaderSolid ? 'bg-[#121212]/70 backdrop-filter backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <Header.Left>
          <Logo />
          <span className="font-semibold text-[20px] text-white tracking-[-0.33px]">MY</span>
        </Header.Left>
        <Header.Right>
          <IconButton
            icon={<QrIcon />}
            onClick={() => setIsQRModalOpen(true)}
            aria-label="QR 코드 스캔"
          />
          <IconButton icon={<AlarmIcon />} aria-label="알림" />
        </Header.Right>
      </Header>

      <main className="relative flex flex-col mt-14 pt-[30px] pb-[24px]">
        {/* 프로필 섹션 */}
        <section className="px-4 space-y-4  gap-[20px]">
          {businessCard?.isPrimary && selectedIndex < businessCards.length && (
            <div className="p-4 text-[14px] leading-[150%] bg-[rgba(255,255,255,0.08)] rounded-[4px]">
              <div className="flex flex-row">
                <span className="text-[var(--text-accent)]">대표명함</span>
                <span>으로 설정되어있어요</span>
              </div>
              <span>대표명함은 온라인 리스트에 공개되는 명함이에요</span>
            </div>
          )}

          {/* 캐러셀 네비게이션 */}
          <div className="flex items-center justify-between">
            <IconButton
              icon={<ChevronLeft className="w-5 h-5" />}
              onClick={handlePrevCard}
              aria-label="이전 카드"
            />
            <div className="text-lg font-medium">
              {selectedIndex < businessCards.length
                ? businessCard?.cardName || businessCard?.businessName || '명함'
                : '명함 추가'}
            </div>
            <IconButton
              icon={<ChevronRight className="w-5 h-5" />}
              onClick={handleNextCard}
              aria-label="다음 카드"
            />
          </div>
        </section>
        <div className="pb-6">
          {/* 캐러셀 섹션 */}
          <Carousel
            setApi={setApi}
            opts={{
              align: 'center',
              containScroll: 'trimSnaps',
              duration: 20,
              skipSnaps: false,
              dragFree: false,
            }}
          >
            <CarouselContent>
              {businessCards.map((cardId) => (
                <CarouselItem key={cardId} className="flex-shrink-0">
                  <div className="flex justify-center items-center">
                    <HorizontalCard cardId={cardId} />
                  </div>
                </CarouselItem>
              ))}

              {/* 3장 미만일 때만 새 카드 추가 버튼 표시 */}
              {businessCards.length < 3 && (
                <CarouselItem className="flex justify-center items-center flex-shrink-0">
                  <div className="flex justify-center items-center">
                    <button
                      className="w-[334px] h-[206px] bg-transparent border-2 border-dashed border-[#7B61FF]/[0.50] rounded-[7.713px] flex justify-center items-center"
                      onClick={() => {}}
                    >
                      <Plus className="w-[32px] h-[32px] text-[var(--fill-primary)]" />
                    </button>
                  </div>
                </CarouselItem>
              )}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>

          {/* 인디케이터 - 추가 버튼용 인디케이터 포함 */}
          <div className="flex justify-center items-center gap-[8px]">
            {businessCards.map((_, index) => (
              <div
                key={index}
                className={`w-[8px] h-[8px] rounded-full ${
                  index === selectedIndex ? 'bg-white' : 'bg-[#6E6B6B]'
                }`}
              ></div>
            ))}
            {/* 3장 미만일 때만 추가 버튼용 인디케이터 표시 */}
            {businessCards.length < 3 && (
              <div
                className={`w-[8px] h-[8px] rounded-full ${
                  businessCards.length === selectedIndex ? 'bg-white' : 'bg-[#6E6B6B]'
                }`}
              ></div>
            )}
          </div>
        </div>

        {/* 정보 섹션 */}
        {businessCard && (
          <section className="space-y-6">
            <CareerInfo
              company={businessCard.company}
              jobTitle={businessCard.jobTitle}
              experienceYears={businessCard.experienceYears}
              fieldsOfExpertise={businessCard.fieldsOfExpertise}
              subExpertise={businessCard.subExpertise}
            />
            <ContactInfo
              phone={businessCard.phone}
              email={businessCard.email}
              primaryUrl={businessCard.primaryUrl || undefined}
              subFirstUrl={businessCard.subFirstUrl || undefined}
              subSecondUrl={businessCard.subSecondUrl || undefined}
            />
          </section>
        )}
      </main>

      <QRScanDisplayModal isOpen={isQRModalOpen} onClose={() => setIsQRModalOpen(false)} />
    </div>
  );
};

export default UserPage;
