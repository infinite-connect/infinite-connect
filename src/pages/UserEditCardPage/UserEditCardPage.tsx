// UserCardPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { useGetBusinessCardByIdQuery } from '@features/BusinessCard/api/businessCardApi';

import HorizontalCard from '@components/commons/Card/HorizontalCard';
import { Header } from '@components/commons/Header/Header';
import { IconButton } from '@components/commons/Button/IconButton';
import QRScanDisplayModal from '@components/commons/QR/QRScanDisplayModal';
import ContactInfo from '@components/CardInfo/ContactInfo';
import CareerInfo from '@components/CardInfo/CareerInfo';
import AlarmIcon from '@components/NetworkingListPage/UI/AlarmIcon';
import QrIcon from '@components/NetworkingListPage/UI/QrIcon';
import { Logo } from '@components/commons/Header/Logo';
import { CardType } from '@components/SelectCardDesignPage/types';
import CardManagementDrawer from '@components/UserPage/UserCardDrawer';
import BottomNavbar from '@components/commons/BottomNavbar/BottomNavbar';
const UserCardEditPage: React.FC = (): React.JSX.Element => {
  // const navigate = useNavigate();
  const { nickname } = useParams<{ nickname: string }>();
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const isMyPage = userInfo?.nickname === nickname;
  console.log(isMyPage);

  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isHeaderSolid, setIsHeaderSolid] = useState(false);

  // 현재 선택된 명함 데이터
  const { data: businessCard } = useGetBusinessCardByIdQuery(selectedCardId, {
    skip: !selectedCardId,
  });

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

  return (
    <div className="min-h-screen text-white flex flex-col justify-start flex-grow overflow-y-auto bg-[var(--bg-default-black)]">
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

      <main className="relative flex flex-col mt-14 pb-[113px] pt-[30px] z-10">
        {businessCard && (
          <section className="space-y-[14px]">
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
        <BottomNavbar />
      </main>

      <QRScanDisplayModal isOpen={isQRModalOpen} onClose={() => setIsQRModalOpen(false)} />
    </div>
  );
};

export default UserCardEditPage;
