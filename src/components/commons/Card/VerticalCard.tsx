import { CardType } from '@components/SelectCardDesignPage/types';
import { CARD_TYPE_IMAGES, CARD_TYPE_OBJ, CARD_TYPE_TEXT } from '@constants/cardType';
import { useState } from 'react';
import { Mail } from 'lucide-react';
import IconRenderer from './CardIconRenderer';
import { useGetBusinessCardByIdQuery } from '@features/BusinessCard/api/businessCardApi';
import { subExpertiseMaps } from '@constants/subExpertiseMap';
import { ICONS } from '@constants/cardIcon';
import { maskName } from '@utils/maskName';

type VerticalCardProps = {
  cardId: string;
  isTwoWayExchanged?: boolean;
};

const VerticalCard = ({
  cardId,
  isTwoWayExchanged = false,
}: VerticalCardProps): React.JSX.Element => {
  const [isFront, setIsFront] = useState(true);
  const [isFrontVisible, setIsFrontVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const { data: cardData } = useGetBusinessCardByIdQuery(cardId || '', {
    skip: !cardId,
  });

  const type = (cardData?.cardType || 'dawn') as CardType;
  const primaryUrlType = Object.keys(cardData?.primaryUrl || {})[0] as keyof typeof ICONS;

  const handleFlip = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsFront((prev) => !prev);
    setTimeout(() => setIsFrontVisible((prev) => !prev), 429);
    setTimeout(() => setIsAnimating(false), 1300);
  };

  return (
    <div
      onClick={handleFlip}
      className="flex justify-center items-center overflow-visible"
      style={{
        perspective: '1000px',
        boxSizing: 'border-box',
        width: '236px',
        height: '420px',
      }}
    >
      <div
        className="rounded-3xl relative scale-100"
        style={{
          width: '236px',
          height: '332px',
          overflow: 'visible',
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center',
          borderRadius: '20px',
        }}
      >
        <div
          className="absolute inset-0 w-full h-full transition-transform duration-1300"
          style={{
            transform: isFront ? 'rotateY(0deg)' : 'rotateY(180deg)',
          }}
        >
          {/* 앞면 */}
          <div
            className="absolute inset-0 w-full h-full flex flex-col items-center justify-end"
            style={{
              backgroundImage: `url(${CARD_TYPE_IMAGES[type]?.vertical})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backfaceVisibility: isFrontVisible ? 'visible' : 'hidden',
              transform: 'rotateY(0deg)',
              zIndex: isFrontVisible ? 10 : -1,
            }}
          >
            <div
              className="absolute inset-0 top-[60px] left-1/2 w-[220px] h-[220px] flex items-center justify-center"
              style={{
                backgroundImage: `url(${CARD_TYPE_OBJ[type]?.obj})`,
                transform: 'translate(-50%, -50%) rotateY(0deg)',
                visibility: isFrontVisible ? 'visible' : 'hidden',
              }}
            ></div>
            <div className="relative flex flex-col w-full h-[140px] gap-[18px]">
              <div className="flex flex-col w-full h-[46px] px-[20px] gap-[4px]">
                <div className="h-[23px] text-[20px] text-[var(--text-black)] font-bold leading-[22.8px] tracking-[-0.33px]">
                  {subExpertiseMaps[cardData?.subExpertise || ''] || ''}
                </div>
                <div className="h-[19px] flex flex-row text-[14px] text-[var(--text-black)] gap-[4px] leading-[19px]">
                  <div>{cardData?.businessName}</div>
                  <div>
                    {cardData && (isTwoWayExchanged ? cardData.name : maskName(cardData.name))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center items-start w-full h-[74px] px-[20px] gap-[6px] text-[var(--text-black)]">
                {cardData?.email && (
                  <div className="flex flex-row gap-[7.6px]">
                    <Mail className="w-[12px] h-[12px]" />
                    <div className="text-[12px] leading-[13.3px]">{cardData.email}</div>
                  </div>
                )}
                {cardData?.primaryUrl && primaryUrlType && (
                  <div className="flex flex-row gap-[7.6px]">
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
            className="absolute inset-0 w-full h-full flex flex-col justify-end items-center text-white"
            style={{
              backgroundImage: `url(${CARD_TYPE_IMAGES[type]?.vertical})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backfaceVisibility: !isFrontVisible ? 'visible' : 'hidden',
              transform: 'rotateY(180deg)',
              zIndex: isFrontVisible ? -1 : 10,
            }}
          >
            <div className="w-full h-[145px] flex flex-col gap-[14px] text-[var(--text-black)]">
              <div className="flex flex-col h-[53px] pl-[20px] gap-[10px]">
                <div className="text-[14px] leading-[20px]">
                  {CARD_TYPE_TEXT[type]?.timeRange || ''}를 선호하는 당신은
                </div>
                <div className="text-[20px] font-bold leading-[114%] tracking-[-0.3px]">
                  {CARD_TYPE_TEXT[type]?.label || ''}
                </div>
              </div>
              <div className="flex w-full h-[78px] justify-center items-center text-[14px] leading-[150%]">
                {CARD_TYPE_TEXT[type]?.tag || ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerticalCard;
