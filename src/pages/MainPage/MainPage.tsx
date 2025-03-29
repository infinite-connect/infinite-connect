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
import SloganSection from '@components/MainPage/SloganSection';
import MyCardSection from '@components/MainPage/MyCardSection';
const MainPage = (): React.JSX.Element => {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const nickname = userInfo?.nickname;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 명함 공개 여부 확인
  const { data: userBusinessCard } = useCheckUserBusinessCardVisibilityQuery(nickname!, {
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
          is_public: userBusinessCard.is_public,
        }),
      );
    }
  }, [userBusinessCard, dispatch]);

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

  // 명함이 비공개라면 블러 + 밝기↓ 적용
  const isBlurred = !userBusinessCard?.is_public;

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

        <div className="relative">
          {/* 실제 컨텐츠: 블러처리 여부는 filter로 제어 */}
          <div
            className={
              isBlurred ? 'filter blur-sm brightness-75 pointer-events-none' : 'pointer-events-auto'
            }
          >
            <HotBusinessCardSection />
            <UserSimilarTypeSection />
            <UserFilterSection />
          </div>

          {/* 오버레이 (명함 비공개 시에만 표시) */}
          {isBlurred && (
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
              {/* 안내 텍스트 (배경 없이, 흰색 텍스트만) */}
              <div className="text-white text-center text-base px-4 drop-shadow-md">
                명함을 공개하면
                <br />
                네트워킹 서비스를 모두 이용하실 수 있어요!
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
