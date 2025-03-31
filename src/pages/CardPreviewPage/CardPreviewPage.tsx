import { Button } from '@components/commons/Button/Button';
import VerticalCard from '@components/commons/Card/VerticalCard';
import { Header } from '@components/commons/Header/Header';
import { Logo } from '@components/commons/Header/Logo';
import React from 'react';
import { useLocation } from 'react-router-dom';

const CardPreviewPage = (): React.JSX.Element => {
  const location = useLocation();
  const businessCardId = location.state?.businessCardId || '';
  console.log(businessCardId);

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
      <div className="mt-auto px-1 pb-10">
        <Button>확인</Button>
      </div>
    </div>
  );
};

export default CardPreviewPage;
