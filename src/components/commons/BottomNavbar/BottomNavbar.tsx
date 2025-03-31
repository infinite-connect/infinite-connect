import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import homeIcon from '@assets/BottomNavbar/homeIcon.svg';
import twoPersonIcon from '@assets/BottomNavbar/twoPersonIcon.svg';
import NetworkTypeCircle from '@components/NetworkingListPage/UI/NetworkTypeCircle';

import { RootState } from '@store/store';
import { useSelector } from 'react-redux';
import { CardType } from '@components/SelectCardDesignPage/types';

const BottomNavbar: React.FC = () => {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const primaryCard = useSelector((state: RootState) => state.userBusinessCard.primaryCard);
  const navigate = useNavigate();
  const location = useLocation();

  // 각 네비게이션 버튼에 해당하는 경로를 정의합니다.
  const homeRoute = '/';
  const cardRoute = '/businesscardbook';
  const myRoute = `/${userInfo?.nickname}`;

  // 현재 경로와 비교하여 선택 여부를 반환하는 함수
  const isSelected = (route: string) => location.pathname === route;

  return (
    <div className="fixed bottom-0 left-0 w-full h-[76px] bg-[var(--bg-default-black)] flex justify-around text-white z-50 py-4">
      {/* 홈 버튼 */}
      <button type="button" onClick={() => navigate(homeRoute)} className="flex flex-col">
        <img
          src={homeIcon}
          alt="홈"
          className="w-6 h-6 mb-1"
          style={{ opacity: isSelected(homeRoute) ? 1 : 0.5 }}
        />
        <span className="text-[10px]" style={{ opacity: isSelected(homeRoute) ? 1 : 0.5 }}>
          홈
        </span>
      </button>

      {/* 명함 버튼 */}
      <button type="button" onClick={() => navigate(cardRoute)} className="flex flex-col">
        <img
          src={twoPersonIcon}
          alt="명함"
          className="w-6 h-6 mb-1"
          style={{ opacity: isSelected(cardRoute) ? 1 : 0.5 }}
        />
        <span className="text-[10px]" style={{ opacity: isSelected(cardRoute) ? 1 : 0.5 }}>
          명함
        </span>
      </button>

      {/* MY 버튼 (사용자 카드 타입 아이콘) */}
      <button type="button" onClick={() => navigate(myRoute)} className="flex flex-col">
        <NetworkTypeCircle
          className="w-[16px] h-[24px]"
          cardType={primaryCard?.card_type as CardType}
        />
        <span className="mt-1 text-[10px]" style={{ opacity: isSelected(myRoute) ? 1 : 0.5 }}>
          MY
        </span>
      </button>
    </div>
  );
};

export default BottomNavbar;
