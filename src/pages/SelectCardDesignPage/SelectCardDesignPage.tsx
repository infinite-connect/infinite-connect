import TypeCardCarousel from '@components/commons/Card/TypeCardCarousel';
import { CardType } from '@components/SelectCardDesignPage/types';
import { Button } from '@components/ui/button';
import { useUpdateBusinessCardTypeMutation } from '@features/BusinessCard/api/selectCardDesignApi';
import { RootState } from '@store/store';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const SelectCardDesignPage = (): React.JSX.Element => {
  const navigate = useNavigate();
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const [cardType, setCardType] = useState<CardType>('dawn');
  const [updateCardType, { isLoading }] = useUpdateBusinessCardTypeMutation();

  const location = useLocation();
  const { businessCardId } = location.state || {};

  const handleCompleteSelection = async () => {
    const validBusinessCardId = businessCardId;

    if (!validBusinessCardId) {
      alert('유효한 명함 ID가 없습니다.');
      return;
    }

    try {
      await updateCardType({ cardId: validBusinessCardId, cardType });
      console.log('선택한 타입:', cardType);
      alert('명함 타입이 성공적으로 업데이트되었습니다!');
      navigate('/additionalinfo');
    } catch (error) {
      console.error('명함 타입 업데이트 중 오류 발생:', error);
      alert('명함 타입 업데이트에 실패했습니다.');
    }
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
        <Button variant="outline" onClick={handleCompleteSelection} disabled={isLoading}>
          {isLoading ? '설정 중...' : '선택 완료'}
        </Button>
      </div>
    </div>
  );
};

export default SelectCardDesignPage;
