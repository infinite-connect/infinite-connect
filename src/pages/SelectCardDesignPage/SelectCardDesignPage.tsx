import { Button } from '@components/commons/Button/Button';
import TypeCardCarousel from '@components/commons/Card/TypeCardCarousel';
import { Header } from '@components/commons/Header/Header';
import { Logo } from '@components/commons/Header/Logo';
import { CardType } from '@components/SelectCardDesignPage/types';
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
      className="flex flex-col justify-center items-center h-screen box-border"
      style={{
        background: 'linear-gradient(0deg, rgba(18, 18, 18, 1) 86.3%, rgba(96, 97, 113, 1) 100%)',
      }}
    >
      <div className="h-[44px]"></div>
      <Header className="px-[16px] bg-transparent z-12 fixed top-0 left-0 ">
        <Header.Left>
          <Logo />
          <span className="font-semibold text-[20px] text-white">Networking</span>
        </Header.Left>
      </Header>
      {/* 정보 & 캐러셀 영역 */}
      <div className="flex-1">
        <div className="text-white text-[20px] font-bold mt-[36px] h-[56px] mb-[22px] mx-[19px]">
          {userInfo?.name}님이 선호하는 <br /> 네트워킹 시간대를 선택해주세요
        </div>
        <div className="items-center">
          <TypeCardCarousel
            onCardTypeChange={(newCardType: CardType) => setCardType(newCardType)}
          />
        </div>
      </div>
      <div className="flex w-full h-[104px] mt-[22px] pt-[16px] pb-[24px] px-[16px] ">
        <Button
          btntype="enabled"
          className="w-full py-2"
          onClick={handleCompleteSelection}
          disabled={isLoading}
        >
          {isLoading ? '설정 중...' : '선택 완료'}
        </Button>
      </div>
    </div>
  );
};

export default SelectCardDesignPage;
