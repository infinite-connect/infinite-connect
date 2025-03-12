import { useRef, MouseEvent, TouchEvent } from 'react';
import { Button } from '@components/ui/button';

interface CardProps {
  isGlossy: boolean;
  isMobile: boolean;
  isChat: boolean;
}

const Card = ({ isGlossy, isMobile, isChat }: CardProps) => {
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
    const xAxis = (clientX - rect.left - rect.width / 2) / 20;
    const yAxis = (clientY - rect.top - rect.height / 2) / 20;

    // 카드 각도 조절
    card.style.transform = `rotateY(${-xAxis}deg) rotateX(${yAxis}deg)`;

    // 유광 효과 업데이트
    const glossyOverlay = card.querySelector('.overlay.glossy') as HTMLElement;
    if (glossyOverlay) {
      glossyOverlay.style.background = `radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.03) 70%, transparent 100%)`;
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

  return (
    <>
      <div className="flex justify-center items-center h-full perspective-[1500px]">
        <div
          ref={cardRef}
          className="w-[80mm] h-[128mm] bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl shadow-lg transform-style-preserve-3d transition-transform duration-300 ease-out relative flex flex-col justify-center items-center gap-2 will-change-transform"
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

          <div className="flex flex-row justify-center items-center gap-4">
            <Button
              className="w-9 h-9 bg-white text-blue-500 rounded-full shadow-lg flex justify-center items-center"
              disabled={!isChat}
            >
              💬
            </Button>
            <Button className="w-9 h-9 bg-white text-blue-500 rounded-full shadow-lg flex justify-center items-center">
              📚
            </Button>
          </div>

          <div className="text-white text-center flex flex-col justify-center items-center">
            <h1>이종혁</h1>
            <p className="font-bold text-2xl">프론트엔드 개발자</p>
            <p>E-mail: jonghyeok@example.com</p>
            <p>Phone: +123-456-7890</p>

            <div className="flex items-center">
              <span>github.com/leejh5314</span>
            </div>

            <div className="flex justify-center">
              <span className="bg-white/20 text-white font-bold text-xs py-1 px-2 rounded-full mx-2">
                Next.js
              </span>
              <span className="bg-white/20 text-white font-bold text-xs py-1 px-2 rounded-full mx-2">
                TypeScript
              </span>
              <span className="bg-white/20 text-white font-bold text-xs py-1 px-2 rounded-full mx-2">
                React
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
