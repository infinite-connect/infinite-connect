import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { useNavigate } from 'react-router-dom';
import { Header } from '@components/commons/Header/Header';
import { IconButton } from '@components/commons/Button/IconButton';
import QrIcon from '@components/NetworkingListPage/UI/QrIcon';
import SearchIcon from '@components/NetworkingListPage/UI/SearchIcon';
import AlarmIcon from '@components/NetworkingListPage/UI/AlarmIcon';
import { Logo } from '@components/commons/Header/Logo';
import HotBusinessCardSection from '@components/NetworkingListPage/HotBusinessCardSection';
import UserSimilarTypeSection from '@components/NetworkingListPage/UserSimilarTypeSection';
import UserFilterSection from '@components/NetworkingListPage/UserFilterSection';
import { setPrimaryCard } from '@features/Networking/slice/userPrimaryBusinessCardSlice';
import { useCheckUserBusinessCardVisibilityQuery } from '@features/Networking/networkingApi';
import { useUpdateBusinessCardVisibilityMutation } from '@features/Networking/networkingApi';
import BusinessCardConsentSheet from '@components/NetworkingListPage/BusinessCardConsentSheet';
import SloganSection from '@components/MainPage/SloganSection';
import MyCardSection from '@components/MainPage/MyCardSection';
const MainPage = (): React.JSX.Element => {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const nickname = userInfo?.nickname;
  const navigate = useNavigate();
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

  if (!userInfo) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-default-black)] text-white">
        <p className="text-xl mb-4">로그인이 필요합니다.</p>
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors"
        >
          로그인하기
        </button>
      </div>
    );
  }

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
        <SloganSection />
        <MyCardSection />
        <HotBusinessCardSection />
        <UserSimilarTypeSection />
        <UserFilterSection />
      </div>

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

export default MainPage;
