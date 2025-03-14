import { useRef, MouseEvent, TouchEvent } from 'react';
import { Badge } from '@components/ui/badge';
import { Icon } from '@iconify/react/dist/iconify.js';

interface CardProps {
  isGlossy: boolean;
  isMobile: boolean;
  isChat: boolean;
  cardColor: string;
}

const Card = ({ isGlossy, isMobile, cardColor }: CardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
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

    // 카드 각도 조절
    card.style.transform = `rotateY(${-xAxis}deg) rotateX(${yAxis}deg)`;

    // 유광 효과 업데이트
    const glossyOverlay = card.querySelector('.overlay.glossy') as HTMLElement;
    if (glossyOverlay) {
      glossyOverlay.style.background = `radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.03) 70%, transparent 100%)`;
      glossyOverlay.style.opacity = '1';
    }
  };

  const handleEnter = (e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
    const card = e.currentTarget as HTMLDivElement;
    const glossyOverlay = card.querySelector('.overlay.glossy') as HTMLElement;

    if (glossyOverlay) {
      glossyOverlay.style.opacity = '1';
    }
  };

  const handleLeave = (e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
    const card = e.currentTarget as HTMLDivElement;

    // 카드 초기화
    card.style.transform = 'rotateY(0deg) rotateX(0deg)';

    // 유광 효과 초기화
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

  return (
    <>
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
          onMouseEnter={!isMobile ? handleEnter : undefined}
          onMouseMove={!isMobile ? handleMove : undefined}
          onMouseLeave={!isMobile ? handleLeave : undefined}
          onTouchStart={isMobile ? handleEnter : undefined}
          onTouchMove={isMobile ? handleMove : undefined}
          onTouchEnd={isMobile ? handleLeave : undefined}
        >
          {isGlossy && (
            <div className="overlay glossy absolute top-0 left-0 w-full h-full rounded-inherit pointer-events-none transition-opacity duration-300"></div>
          )}

          <div className="text-white text-center flex flex-col justify-center items-center gap-2">
            <p className="font-bold text-2xl">이종혁</p>
            <p className="font-bold text-xl">프론트엔드 개발자</p>

            <div className="flex flex-col items-start gap-2">
              <div className="flex items-center gap-2 text-sm">
                <Icon icon="mdi-light:email" className="w-5 h-5" />
                <span>E-mail: jonghyeok@example.com</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Icon icon="mdi-light:phone" className="w-5 h-5" />
                <span>Phone: +123-456-7890</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Icon icon="uiw:github" className="w-5 h-5" />
                <span>github.com/leejh5314</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Icon icon="dashicons:instagram" className="w-5 h-5" />
                <span>instagram.com/jonghyeok</span>
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-4">
              <Badge
                variant="outline"
                className="flex text-white items-center gap-1 p-2 rounded-xl font-bold"
              >
                <Icon icon="logos:nextjs-icon" className="w-4 h-4" />
                Next.js
              </Badge>
              <Badge
                variant="outline"
                className="flex text-white items-center gap-1 p-2 rounded-xl font-bold"
              >
                <Icon icon="logos:typescript-icon" className="w-4 h-4" />
                TypeScript
              </Badge>
              <Badge
                variant="outline"
                className="flex text-white items-center gap-1 p-2 rounded-xl font-bold"
              >
                <Icon icon="logos:react" className="w-4 h-4" />
                React
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
