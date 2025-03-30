// UserCardPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import {
  BusinessCard,
  useGetBusinessCardByIdQuery,
  useUpdateBusinessCardMutation,
} from '@features/BusinessCard/api/businessCardApi';

import HorizontalCard from '@components/commons/Card/HorizontalCard';
import { Header } from '@components/commons/Header/Header';
import { IconButton } from '@components/commons/Button/IconButton';
import QRScanDisplayModal from '@components/commons/QR/QRScanDisplayModal';
import AlarmIcon from '@components/NetworkingListPage/UI/AlarmIcon';
import QrIcon from '@components/NetworkingListPage/UI/QrIcon';
import { Logo } from '@components/commons/Header/Logo';
import BottomNavbar from '@components/commons/BottomNavbar/BottomNavbar';
import CareerInfoEdit from '@components/CardInfo/CareerInfoEdit';
import CompanyInfoEdit from '@components/CardInfo/CompanyInfoEdit';
import ContactInfoEdit from '@components/CardInfo/ContactInfoEdit';
import { Button } from '@components/commons/Button/Button';

const UserCardEditPage: React.FC = (): React.JSX.Element => {
  // URL에서 nickname과 cardId 가져오기
  const { nickname, cardId } = useParams<{ nickname: string; cardId: string }>();
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const isMyPage = userInfo?.nickname === nickname;
  console.log('isMyPage:', isMyPage);
  console.log('cardId:', cardId);

  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isHeaderSolid, setIsHeaderSolid] = useState(false);

  // 명함 정보 조회
  const {
    data: businessCard,
    isLoading,
    error,
  } = useGetBusinessCardByIdQuery(cardId || '', {
    skip: !cardId,
  });
  const [updateBusinessCard] = useUpdateBusinessCardMutation();

  const [editedBusinessCard, setEditedBusinessCard] = useState<BusinessCard | null>(null);

  useEffect(() => {
    if (businessCard) {
      setEditedBusinessCard({ ...businessCard });
    }
  }, [businessCard]);

  const handleFieldChange = (field: keyof BusinessCard, value: string) => {
    setEditedBusinessCard((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  // URL 필드 변경 핸들러
  const handleUrlChange = (field: string, urlType: string, value: string) => {
    setEditedBusinessCard((prev) => {
      if (!prev) return prev; // null 체크

      const updated: BusinessCard = {
        ...prev,
        [field]: { [urlType]: value },
      };
      return updated;
    });
  };

  const hstoreFormat = (obj: Record<string, string>) => {
    return Object.entries(obj)
      .map(([key, value]) => `"${key}"=>"${value}"`)
      .join(',');
  };

  const handleEditInfoSave = async () => {
    if (!cardId || !editedBusinessCard) return;

    try {
      // 데이터베이스 필드명에 맞게 데이터 변환
      const updateData = {
        card_name: editedBusinessCard.cardName,
        fields_of_expertise: editedBusinessCard.fieldsOfExpertise,
        sub_expertise: editedBusinessCard.subExpertise,
        company: editedBusinessCard.company,
        phone: editedBusinessCard.phone,
        email: editedBusinessCard.email,
        business_website: editedBusinessCard.businessWebsite,
        experience_years: editedBusinessCard.experienceYears,
        card_type: editedBusinessCard.cardType,
        fax: editedBusinessCard.fax,
        job_title: editedBusinessCard.jobTitle,
        department: editedBusinessCard.department,
        primary_url: editedBusinessCard.primaryUrl
          ? hstoreFormat(editedBusinessCard.primaryUrl)
          : null,
        sub_url_01: editedBusinessCard.subFirstUrl
          ? hstoreFormat(editedBusinessCard.subFirstUrl)
          : null,
        sub_url_02: editedBusinessCard.subSecondUrl
          ? hstoreFormat(editedBusinessCard.subSecondUrl)
          : null,
        name: editedBusinessCard.name,
      };

      // 타입 정의
      type UpdateDataKey = keyof typeof updateData;

      // 타입 안전한 방식으로 처리
      (Object.keys(updateData) as UpdateDataKey[]).forEach((key) => {
        if (updateData[key] === undefined) {
          delete updateData[key];
        }
      });

      await updateBusinessCard({
        businessCardId: cardId,
        businessCard: updateData,
      }).unwrap();

      alert('명함 정보가 성공적으로 저장되었습니다.');
    } catch (error) {
      console.error('명함 정보 저장 실패:', error);
      alert('명함 정보 저장에 실패했습니다.');
    }
  };

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
    return (
      <div className="min-h-screen flex items-center justify-center text-white">로딩 중...</div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        명함 정보를 불러오는데 실패했습니다.
      </div>
    );
  if (!businessCard)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        명함 정보가 없습니다.
      </div>
    );

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
        <div className="flex justify-center items-center mb-4">
          <input
            type="text"
            value={editedBusinessCard?.cardName || ''}
            onChange={(e) => {
              if (!editedBusinessCard) return;

              const updatedCard: BusinessCard = {
                ...editedBusinessCard,
                cardName: e.target.value,
              };

              setEditedBusinessCard(updatedCard);
            }}
            className="w-full max-w-md px-4 py-2 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="카드 이름"
          />
        </div>
        {/* 명함 표시 */}
        <div className="flex justify-center items-center mb-6">
          <HorizontalCard cardId={cardId || ''} isTwoWayExchanged={true} isSetting={false} />
        </div>

        {/* 명함 정보 표시 */}
        <section className="space-y-[14px] px-4">
          <CompanyInfoEdit
            company={editedBusinessCard?.company || ''}
            fax={editedBusinessCard?.fax || ''}
            businessWebsite={editedBusinessCard?.businessWebsite || ''}
            jobTitle={editedBusinessCard?.jobTitle || ''}
            department={editedBusinessCard?.department || ''}
            onChange={(field, value) => handleFieldChange(field as keyof BusinessCard, value)}
          />
          <CareerInfoEdit
            experienceYears={editedBusinessCard?.experienceYears || ''}
            fieldsOfExpertise={editedBusinessCard?.fieldsOfExpertise || ''}
            subExpertise={editedBusinessCard?.subExpertise || ''}
            onChange={(field, value) => handleFieldChange(field as keyof BusinessCard, value)}
          />
          <ContactInfoEdit
            phone={editedBusinessCard?.phone}
            email={editedBusinessCard?.email}
            primaryUrl={editedBusinessCard?.primaryUrl}
            subFirstUrl={editedBusinessCard?.subFirstUrl}
            subSecondUrl={editedBusinessCard?.subSecondUrl}
            onUrlChange={(field, urlType, value) =>
              handleUrlChange(field as keyof BusinessCard, urlType, value)
            }
          />
        </section>
        <Button btntype="enabled" className="w-full py-2" onClick={handleEditInfoSave}>
          <div className="text-[14px] leading-[24px]">저장하기</div>
        </Button>
        <BottomNavbar />
      </main>

      <QRScanDisplayModal isOpen={isQRModalOpen} onClose={() => setIsQRModalOpen(false)} />
    </div>
  );
};

export default UserCardEditPage;
