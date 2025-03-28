import React, { useEffect, useState } from 'react';

import FullScreenPopup from '@components/NetworkingListPage/FullScreenPopup';
import BusinessCardConsentSheet from '@components/NetworkingListPage/BusinessCardConsentSheet';
import {
  useCheckUserBusinessCardVisibilityQuery,
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
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { setPrimaryCard } from '@features/Networking/slice/userPrimaryBusinessCardSlice';
const NetworkingList: React.FC = (): React.JSX.Element => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const nickname = userInfo?.nickname;
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [showConsentSheet, setShowConsentSheet] = useState(false);

  // 명함 공개 여부 확인
  const { data: userBusinessCard, isLoading } = useCheckUserBusinessCardVisibilityQuery(nickname!, {
    skip: !nickname,
  });
  console.log('명함 공개 여부 확인', userBusinessCard);

  // 대표 명함 데이터가 있으면 Redux 스토어에 저장
  useEffect(() => {
    if (userBusinessCard) {
      dispatch(
        setPrimaryCard({
          business_card_id: userBusinessCard.business_card_id,
          fields_of_expertise: userBusinessCard.fields_of_expertise,
          sub_expertise: userBusinessCard.sub_expertise,
          card_type: userBusinessCard.card_type,
        }),
      );
    }
  }, [userBusinessCard, dispatch]);

  //  명함 공개 여부 업데이트
  const [updateBusinessCardVisibility] = useUpdateBusinessCardVisibilityMutation();

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
