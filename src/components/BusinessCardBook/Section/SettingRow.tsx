import React from 'react';
import { ChevronRight } from 'lucide-react';
import { CardType } from '@components/SelectCardDesignPage/types';
import { CARD_TYPE_IMAGES } from '@constants/cardType';
import { useGetCardsAlarmFollowedByUserNicknameQuery } from '@features/BusinessCard/api/exchangeApi';
import { useGetBusinessCardQuery } from '@features/Networking/networkingApi';
import { maskName } from '@utils/maskName';

interface SettingRowProps {
  label: string;
  onClick?: () => void;
  networkType: CardType;
  loginUserCardId: string;
  loginUser: string;
}

const SettingRow: React.FC<SettingRowProps> = ({
  label,
  networkType,
  onClick,
  loginUserCardId,
  loginUser,
}) => {
  const { data: followedCardsData } = useGetCardsAlarmFollowedByUserNicknameQuery({
    nickname: loginUser,
    cardId: loginUserCardId,
  });

  const { data: oneUserCard } = useGetBusinessCardQuery(
    followedCardsData?.cards?.[0]?.cardId || '',
    { skip: !followedCardsData || followedCardsData.cards.length === 0 },
  );

  const displayName = oneUserCard ? oneUserCard.business_name || maskName(oneUserCard.name) : '';

  // CARD_TYPE_IMAGES에서 해당 카드 타입의 horizontal 이미지를 가져옴
  const cardImage = CARD_TYPE_IMAGES[networkType]?.horizontal;

  return (
    <div onClick={onClick} className="flex items-center justify-between">
      <div className="flex items-center gap-[10px]">
        {/* 명함 이미지 */}
        <div className="w-[61px]">
          {cardImage && (
            <img src={cardImage} alt="Card" className="w-full h-full object-cover rounded-[4px]" />
          )}
        </div>

        {/* 텍스트 (메인 텍스트 + 서브 텍스트) */}
        <div className="flex flex-col text-xs leading-[1.5]">
          <span className="text-[var(--text-primary)] font-normal">{label}</span>
          <span className="text-[var(--text-tertiary)] font-medium">
            {followedCardsData?.cards.length === 0 ? (
              <span className="text-[var(--text-tertiary)] font-medium">
                아직 이 명함을 공유 받은 사람이 없어요
              </span>
            ) : (
              <span className="text-[var(--text-tertiary)] font-medium">
                {displayName}님 포함 총 {followedCardsData?.cards.length}명
              </span>
            )}
          </span>
        </div>
      </div>

      {/* chevron 아이콘 */}
      <ChevronRight className="w-5 h-5" style={{ stroke: 'var(--text-secondary)' }} />
    </div>
  );
};

export default SettingRow;
