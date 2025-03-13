import Card from '@components/commons/Card/Card';
import { Button } from '@components/ui/button';
import React, { useEffect, useState } from 'react';
import { isMobile as detectMobile } from 'react-device-detect';

const CardPreviewPage = (): React.JSX.Element => {
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobileDevice(detectMobile || (isTouchDevice && isSmallScreen));
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h1 className="text-lg font-bold mb-2">명함이 생성되었습니다!</h1>
      <Card isGlossy={true} isMobile={isMobileDevice} isChat={false} cardColor="#1E90ff" />

      <Button variant="default" className="w-full py-3 rounded-lg mt-5">
        완료
      </Button>
    </div>
  );
};

export default CardPreviewPage;
