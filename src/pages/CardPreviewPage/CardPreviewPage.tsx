import { Button } from '@components/commons/Button/Button';
import VerticalCard from '@components/commons/Card/VerticalCard';
import { Header } from '@components/commons/Header/Header';
import { Logo } from '@components/commons/Header/Logo';
import { RootState } from '@store/store';
import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const CardPreviewPage = (): React.JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const businessCardId = location.state?.businessCardId || '';

  const handleGoHome = () => {
    navigate('/');
  };

  // 명함 페이지로 이동하는 함수
  const handleViewCard = () => {
    if (userInfo?.nickname) {
      navigate(`/${userInfo.nickname}`);
    } else {
      // 닉네임이 없는 경우 예외 처리
      console.error('사용자 닉네임을 찾을 수 없습니다.');
      // 사용자에게 알림을 표시할 수도 있습니다
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-default-black)]  text-white px-5">
      {/* Header */}
      <Header>
        <Header.Left>
          <Logo />
        </Header.Left>
      </Header>

      {/* 상단 안내 영역 */}
      <div className="flex flex-col items-center justify-center text-center px-6 pt-20 pb-10">
        <h1 className="text-2xl font-extrabold mb-2">명함 생성이 완료되었어요</h1>
        <p className="text-sm text-gray-300">새로운 사람들과의 멋진 연결을 시작해 보세요!</p>
      </div>

      {/* 카드 영역 */}
      <div className="flex items-center justify-center  px-6 mb-8">
        <VerticalCard cardId={businessCardId} />
      </div>

      {/* 버튼 영역 */}
      <div className="mt-auto px-1 pb-10 space-y-3">
        <Button btntype="enabled" className="w-full" onClick={handleGoHome}>
          네트워킹 홈으로 가기
        </Button>
        <Button btntype="secondary" className="w-full" onClick={handleViewCard}>
          명함 확인하기
        </Button>
      </div>
    </div>
  );
};

export default CardPreviewPage;
