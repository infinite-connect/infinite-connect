import { CardType } from '@components/SelectCardDesignPage/types';
import { CARD_TYPE_IMAGES } from '@constants/cardType';
import { Mail } from 'lucide-react';
import IconRenderer from './CardIconRenderer';
import { useGetBusinessCardByIdQuery } from '@features/BusinessCard/api/businessCardApi';
import { subExpertiseMaps } from '@constants/subExpertiseMap';
import { ICONS } from '@constants/cardIcon';

type HorizontalCardPreviewProps = {
  cardId: string;
};

const HorizontalCardPreview = ({ cardId }: HorizontalCardPreviewProps): React.JSX.Element => {
  const { data: cardData } = useGetBusinessCardByIdQuery(cardId || '', {
    skip: !cardId,
  });

  const primaryUrlType = Object.keys(cardData?.primaryUrl || {})[0] as keyof typeof ICONS;
  const type = (cardData?.cardType as CardType) || 'dawn';

  return (
    <div
      className="flex justify-center items-center"
      style={{
        width: '253px',
        height: '155px',
        overflow: 'hidden',
      }}
    >
      <div
        className="rounded-xl relative"
        style={{
          width: '253px',
          height: '155px',
          borderRadius: '15px',
          backgroundImage: `url(${CARD_TYPE_IMAGES[type].horizontal})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative flex flex-col w-full h-full justify-between">
          {/* 상단 정보 영역 */}
          <div className="flex flex-col w-full px-[15px] pt-[15px] gap-[2px]">
            <div className="text-[18px] text-[var(--text-black)] font-bold leading-[23px] tracking-[-0.27px]">
              {subExpertiseMaps[cardData?.subExpertise || '']}
            </div>
            <div className="flex flex-row text-[12px] text-[var(--text-black)] gap-[3px] leading-[19px]">
              <div>{cardData?.businessName}</div>
              <div>{cardData?.name}</div>
            </div>
          </div>

          {/* 하단 연락처 영역 */}
          <div className="flex flex-col justify-center items-center w-full px-[15px] pt-[6px] pb-[12px] gap-[3px] text-[var(--text-black)]">
            <div className="flex flex-row w-full justify-start items-center gap-[4px]">
              <Mail className="w-[9px] h-[9px]" />
              <div className="text-[9px] leading-[10px] truncate">
                {cardData?.email || 'eightkim-mail@gmail.com'}
              </div>
            </div>
            <div className="flex flex-row w-full items-center gap-[4px]">
              <IconRenderer type={primaryUrlType} size="9px" />
              <div className="text-[9px] leading-[10px] truncate">
                {cardData?.primaryUrl?.[primaryUrlType]}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalCardPreview;
