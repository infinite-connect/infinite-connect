import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VerticalCardPreview from '@components/commons/Card/VerticalCardPreview';
import CircleProgress from './CircleProgres';
import { Button } from '@components/commons/Button/Button';
import { useUpdateBusinessCardVisibilityMutation } from '@features/Networking/networkingApi';
import { setPrimaryCard } from '@features/Networking/slice/userPrimaryBusinessCardSlice';
import {
  useGetFollowersByCardIdQuery,
  useGetFollowingByCardIdQuery,
} from '@features/BusinessCard/api/exchangeApi';
import { RootState } from '@store/store';
import { CardType } from '@components/SelectCardDesignPage/types';

interface CardSlideProps {
  business_card_id: string;
  viewCount: number;
  cardType: CardType;
}

const CardSlide = ({
  business_card_id,
  viewCount,
  cardType,
}: CardSlideProps): React.JSX.Element => {
  const primaryCard = useSelector((state: RootState) => state.userBusinessCard.primaryCard);
  const dispatch = useDispatch();
  const [updateBusinessCardVisibility] = useUpdateBusinessCardVisibilityMutation();

  // 카드별 팔로워/팔로잉 데이터 조회
  const { data: followerUser } = useGetFollowersByCardIdQuery({
    cardId: business_card_id,
  });
  const { data: followingUser } = useGetFollowingByCardIdQuery({
    cardId: business_card_id,
  });

  if (!primaryCard) {
    return <div>로딩 중...</div>;
  }

  const titleMapping: Record<CardType, string> = {
    dawn: '신중한 새벽의 사색가',
    morning: '차분한 오전의 전략가',
    day: '활기찬 오후의 실천가',
    evening: '즐거운 저녁의 커넥터',
    night: '편안한 밤의 탐색자',
    none: '없음',
  };

  const savedCount = followerUser?.cardIds?.length ?? 0;
  const receivedCount = followingUser?.cardIds?.length ?? 0;

  const handleConsentAgree = async () => {
    if (!primaryCard.is_public) {
      try {
        await updateBusinessCardVisibility({
          business_card_id: primaryCard.business_card_id,
          is_public: true,
        }).unwrap();
        // 공개 성공 시 Redux 상태 업데이트
        dispatch(
          setPrimaryCard({
            ...primaryCard,
            is_public: true,
          }),
        );
      } catch (error) {
        console.error('명함 공개 실패:', error);
      }
    }
  };

  const isPrimaryCard = business_card_id === primaryCard.business_card_id ? true : false;
  console.log(isPrimaryCard);
  return (
    <div className="flex flex-col">
      <h2 className="text-center text-[16px] font-semibold">{titleMapping[cardType]}</h2>
      <h3 className="text-center text-[12px] font-normal text-[var(--text-secondary)]">
        추가 정보를 작성하면 사람들과 더 쉽게 연결돼요
      </h3>
      <div className="flex flex-row gap-4">
        <VerticalCardPreview cardId={business_card_id} />
        <div className="w-full flex flex-col justify-between">
          <CircleProgress cardId={business_card_id} />
          <div className="bg-[rgba(255,255,255,0.05)] px-2 py-3 gap-2 flex flex-col">
            <div className="flex justify-between text-[12px] font-normal">
              <p className="text-[var(--text-secondary)]">저장된 내 명함</p>
              <p>{savedCount}</p>
            </div>
            <div className="flex justify-between text-[12px] font-normal">
              <p className="text-[var(--text-secondary)]">받은 명함</p>
              <p>{receivedCount}</p>
            </div>
            <div className="flex justify-between text-[12px] font-normal">
              <p className="text-[var(--text-secondary)]">조회수</p>
              <p>{viewCount}</p>
            </div>
          </div>
        </div>
      </div>
      {isPrimaryCard && !primaryCard.is_public && (
        <Button onClick={handleConsentAgree} className="w-full mt-5">
          명함 공개하기
        </Button>
      )}
    </div>
  );
};

export default CardSlide;
