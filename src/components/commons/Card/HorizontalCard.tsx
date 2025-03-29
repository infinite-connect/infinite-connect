import { CardType } from '@components/SelectCardDesignPage/types';
import { CARD_TYPE_IMAGES, CARD_TYPE_TEXT } from '@constants/cardType'; // 텍스트 매핑 상수
import { useState } from 'react';
import { Mail } from 'lucide-react';
import IconRenderer from './CardIconRenderer';
import { useGetBusinessCardByIdQuery } from '@features/BusinessCard/api/businessCardApi';
import { subExpertiseMaps } from '@constants/subExpertiseMap';
import { ICONS } from '@constants/cardIcon';
import { maskName } from '@utils/maskName';

type HorizontalCardProps = {
  cardId: string;
  isTwoWayExchanged?: boolean;
};

const HorizontalCard = ({
  cardId,
  isTwoWayExchanged = true,
}: HorizontalCardProps): React.JSX.Element => {
  const [isFront, setIsFront] = useState<boolean>(true); // 내부적으로 앞뒷면 상태 관리
  const [isFrontVisible, setIsFrontVisible] = useState<boolean>(true); // 화면 표시용 앞뒷면 상태
  const [isAnimating, setIsAnimating] = useState<boolean>(false); // 애니메이션 진행 여부

  const { data: cardData } = useGetBusinessCardByIdQuery(cardId || '', {
    skip: !cardId,
  });

  const primaryUrlType = Object.keys(cardData?.primaryUrl || {})[0] as keyof typeof ICONS;

  const type = 'dawn' as CardType;

  const handleFlip = () => {
    if (isAnimating) return; // 비활성화된 카드나 애니메이션 중인 카드는 클릭 불가

    setIsAnimating(true); // 애니메이션 시작
    setIsFront((prev) => !prev); // 내부적으로 앞뒷면 상태 전환

    // 애니메이션 중간(카드가 선으로 보이는 지점)에서 화면 표시용 상태 전환
    setTimeout(() => {
      setIsFrontVisible((prev) => !prev);
    }, 429);

    // 애니메이션 종료 시 클릭 가능 상태 복구
    setTimeout(() => {
      setIsAnimating(false);
    }, 1300); // 애니메이션 전체 시간과 동일하게 설정
  };

  return (
    <div
      onClick={handleFlip}
      className={`flex justify-center items-center overflow-visible`}
      style={{
        perspective: '1000px', // 카드의 3D 효과를 위한 원근감 설정
        boxSizing: 'border-box',
        width: '334px',
        height: '206px',
      }}
    >
      <div
        className="rounded-3xl relative scale-100"
        style={{
          width: '334px',
          height: '206px',
          overflow: 'visible', // 카드 요소에도 overflow-visible 추가
          transformStyle: 'preserve-3d', // 3D 회전 유지
          transformOrigin: 'center center', // 회전 중심을 중앙으로 설정
          borderRadius: '20px',
        }}
      >
        {/* 카드 앞뒷면 */}
        <div
          className="absolute inset-0 w-full h-full transition-transform duration-1300"
          style={{
            transform: isFront ? 'rotateY(0deg)' : 'rotateY(180deg)', // 내부 상태에 따라 회전 애니메이션 실행
          }}
        >
          {/* 앞면 */}
          <div
            className="absolute inset-0 w-full h-full flex flex-col items-center justify-end"
            style={{
              backgroundImage: `url(${CARD_TYPE_IMAGES[type].horizontal})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backfaceVisibility: isFrontVisible ? 'visible' : 'hidden',
              transform: 'rotateY(0deg)',
              zIndex: isFrontVisible ? 10 : -1, // 앞면이 활성화될 때 z-index를 높게 설정
            }}
          >
            <div className="relative flex flex-col w-full h-full justify-between gap-[18px]">
              <div className="flex flex-col w-full h-[78px] px-[20px] pt-[20px] gap-[4px]">
                <div className="h-[31px] text-[24px] text-[var(--text-black)] font-bold leading-[30.9px] tracking-[-0.36px]">
                  {subExpertiseMaps[cardData?.subExpertise || '']}
                </div>
                <div className="h-[26px] flex flex-row text-[16px] text-[var(--text-black)] gap-[4px] leading-[25.75px]">
                  <div>{cardData?.businessName}</div>
                  {isTwoWayExchanged && cardData ? cardData.name : maskName(cardData!.name)}
                </div>
              </div>
              <div className="flex flex-col justify-center items-center w-full h-[64px] px-[20px] pt-[8px] pb-[16px] gap-[4px] text-[var(--text-black)]">
                <div className="flex flex-row w-full justify-start items-center gap-[5.15px]">
                  <Mail className="w-[12px] h-[12px]" />
                  <div className="text-[12px] leading-[13.3px]">eightkim-mail@gmail.com</div>
                </div>
                {cardData?.primaryUrl && (
                  <div className="flex flex-row w-full items-center gap-[6px]">
                    <IconRenderer type={primaryUrlType} />
                    <div className="text-[12px] leading-[13.3px]">
                      {cardData.primaryUrl[primaryUrlType]}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 뒷면 */}
          <div
            className="absolute inset-0 w-full h-full flex flex-col justify-end items-center"
            style={{
              backgroundImage: `url(${CARD_TYPE_IMAGES[type].horizontal})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backfaceVisibility: !isFrontVisible ? 'visible' : 'hidden',
              transform: 'rotateY(180deg)',
              zIndex: isFrontVisible ? -1 : 10,
            }}
          >
            <div className="w-full h-full flex flex-col justify-between text-[var(--text-black)]">
              <div className="flex flex-col h-[78px] pt-[24px] pl-[20px] gap-[4px]">
                <div className="text-[20px] font-bold leading-[150%] tracking-[-0.3px]">
                  {CARD_TYPE_TEXT[type].label}
                </div>
                <div className="text-[12px] leading-[150%] tracking-[-0.3px]">
                  {CARD_TYPE_TEXT[type].timeRange}를 선호하는 네트워커
                </div>
              </div>

              <div className="flex w-full h-[78px] justify-start items-end pb-[20px] pl-[20px] text-[14px] leading-[150%]">
                {CARD_TYPE_TEXT[type].tag}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalCard;
