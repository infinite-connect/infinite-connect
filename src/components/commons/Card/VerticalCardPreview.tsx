import { CardType } from '@components/SelectCardDesignPage/types';
import { CARD_TYPE_IMAGES, CARD_TYPE_OBJ } from '@constants/cardType';
import { Mail } from 'lucide-react';
import IconRenderer from './CardIconRenderer';
import { useGetBusinessCardByIdQuery } from '@features/BusinessCard/api/businessCardApi';
import { subExpertiseMaps } from '@constants/subExpertiseMap';
import { ICONS } from '@constants/cardIcon';

type VerticalCardPreviewProps = {
  cardId: string;
};

const VerticalCardPreview = ({ cardId }: VerticalCardPreviewProps): React.JSX.Element => {
  const { data: cardData } = useGetBusinessCardByIdQuery(cardId || '', {
    skip: !cardId,
  });

  console.log(cardData);

  const type = 'dawn' as CardType;
  const primaryUrlType = Object.keys(cardData?.primaryUrl || {})[0] as keyof typeof ICONS;
  const hasPrimaryUrl = primaryUrlType && cardData?.primaryUrl?.[primaryUrlType];

  return (
    <div
      className={`flex justify-center items-end overflow-visible scale-52`}
      style={{
        boxSizing: 'border-box',
        width: '236px',
        height: '370px',
      }}
    >
      <div
        className="rounded-3xl relative scale-100"
        style={{
          width: '236px',
          height: '332px',
          overflow: 'visible',
          borderRadius: '20px',
        }}
      >
        {/* 앞면 */}
        <div
          className="absolute inset-0 w-full h-full flex flex-col items-center justify-end"
          style={{
            backgroundImage: `url(${CARD_TYPE_IMAGES[type].vertical})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div
            className="absolute inset-0 top-[60px] left-1/2 w-[220px] h-[220px] flex items-center justify-center"
            style={{
              backgroundImage: `url(${CARD_TYPE_OBJ[type].obj})`,
              transform: 'translate(-50%, -50%)',
            }}
          ></div>
          <div className="relative flex flex-col w-full h-[140px] gap-[18px]">
            <div className="flex flex-col w-full h-[46px] px-[20px] gap-[4px]">
              <div className="h-[23px] text-[20px] text-[var(--text-black)] font-bold leading-[22.8px] tracking-[-0.33px]">
                {subExpertiseMaps[cardData?.subExpertise || '']}
              </div>
              <div className="h-[19px] flex flex-row text-[14px] text-[var(--text-black)] gap-[4px] leading-[19px]">
                <div>{cardData?.businessName}</div>
                <div>{cardData?.name}</div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-start w-full h-[74px] px-[20px] gap-[6px]">
              <div className="flex flex-row gap-[7.6px]">
                <Mail className="w-[12px] h-[12px]" />
                <div className="text-[12px] leading-[13.3px]">
                  {cardData?.email || 'eightkim-mail@gmail.com'}
                </div>
              </div>
              {hasPrimaryUrl && (
                <div className="flex flex-row gap-[7.6px]">
                  <IconRenderer type={primaryUrlType} size="12px" />
                  <div className="text-[12px] leading-[13.3px]">
                    {cardData?.primaryUrl?.[primaryUrlType]}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerticalCardPreview;
