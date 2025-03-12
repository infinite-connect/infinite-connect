import Card from '@components/commons/Card/Card';
import { Button } from '@components/ui/button';
import React, { useEffect, useState } from 'react';
import { isMobile as detectMobile } from 'react-device-detect';
import { useNavigate } from 'react-router-dom';

const SelectCardDesignPage = (): React.JSX.Element => {
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [cardColor, setCardColor] = useState('#ff9999');
  const navigate = useNavigate();

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

  const handleButtonClick = (type: string) => {
    switch (type) {
      case 'A':
        setCardColor('#d32f2f');
        break;
      case 'B':
        setCardColor('#303f9f');
        break;
      case 'C':
        setCardColor('#388e3c');
        break;
      case 'D':
        setCardColor('#00838f');
        break;
      default:
        setCardColor('#424242');
    }
  };

  const handleCompleteSelection = () => {
    navigate('/additionalinfo');
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      {/* Card 컴포넌트 */}
      <Card isGlossy={true} isMobile={isMobileDevice} isChat={false} cardColor={cardColor} />
      <div className="flex justify-center items-center h-full text-white font-bold">
        카드 디자인
      </div>

      {/* 버튼 그룹 */}
      <div className="flex gap-4">
        <Button variant="outline" onClick={() => handleButtonClick('A')}>
          A 유형
        </Button>
        <Button variant="outline" onClick={() => handleButtonClick('B')}>
          B 유형
        </Button>
        <Button variant="outline" onClick={() => handleButtonClick('C')}>
          C 유형
        </Button>
        <Button variant="outline" onClick={() => handleButtonClick('D')}>
          D 유형
        </Button>
      </div>
      <div className="mt-4">
        <Button variant="outline" onClick={handleCompleteSelection}>
          선택 완료
        </Button>
      </div>
    </div>
  );
};

export default SelectCardDesignPage;
