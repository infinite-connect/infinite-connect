import { useRef, MouseEvent, TouchEvent } from 'react';
import { Badge } from '@components/ui/badge';
import { Icon } from '@iconify/react/dist/iconify.js';
import {
  useGetBusinessCardByIdQuery,
  useGetUserByNicknameQuery,
} from '@features/BusinessCard/api/businessCardApi';

interface CardProps {
  isGlossy: boolean;
  isMobile: boolean;
  isInteractive?: boolean;
  cardId?: string; // 명함 ID
  nickname?: string;
  cardColor: string;
}

const Card = ({
  isGlossy,
  isMobile,
  isInteractive = true,
  cardId,
  nickname,
  cardColor,
}: CardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // 명함 데이터를 가져오는 RTK Query 훅
  const { data: cardData, isLoading: isCardLoading } = useGetBusinessCardByIdQuery(cardId || '', {
    skip: !cardId,
  });

  const { data: userData, isLoading: isUserLoading } = useGetUserByNicknameQuery(nickname || '', {
    skip: !nickname,
  });

  const handleMove = (e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
    if (!isInteractive) return;

    const card = e.currentTarget as HTMLDivElement;
    const rect = card.getBoundingClientRect();
    const clientX = isMobile
      ? (e as TouchEvent<HTMLDivElement>).touches[0].clientX
      : (e as MouseEvent<HTMLDivElement>).clientX;
    const clientY = isMobile
      ? (e as TouchEvent<HTMLDivElement>).touches[0].clientY
      : (e as MouseEvent<HTMLDivElement>).clientY;

    const mouseX = clientX - rect.left;
    const mouseY = clientY - rect.top;
    const xAxis = (clientX - rect.left - rect.width / 2) / 15;
    const yAxis = (clientY - rect.top - rect.height / 2) / 15;

    card.style.transform = `rotateY(${-xAxis}deg) rotateX(${yAxis}deg)`;

    const glossyOverlay = card.querySelector('.overlay.glossy') as HTMLElement;
    if (glossyOverlay) {
      glossyOverlay.style.background = `radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.03) 70%, transparent 100%)`;
      glossyOverlay.style.opacity = '1';
    }
  };

  const handleEnter = (e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
    if (!isInteractive) return;

    const card = e.currentTarget as HTMLDivElement;
    const glossyOverlay = card.querySelector('.overlay.glossy') as HTMLElement;

    if (glossyOverlay) {
      glossyOverlay.style.opacity = '1';
    }
  };

  const handleLeave = (e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
    if (!isInteractive) return;

    const card = e.currentTarget as HTMLDivElement;

    card.style.transform = 'rotateY(0deg) rotateX(0deg)';

    const glossyOverlay = card.querySelector('.overlay.glossy') as HTMLElement;
    if (glossyOverlay) {
      glossyOverlay.style.opacity = '0';
      glossyOverlay.style.background = 'none';
    }
  };

  const adjustColorBrightness = (color: string, amount: number): string => {
    let usePound = false;

    if (color[0] === '#') {
      color = color.slice(1);
      usePound = true;
    }

    const num = parseInt(color, 16);
    let r = (num >> 16) + amount;
    let g = ((num >> 8) & 0x00ff) + amount;
    let b = (num & 0x0000ff) + amount;

    r = Math.min(Math.max(0, r), 255);
    g = Math.min(Math.max(0, g), 255);
    b = Math.min(Math.max(0, b), 255);

    return `${usePound ? '#' : ''}${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
  };

  // 카드 내용 렌더링 함수
  const renderCardContent = () => (
    <div className="text-white text-center flex flex-col justify-center items-center gap-2">
      <p className="font-bold text-2xl">{userData?.name || '이종혁'}</p>
      <p className="font-bold text-xl">{cardData?.fieldsOfExpertise || '프론트엔드 개발자'}</p>

      <div className="flex flex-col items-start gap-2">
        <div className="flex items-center gap-2 text-sm">
          <Icon icon="mdi-light:email" className="w-5 h-5" />
          <span>{userData?.email || 'jonghyeok@example.com'}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Icon icon="mdi-light:user" className="w-5 h-5" />
          <span>{cardData?.subExpertise || 'React / TypeScript'}</span>
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {(cardData?.interests || ['Next.js', 'TypeScript', 'React']).map((interest) => (
          <Badge
            key={interest}
            variant="outline"
            className="flex text-white items-center gap-1 p-2 rounded-xl font-bold"
          >
            {interest}
          </Badge>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex justify-center items-center h-full perspective-[1500px]">
      <div
        ref={cardRef}
        className={`w-[80mm] h-[128mm] rounded-3xl shadow-lg transform-style-preserve-3d transition-transform duration-300 ease-out relative flex flex-col justify-center items-center gap-2 will-change-transform`}
        style={{
          backgroundImage: `linear-gradient(to bottom right, ${cardColor}, ${adjustColorBrightness(
            cardColor,
            -30,
          )})`,
        }}
        onMouseEnter={!isMobile && isInteractive ? handleEnter : undefined}
        onMouseMove={!isMobile && isInteractive ? handleMove : undefined}
        onMouseLeave={!isMobile && isInteractive ? handleLeave : undefined}
        onTouchStart={isMobile && isInteractive ? handleEnter : undefined}
        onTouchMove={isMobile && isInteractive ? handleMove : undefined}
        onTouchEnd={isMobile && isInteractive ? handleLeave : undefined}
      >
        {isGlossy && (
          <div className="overlay glossy absolute top-0 left-0 w-full h-full rounded-inherit pointer-events-none transition-opacity duration-300"></div>
        )}

        {/* 조건부 렌더링 */}
        {isCardLoading || isUserLoading ? (
          <p className="text-white">Loading...</p>
        ) : (
          renderCardContent()
        )}
      </div>
    </div>
  );
};

export default Card;
