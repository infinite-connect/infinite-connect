import { CardType } from '@components/SelectCardDesignPage/types';
import morningVertical from '@assets/CardDesign/VerticalCard/morningVertical.png';
import dayVertical from '@assets/CardDesign/VerticalCard/dayVertical.png';
import eveningVertical from '@assets/CardDesign/VerticalCard/eveningVertical.png';
import nightVertical from '@assets/CardDesign/VerticalCard/nightVertical.png';
import dawnVertical from '@assets/CardDesign/VerticalCard/dawnVertical.png';

import morningHorizontal from '@assets/CardDesign/HorizontalCard/morningHorizontal.png';
import dayHorizontal from '@assets/CardDesign/HorizontalCard/dayHorizontal.png';
import eveningHorizontal from '@assets/CardDesign/HorizontalCard/eveningHorizontal.png';
import nightHorizontal from '@assets/CardDesign/HorizontalCard/nightHorizontal.png';
import dawnHorizontal from '@assets/CardDesign/HorizontalCard/dawnHorizontal.png';

import smallMorningHorizontal from '@assets/CardDesign/SmallHorizontalCard/smallMorningHorizontal.png';
import smallDayHorizontal from '@assets/CardDesign/SmallHorizontalCard/smallDayHorizontal.png';
import smallEveningHorizontal from '@assets/CardDesign/SmallHorizontalCard/smallEveningHorizontal.png';
import smallNightHorizontal from '@assets/CardDesign/SmallHorizontalCard/smallNightHorizontal.png';
import smallDawnHorizontal from '@assets/CardDesign/SmallHorizontalCard/smallDawnHorizontal.png';

import morningObj from '@assets/CardDesign/CardObj/morningObj.png';
import dayObj from '@assets/CardDesign/CardObj/dayObj.png';
import eveningObj from '@assets/CardDesign/CardObj/eveningObj.png';
import nightObj from '@assets/CardDesign/CardObj/nightObj.png';
import dawnObj from '@assets/CardDesign/CardObj/dawnObj.png';

export const CARD_TYPE_TEXT: Record<
  CardType,
  { type: string; label: string; carouselTime: string; timeRange: string; tag: string }
> = {
  morning: {
    type: '오전',
    label: '차분한 오전의 전략가',
    carouselTime: '10:00 - 12:00',
    timeRange: '10:00~12:00',
    tag: '#계획적인 #성실한 #체계적인',
  },
  day: {
    type: '오후',
    label: '활기찬 오후의 실천가',
    carouselTime: '12:00 - 14:00',
    timeRange: '12:00~14:00',
    tag: '#효율적인 #생산성 #빠른네트워킹',
  },
  evening: {
    type: '저녁',
    label: '즐거운 저녁의 커넥터',
    carouselTime: '17:00 - 20:00',
    timeRange: '17:00~20:00',
    tag: '#친목 #캐주얼한 #자연스러운',
  },
  night: {
    type: '밤',
    label: '편안한 밤의 탐색자',
    carouselTime: '20:00 - 23:00',
    timeRange: '20:00~23:00',
    tag: '#심도있는대화 #몰입형 #깊이있는',
  },
  dawn: {
    type: '새벽',
    label: '신중한 새벽의 사색가',
    carouselTime: '06:00 - 09:00',
    timeRange: '06:00~09:00',
    tag: '#소규모 #조용한네트워킹 #영감',
  },
};

export const CARD_TYPE_IMAGES: Record<
  CardType,
  { vertical: string; horizontal: string; sHorizontal: string }
> = {
  morning: {
    vertical: morningVertical,
    horizontal: morningHorizontal,
    sHorizontal: smallMorningHorizontal,
  },
  day: { vertical: dayVertical, horizontal: dayHorizontal, sHorizontal: smallDayHorizontal },
  evening: {
    vertical: eveningVertical,
    horizontal: eveningHorizontal,
    sHorizontal: smallEveningHorizontal,
  },
  night: {
    vertical: nightVertical,
    horizontal: nightHorizontal,
    sHorizontal: smallNightHorizontal,
  },
  dawn: { vertical: dawnVertical, horizontal: dawnHorizontal, sHorizontal: smallDawnHorizontal },
};

export const CARD_TYPE_OBJ: Record<CardType, { obj: string }> = {
  morning: { obj: morningObj },
  day: { obj: dayObj },
  evening: { obj: eveningObj },
  night: { obj: nightObj },
  dawn: { obj: dawnObj },
};
