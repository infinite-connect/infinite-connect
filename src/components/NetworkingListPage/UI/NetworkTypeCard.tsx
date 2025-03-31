import React from 'react';
import dawnCard from '@assets/NetWorkTypeCard/dawnCard.png';
import morningCard from '@assets/NetWorkTypeCard/morningCard.png';
import dayCard from '@assets/NetWorkTypeCard/dayCard.png';
import eveningCard from '@assets/NetWorkTypeCard/eveningCard.png';
import nightCard from '@assets/NetWorkTypeCard/nightCard.png';

type CardType = 'dawn' | 'morning' | 'day' | 'evening' | 'night' | 'none';

interface NetworkTypeCardProps {
  cardType: CardType;
}

const NetworkTypeCard: React.FC<NetworkTypeCardProps> = ({ cardType }) => {
  let imageSrc: string = cardType;

  switch (cardType) {
    case 'dawn':
      imageSrc = dawnCard;
      break;
    case 'morning':
      imageSrc = morningCard;
      break;
    case 'day':
      imageSrc = dayCard;
      break;
    case 'evening':
      imageSrc = eveningCard;
      break;
    case 'night':
      imageSrc = nightCard;
      break;
  }

  return <img className="object-cover w-full h-full rounded-md" src={imageSrc} alt={cardType} />;
};

export default NetworkTypeCard;
