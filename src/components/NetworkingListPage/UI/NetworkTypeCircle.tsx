import React from 'react';
import dawnIcon from '@assets/NetWorkTypeCircle/dawnIcon.svg';
import morningIcon from '@assets/NetWorkTypeCircle/morningIcon.svg';
import dayIcon from '@assets/NetWorkTypeCircle/dayIcon.svg';
import eveningIcon from '@assets/NetWorkTypeCircle/eveningIcon.svg';
import nightIcon from '@assets/NetWorkTypeCircle/nightIcon.svg';

type CardType = 'dawn' | 'morning' | 'day' | 'evening' | 'night';

export interface NetworkTypeProps {
  cardType: CardType;
}

const NetworkTypCircle: React.FC<NetworkTypeProps> = ({ cardType }): React.JSX.Element => {
  // 카드 타입에 따라 적절한 아이콘을 선택
  let iconSrc: string;
  switch (cardType) {
    case 'dawn':
      iconSrc = dawnIcon;
      break;
    case 'morning':
      iconSrc = morningIcon;
      break;
    case 'day':
      iconSrc = dayIcon;
      break;
    case 'evening':
      iconSrc = eveningIcon;
      break;
    case 'night':
      iconSrc = nightIcon;
      break;
    default:
      // 혹은 기본 아이콘, 혹은 null
      iconSrc = dawnIcon;
  }

  return <img src={iconSrc} alt={cardType} />;
};

export default NetworkTypCircle;
