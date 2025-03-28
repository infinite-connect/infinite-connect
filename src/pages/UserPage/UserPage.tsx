// UserCardPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { useGetBusinessCardByIdQuery } from '@features/BusinessCard/api/businessCardApi';
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
import { ChevronLeft } from 'lucide-react';
import { useGetUserBusinessCardsQuery } from '@features/UserPage/api/userCardListApi';

interface BusinessCard {
  id: string;
  name: string;
  businessName?: string;
  company?: string;
  jobTitle?: string;
  experienceYears?: string;
  fieldsOfExpertise?: string;
  subExpertise?: string;
  phone?: string;
  email?: string;
  primaryUrl?: Record<string, string>;
  subFirstUrl?: Record<string, string>;
  subSecondUrl?: Record<string, string>;
}

const UserPage: React.FC = (): React.JSX.Element => {
  const navigate = useNavigate();
  const { nickname } = useParams<{ nickname: string }>();
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const isMyPage = userInfo?.nickname === nickname;

  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isHeaderSolid, setIsHeaderSolid] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  // 명함 목록 조회
  const { data: cards = [], isLoading } = useGetUserBusinessCardsQuery<BusinessCard[]>(nickname!, {
    skip: !isMyPage,
  });
  const cardIds = cards.map((card) => card.id);

  // 현재 선택된 명함 데이터
  const selectedCardId = cardIds[selectedIndex];
  const { data: businessCard } = useGetBusinessCardByIdQuery(selectedCardId!, {
    skip: !selectedCardId,
  });

  // 캐러셀 인덱스 업데이트
  useEffect(() => {
    if (!api) return;
    const updateIndex = () => setSelectedIndex(api.selectedScrollSnap());
    api.on('select', updateIndex);
    return () => api.off('select', updateIndex);
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

  if (isLoading)
    return <div className="min-h-screen flex items-center justify-center">로딩 중...</div>;
  if (!cards.length)
    return (
      <div className="min-h-screen flex items-center justify-center">등록된 명함이 없습니다</div>
    );

  return (
    <div className="min-h-screen text-white flex flex-col bg-gradient-to-b from-[#606171] to-[#121212]">
      <Header
        className={`px-4 fixed top-0 w-full transition-colors duration-300 ${isHeaderSolid ? 'bg-[#121212]' : 'bg-transparent'}`}
      >
        <Header.Left>
          <IconButton
            icon={<ChevronLeft className="w-7 h-7" />}
            onClick={() => navigate(-1)}
            aria-label="뒤로 가기"
          />
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

      <main className="mt-20 px-4 pb-10 space-y-6">
        {/* 프로필 섹션 */}
        <section className="space-y-4">
          {isMyPage && (
            <div className="p-4 bg-white/5 rounded-lg">
              <p className="text-accent">{cards.length}개의 명함 보유 중</p>
              <p className="text-sm">대표명함은 온라인 리스트에 공개됩니다</p>
            </div>
          )}

          <h1 className="text-3xl font-bold text-accent">
            {businessCard?.businessName || businessCard?.name}
          </h1>

          {/* 캐러셀 섹션 */}
          <Carousel
            setApi={setApi}
            opts={{ align: 'start', containScroll: 'trimSnaps' }}
            className="w-full"
          >
            <CarouselContent className="-ml-2">
              {cardIds.map((cardId) => (
                <CarouselItem
                  key={cardId}
                  className="pl-2 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <HorizontalCard cardId={cardId} isActive={cardId === selectedCardId} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </section>

        {/* 정보 섹션 */}
        {businessCard && (
          <section className="space-y-6">
            <CareerInfo {...businessCard} />
            <ContactInfo {...businessCard} />
          </section>
        )}
      </main>

      <QRScanDisplayModal isOpen={isQRModalOpen} onClose={() => setIsQRModalOpen(false)} />
    </div>
  );
};

export default UserPage;
