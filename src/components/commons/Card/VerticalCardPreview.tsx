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

  const type = cardData?.cardType || 'none';
  const primaryUrlType = Object.keys(cardData?.primaryUrl || {})[0] as keyof typeof ICONS;

  return (
    <div
      className={`flex justify-center items-end overflow-visible`}
      style={{
        boxSizing: 'border-box',
        width: '124px',
        height: '200px',
      }}
    >
      <div
        className="rounded-3xl relative scale-100"
        style={{
          width: '124px',
          height: '175px',
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
            className="absolute inset-0 flex items-center justify-center"
            style={{
              top: '31.09px',
              left: '50%',
              width: '114px',
              height: '114px',
              backgroundImage: `url(${CARD_TYPE_OBJ[type].obj})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              transform: 'translate(-50%, -50%)',
              transformOrigin: 'center',
            }}
          ></div>
          <div className="relative flex flex-col w-full h-[80px] gap-[13px]">
            <div className="flex flex-col w-full h-[25px] px-[12px] gap-[4px]">
              <div className="text-[12px] text-[var(--text-black)] font-bold leading-[12px] tracking-[-0.18px]">
                {subExpertiseMaps[cardData?.subExpertise || '']}
              </div>
              <div className="flex flex-row text-[7px] text-[var(--text-black)] gap-[2px] leading-[10px]">
                <div>{cardData?.businessName}</div>
                <div>{cardData?.name}</div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-start w-full h-[42px] p-[12px] gap-[4px]">
              <div>
                <div className="h-[7px] flex flex-row items-center justify-start gap-[4px]">
                  <Mail className="w-[6px] h-[6px] text-[var(--text-black)]" />
                  <div className="text-[6px] leading-[7px] text-[var(--text-black)]">
                    {cardData?.email || ''}
                  </div>
                </div>
                <div className="h-[7px] flex flex-row items-center justify-start gap-[4px]">
                  <IconRenderer type={primaryUrlType} size="6px" color="text-[var(--text-black)]" />
                  <div className="text-[6px] leading-[7px] text-[var(--text-black)]">
                    {cardData?.primaryUrl?.[primaryUrlType] || ''}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerticalCardPreview;
