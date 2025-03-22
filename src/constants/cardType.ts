import { CardType } from '@components/SelectCardDesignPage/types';
import dawnFront from '@assets/CardDesign/dawnFront.png';
import dawnBack from '@assets/CardDesign/dawnBack.png';
import morningFront from '@assets/CardDesign/morningFront.png';
import morningBack from '@assets/CardDesign/morningBack.png';
import dayFront from '@assets/CardDesign/dayFront.png';
import dayBack from '@assets/CardDesign/dayBack.png';
import eveningFront from '@assets/CardDesign/eveningFront.png';
import eveningBack from '@assets/CardDesign/eveningBack.png';
import nightFront from '@assets/CardDesign/nightFront.png';
import nightBack from '@assets/CardDesign/nightBack.png';

export const CARD_TYPE_TEXT: Record<CardType, { label: string; timeRange: string }> = {
  dawn: { label: '새벽', timeRange: '6:00 ~ 9:00' },
  morning: { label: '아침', timeRange: '9:00 ~ 12:00' },
  day: { label: '낮', timeRange: '12:00 ~ 15:00' },
  evening: { label: '저녁', timeRange: '15:00 ~ 18:00' },
  night: { label: '밤', timeRange: '18:00 ~ 21:00' },
};

export const CARD_TYPE_IMAGES: Record<CardType, { front: string; back: string }> = {
  dawn: { front: dawnFront, back: dawnBack },
  morning: { front: morningFront, back: morningBack },
  day: { front: dayFront, back: dayBack },
  evening: { front: eveningFront, back: eveningBack },
  night: { front: nightFront, back: nightBack },
};
