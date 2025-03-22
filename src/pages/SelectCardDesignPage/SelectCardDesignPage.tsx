import TypeCardCarousel from '@components/commons/Card/TypeCardCarousel';
import { CardType } from '@components/SelectCardDesignPage/types';
import { Button } from '@components/ui/button';
import { RootState } from '@store/store';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SelectCardDesignPage = (): React.JSX.Element => {
  const navigate = useNavigate();
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const [cardType, setCardType] = useState<CardType>('dawn');

  const handleCompleteSelection = () => {
    console.log('선택한 타입:', cardType);
    navigate('/additionalinfo');
  };

  return (
    <div
      className="flex justify-center items-center h-screen" // 화면 중앙 배치를 위한 스타일 추가
    >
      <div className="w-120 flex flex-col items-center gap-4 p-6">
        <h1>{userInfo?.name}님이 선호하는 네트워킹 시간대를 선택해주세요</h1>
        <div className="mb-10 items-center">
          <TypeCardCarousel
            onCardTypeChange={(newCardType: CardType) => setCardType(newCardType)}
          />
        </div>
        <Button variant="outline" onClick={handleCompleteSelection}>
          선택 완료
        </Button>
      </div>
    </div>
  );
};

export default SelectCardDesignPage;
