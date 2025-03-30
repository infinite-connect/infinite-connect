// UserCardPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useIncrementViewCountMutation } from '@features/User/api/viewCountApi';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { useGetBusinessCardByIdQuery } from '@features/BusinessCard/api/businessCardApi';
import HorizontalCard from '@components/commons/Card/HorizontalCard';
import { Header } from '@components/commons/Header/Header';
import { IconButton } from '@components/commons/Button/IconButton';
import QrIcon from '@components/NetworkingListPage/UI/QrIcon';
import AlarmIcon from '@components/NetworkingListPage/UI/AlarmIcon';
import QRScanDisplayModal from '@components/commons/QR/QRScanDisplayModal';
import { Button } from '@components/commons/Button/Button';
import { ChevronLeft } from 'lucide-react';
import { ScrollArea } from '@components/ui/scroll-area';
import CareerInfo from '@components/CardInfo/CareerInfo';
import ContactInfo from '@components/CardInfo/ContactInfo';
import {
  useCheckAllOneWayExchangeQuery,
  useCheckSpecificTwoWayExchangeQuery,
  useDeleteOneWayExchangeMutation,
  useOneWayExchangeMutation,
} from '@features/BusinessCard/api/exchangeApi';
import { useCheckUserBusinessCardVisibilityQuery } from '@features/Networking/networkingApi';
import { CARD_TYPE_TEXT, gradients } from '@constants/cardType';
import { maskName } from '@utils/maskName';

const UserCardPage: React.FC = (): React.JSX.Element => {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  // URL 파라미터: 상대방 명함 ID
  const { nickname, businessCardId } = useParams<{ nickname: string; businessCardId: string }>();
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isHeaderSolid, setIsHeaderSolid] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isTwoWayExchanged, setIsTwoWayExchanged] = useState(false);
  const isMyCard = userInfo?.nickname === nickname;

  // 명함 상세 데이터 API 호출
  const { data: businessCard, isLoading, error } = useGetBusinessCardByIdQuery(businessCardId!);

  // 단방향 확인
  const {
    data: exchangeStatus,
    isLoading: isExchangeLoading,
    refetch: refetchExchangeStatus,
  } = useCheckAllOneWayExchangeQuery(
    {
      follower_nickname: userInfo?.nickname || '',
      following_card_id: businessCardId!,
    },
    { skip: !userInfo?.nickname || !businessCardId },
  );

  const { data: twoWayExchangeStatus, refetch: refetchTwoWayExchangeStatus } =
    useCheckSpecificTwoWayExchangeQuery(
      {
        user_nickname: userInfo?.nickname || '',
        other_card_id: businessCardId!,
      },
      { skip: !userInfo?.nickname || !businessCardId },
    );

  // 대표명함 정보 가져오기
  const { data: primaryCardInfo } = useCheckUserBusinessCardVisibilityQuery(nickname!, {
    skip: !nickname,
  });
  const [incrementViewCount] = useIncrementViewCountMutation();
  const [oneWayExchange] = useOneWayExchangeMutation();
  const [deleteOneWayExchange] = useDeleteOneWayExchangeMutation();

  useEffect(() => {
    if (twoWayExchangeStatus?.exists !== undefined) {
      setIsTwoWayExchanged(twoWayExchangeStatus.exists);
    }
  }, [twoWayExchangeStatus]);

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

  useEffect(() => {
    if (nickname && userInfo?.nickname && nickname !== userInfo.nickname) {
      // URL의 nickname이 현재 로그인한 유저의 nickname과 다를 경우에만 조회수 증가
      incrementViewCount({
        nickname: userInfo.nickname, // 조회하는 사람의 닉네임 (현재 로그인한 사용자)
        businessCardId: businessCardId!, // 대상 명함 ID
      }).catch((err) => console.error('조회수 증가 실패:', err));
    }
    // eslint-disable-next-line
  }, [nickname, userInfo?.nickname, businessCardId]);

  const handleCardAction = async () => {
    if (isProcessing) return;

    if (!userInfo?.nickname) {
      alert('로그인이 필요합니다.');
      return;
    }

    if (!primaryCardInfo) {
      alert('대표 명함이 설정되어 있지 않습니다.');
      return;
    }

    setIsProcessing(true);

    try {
      if (!exchangeStatus?.exists && primaryCardInfo) {
        // 명함 추가하기
        const result = await oneWayExchange({
          follower_nickname: userInfo.nickname,
          follower_card_id: primaryCardInfo?.business_card_id,
          following_card_id: businessCardId!,
          following_nickname: nickname || '',
        }).unwrap();

        if (result.success) {
          alert('명함이 추가되었습니다.');
          await refetchExchangeStatus();
          await refetchTwoWayExchangeStatus();
        }
      } else {
        // 명함첩에서 삭제하기
        const result = await deleteOneWayExchange({
          follower_nickname: userInfo.nickname,
          following_card_id: businessCardId!,
        }).unwrap();

        if (result.success) {
          alert('명함이 삭제되었습니다.');
          await refetchExchangeStatus();
          await refetchTwoWayExchangeStatus();
        }
      }
    } catch (error) {
      console.error('명함 교환 실패:', error);
      alert('명함 교환에 실패했습니다.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">로딩 중...</div>
    );
  }
  if (error || !businessCard) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        명함 데이터를 불러오는데 실패했습니다.
      </div>
    );
  }

  const buttonText = exchangeStatus?.exists ? '명함첩에서 삭제하기' : '명함 추가하기';
  console.log(businessCard.interests);

  return (
    <div
      className="min-h-screen text-white flex flex-col justify-start flex-grow overflow-y-auto"
      style={{
        background: gradients[businessCard.cardType],
      }}
    >
      <Header
        className={`px-[16px] fixed top-0 left-0 z-12 w-full transition-colors duration-500 ${
          isHeaderSolid ? 'bg-[#121212]/70 backdrop-filter backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <Header.Left>
          <ChevronLeft className="w-7 h-7" />
        </Header.Left>
        <Header.Right>
          <IconButton icon={<QrIcon />} onClick={() => setIsQRModalOpen(true)} />
          <IconButton icon={<AlarmIcon />} />
        </Header.Right>
      </Header>
      <div className="relative flex flex-col mt-14 pt-[30px] pb-10 items-center justify-start overflow-x-hidden">
        <div className="w-full h px-4">
          {/* 이름*/}
          <div className="h-[48px] text-[32px] mb-4 text-[var(--text-accent)] font-bold leading-[150%]">
            {businessCard.businessName ||
              (isTwoWayExchanged ? businessCard.name : maskName(businessCard.name))}
          </div>
          {/* 타입 설명 */}
          <div className="flex flex-col p-4 rounded-[8px] text-white text-[14px] leading-[150%] bg-[#1F1F1F]">
            <div className="flex flex-row">
              <span className="text-[var(--text-accent)]">
                {CARD_TYPE_TEXT[businessCard.cardType].label}
              </span>
              <span>
                인{' '}
                {businessCard.businessName ||
                  (isTwoWayExchanged ? businessCard.name : maskName(businessCard.name))}
                님은
              </span>
            </div>
            <div>{CARD_TYPE_TEXT[businessCard.cardType].phrase}</div>
          </div>
          {/* 명함 이미지 */}
          <div className="flex py-0 justify-center">
            <HorizontalCard cardId={businessCardId!} isTwoWayExchanged={isTwoWayExchanged} />
          </div>
        </div>
        {/* 관심사 스크롤 */}
        {businessCard.interests && businessCard.interests.length > 0 && (
          <ScrollArea className="w-full pl-4 relative">
            <div className="flex flex-row gap-[6px] flex-nowrap overflow-x-auto">
              {businessCard.interests.map((interest, index) => (
                <div
                  key={index}
                  className="px-[10px] py-[8px] bg-gray-800 rounded-[20px] text-[12px] leading-[150%] text-white text-center whitespace-nowrap"
                >
                  {interest}
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
        {!isMyCard && (
          <div
            className={`w-full px-4 ${!businessCard.interests || businessCard.interests.length === 0 ? 'mt-2' : 'mt-7'} gap-6`}
          >
            <Button
              btntype="enabled"
              className="w-full py-2 font-medium"
              onClick={handleCardAction}
              disabled={isExchangeLoading || isProcessing}
            >
              <div className="text-[14px] leading-[24px]">
                {isExchangeLoading ? '로딩 중...' : isProcessing ? '처리 중...' : buttonText}{' '}
              </div>
            </Button>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-[10px]">
        <div className="flex flex-col gap-[10px]">
          <CareerInfo
            company={businessCard.company}
            jobTitle={businessCard.jobTitle}
            experienceYears={businessCard.experienceYears}
            fieldsOfExpertise={businessCard.fieldsOfExpertise}
            subExpertise={businessCard.subExpertise}
          />
        </div>

        <ContactInfo
          isTwoWayExchanged={isTwoWayExchanged}
          phone={businessCard.phone || undefined}
          email={businessCard.email || undefined}
          primaryUrl={businessCard.primaryUrl ?? undefined}
          subFirstUrl={businessCard.subFirstUrl ?? undefined}
          subSecondUrl={businessCard.subSecondUrl ?? undefined}
        />
      </div>
      <QRScanDisplayModal isOpen={isQRModalOpen} onClose={() => setIsQRModalOpen(false)} />
    </div>
  );
};

export default UserCardPage;
