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

import morningThumbNail from '@assets/CardDesign/CardThumbNail/morningThumbNail.png';
import dayThumbNail from '@assets/CardDesign/CardThumbNail/dayThumbNail.png';
import eveningThumbNail from '@assets/CardDesign/CardThumbNail/eveningThumbNail.png';
import nightThumbNail from '@assets/CardDesign/CardThumbNail/nightThumbNail.png';
import dawnThumbNail from '@assets/CardDesign/CardThumbNail/dawnThumbNail.png';

import morningObj from '@assets/CardDesign/CardObj/morningObj.png';
import dayObj from '@assets/CardDesign/CardObj/dayObj.png';
import eveningObj from '@assets/CardDesign/CardObj/eveningObj.png';
import nightObj from '@assets/CardDesign/CardObj/nightObj.png';
import dawnObj from '@assets/CardDesign/CardObj/dawnObj.png';

export const CARD_TYPE_TEXT: Record<
  CardType,
  {
    type: string;
    label: string;
    phrase: string;
    carouselTime: string;
    timeRange: string;
    tag: string;
  }
> = {
  morning: {
    type: '오전',
    label: '차분한 오전의 전략가',
    phrase: '차분하고 계획적인 네트워킹을 선호해요.',
    carouselTime: '10:00 - 12:00',
    timeRange: '10:00~12:00',
    tag: '#계획적인 #성실한 #체계적인',
  },
  day: {
    type: '오후',
    label: '활기찬 오후의 실천가',
    phrase: '활기차고 효율적인 네트워킹을 선호해요.',
    carouselTime: '12:00 - 14:00',
    timeRange: '12:00~14:00',
    tag: '#효율적인 #생산성 #빠른네트워킹',
  },
  evening: {
    type: '저녁',
    label: '즐거운 저녁의 커넥터',
    phrase: '친목과 캐주얼한 대화를 선호해요.',
    carouselTime: '17:00 - 20:00',
    timeRange: '17:00~20:00',
    tag: '#친목 #캐주얼한 #자연스러운',
  },
  night: {
    type: '밤',
    label: '편안한 밤의 탐색자',
    phrase: '깊이 있는 대화, 아이디어 교환을 선호해요.',
    carouselTime: '20:00 - 23:00',
    timeRange: '20:00~23:00',
    tag: '#심도있는대화 #몰입형 #깊이있는',
  },
  dawn: {
    type: '새벽',
    label: '신중한 새벽의 사색가',
    phrase: '깊이 있는 소규모 네트워크를 선호해요.',
    carouselTime: '06:00 - 09:00',
    timeRange: '06:00~09:00',
    tag: '#소규모 #조용한네트워킹 #영감',
  },
  none: {
    type: 'none',
    label: 'none',
    phrase: 'none',
    carouselTime: 'none',
    timeRange: 'none',
    tag: 'none',
  },
};

export const CARD_TYPE_IMAGES: Record<
  CardType,
  { vertical: string; horizontal: string; sHorizontal: string; thumbnail: string }
> = {
  morning: {
    vertical: morningVertical,
    horizontal: morningHorizontal,
    sHorizontal: smallMorningHorizontal,
    thumbnail: morningThumbNail,
  },
  day: {
    vertical: dayVertical,
    horizontal: dayHorizontal,
    sHorizontal: smallDayHorizontal,
    thumbnail: dayThumbNail,
  },
  evening: {
    vertical: eveningVertical,
    horizontal: eveningHorizontal,
    sHorizontal: smallEveningHorizontal,
    thumbnail: eveningThumbNail,
  },
  night: {
    vertical: nightVertical,
    horizontal: nightHorizontal,
    sHorizontal: smallNightHorizontal,
    thumbnail: nightThumbNail,
  },
  dawn: {
    vertical: dawnVertical,
    horizontal: dawnHorizontal,
    sHorizontal: smallDawnHorizontal,
    thumbnail: dawnThumbNail,
  },
  none: { vertical: 'none', horizontal: 'none', sHorizontal: 'none', thumbnail: 'none' },
};

export const CARD_TYPE_OBJ: Record<CardType, { obj: string }> = {
  morning: { obj: morningObj },
  day: { obj: dayObj },
  evening: { obj: eveningObj },
  night: { obj: nightObj },
  dawn: { obj: dawnObj },
  none: { obj: 'none' },
};

export const gradients: Record<CardType, string> = {
  dawn: 'linear-gradient(0deg, #121212 86.3%, #9A8BC6 100%)', // 새벽
  morning: 'linear-gradient(0deg, #121212 86.3%, #375871 100%)', // 오전
  day: 'linear-gradient(0deg, #121212 86.3%, #61856B 100%)', // 오후
  evening: 'linear-gradient(0deg, #121212 86.3%, #7D596D 100%)', // 저녁
  night: 'linear-gradient(0deg, #121212 86.3%, #606171 100%)', // 밤
  none: 'linear-gradient(0deg, #121212 86.3%, ##635589 100%)', // 기본값
};
