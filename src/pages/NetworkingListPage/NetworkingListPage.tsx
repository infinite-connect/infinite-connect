import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FullScreenPopup from '@components/NetworkingListPage/FullScreenPopup';
import BusinessCardConsentSheet from '@components/NetworkingListPage/BusinessCardConsentSheet';
import {
  useCheckUserBusinessCardVisibilityQuery,
  useGetNetworkingListQuery,
  useUpdateBusinessCardVisibilityMutation,
} from '@features/Networking/networkingApi';
import { Header } from '@components/commons/Header/Header';
import { Logo } from '@components/commons/Header/Logo';
import QrIcon from '@components/NetworkingListPage/UI/QrIcon';
import { IconButton } from '@components/commons/Button/IconButton';
import SearchIcon from '@components/NetworkingListPage/UI/SearchIcon';
import HotBusinessCardSection from '@components/NetworkingListPage/HotBusinessCardSection';
import AlarmIcon from '@components/NetworkingListPage/UI/AlarmIcon';
import UserSimilarTypeSection from '@components/NetworkingListPage/UserSimilarTypeSection';
import UserFiterSection from '@components/NetworkingListPage/UserFilterSection';

const NetworkingList: React.FC = (): React.JSX.Element => {
  const nickname = 'test20Nickname'; // 테스트용 닉네임
  const location = useLocation();

  const [showPopup, setShowPopup] = useState(false);
  const [showConsentSheet, setShowConsentSheet] = useState(false);

  // 네트워킹 리스트 가져오기
  const { data: networkingList, refetch } = useGetNetworkingListQuery(nickname);
  console.log('네트워킹 리스트:', networkingList);
  // 명함 공개 여부 확인
  const { data: userBusinessCard, isLoading } = useCheckUserBusinessCardVisibilityQuery(nickname);

  //  명함 공개 여부 업데이트
  const [updateBusinessCardVisibility] = useUpdateBusinessCardVisibilityMutation();

  // 상세명함페이지에서 친구 추가 후 리스트 쿼리 재요청
  useEffect(() => {
    refetch();
  }, [location, refetch]);

  // 최초 접근 시 풀 팝업 로직 처리
  useEffect(() => {
    if (!localStorage.getItem('seenNetworkingPopup')) {
      setShowPopup(true);
    }
  }, []);

  // 명함 공개 여부 확인 후 바텀 시트 노출
  useEffect(() => {
    if (!isLoading && userBusinessCard?.is_primary && !userBusinessCard.is_public) {
      setShowConsentSheet(true);
    }
  }, [userBusinessCard, isLoading]);

  const handlePopupXClose = () => {
    setShowPopup(false);
  };

  const handleDontShowPopup = () => {
    setShowPopup(false);
    localStorage.setItem('seenNetworkingPopup', 'true');
  };

  // 명함 공개 처리
  const handleConsentAgree = async () => {
    if (userBusinessCard?.is_primary) {
      try {
        await updateBusinessCardVisibility({
          business_card_id: userBusinessCard.business_card_id,
          is_public: true, // 공개 처리
        }).unwrap();

        setShowConsentSheet(false);
      } catch (error) {
        console.error('명함 공개 실패:', error);
      }
    }
  };

  const handleQrClick = () => {
    console.log('qr클릭');
  };

  return (
    <div className="min-h-screen bg-[var(--bg-default-black)]  text-white">
      <Header className="px-[16px] bg-[var(--bg-default-black)] z-12 fixed top-0 left-0 ">
        <Header.Left>
          <Logo />
          <span>Networking</span>
        </Header.Left>
        <Header.Right>
          <IconButton icon={<QrIcon />} onClick={handleQrClick} />
          <IconButton icon={<SearchIcon />} onClick={handleQrClick} />
          <IconButton icon={<AlarmIcon />} onClick={handleQrClick} />
        </Header.Right>
      </Header>
      <div className="pt-14">
        <HotBusinessCardSection />

        <UserSimilarTypeSection />

        <UserFiterSection />
      </div>

      {/** 풀팝업창, 공개 확인 바텀시트 등  */}
      <FullScreenPopup
        open={showPopup}
        onClose={handlePopupXClose}
        onDontShowAgain={handleDontShowPopup}
      />

      {!showPopup && (
        <BusinessCardConsentSheet
          open={showConsentSheet}
          onClose={() => setShowConsentSheet(false)}
          onAgree={handleConsentAgree}
        />
      )}
    </div>
  );
};

export default NetworkingList;
