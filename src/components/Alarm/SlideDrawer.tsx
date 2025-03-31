import React, { useState, useCallback } from 'react';
import BackArrow from './BackArrow';

interface SlideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode; // children 추가
}

const SlideDrawer: React.FC<SlideDrawerProps> = ({ isOpen, onClose, children }) => {
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchCurrentX, setTouchCurrentX] = useState<number | null>(null);

  // 터치 시작 시 x좌표 기록
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchCurrentX(e.touches[0].clientX);
  }, []);

  // 터치 이동 시 x좌표 갱신
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchCurrentX(e.touches[0].clientX);
  }, []);

  // 터치 끝나면, 스와이프 거리에 따라 onClose 실행
  const handleTouchEnd = useCallback(() => {
    if (touchStartX !== null && touchCurrentX !== null) {
      const distance = touchStartX - touchCurrentX;
      // 스와이프 거리가 50px 이상이면 닫기
      if (distance < -50) {
        onClose();
      }
    }
    setTouchStartX(null);
    setTouchCurrentX(null);
  }, [touchStartX, touchCurrentX, onClose]);

  return (
    <>
      {/* 백드롭 */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />}

      {/* Drawer 본체 */}
      <div
        className={`
          fixed top-0 bottom-0 right-0 z-50 w-full sm:w-[400px]
          bg-neutral-900 text-white
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="box-border flex items-center justify-between px-[16px] py-[12px] mb-5">
          <button onClick={onClose} className="text-sm bg-#121212  rounded">
            <BackArrow />
          </button>
          <h2 className="text-lg font-semibold">알림</h2>
          <div className="w-[24px] h-[24px]" />
        </div>
        <div className="overflow-y-auto h-full">{children}</div>
      </div>
    </>
  );
};

export default SlideDrawer;
