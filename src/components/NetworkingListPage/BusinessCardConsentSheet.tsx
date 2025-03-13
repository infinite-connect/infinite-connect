import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
} from '@components/ui/drawer';

interface BusinessCardConsentSheetProps {
  open: boolean;
  onAgree: () => void;
  onClose: () => void; // onClose 추가
}

const BusinessCardConsentSheet: React.FC<BusinessCardConsentSheetProps> = ({
  open,
  onAgree,
}): React.JSX.Element => {
  const navigate = useNavigate();

  return (
    <Drawer open={open} shouldScaleBackground={false} handleOnly={true}>
      <DrawerPortal>
        {/* 배경 클릭 비활성화 */}
        <DrawerOverlay className="inset-0 bg-black/70" />

        {/* 서랍을 아예 움직이지 못하도록 고정 */}
        <DrawerContent
          hideIndicator
          className="bottom-0 left-0 w-full bg-gray-900 text-white rounded-t-2xl p-6 z-50 
          "
        >
          <DrawerHeader>
            <DrawerTitle className="text-white text-lg font-semibold text-center mb-4">
              온라인 명함 리스트에 명함을 공개할까요?
            </DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pointer-events-auto">
            {' '}
            {/* 버튼은 클릭 가능하도록 */}
            <button
              onClick={onAgree}
              className="w-full bg-green-600 py-3 rounded-lg mb-3 cursor-pointer text-white font-semibold"
            >
              공개할래요
            </button>
            <button
              className="w-full text-gray-400 text-sm cursor-pointer"
              onClick={() => navigate('/')}
            >
              돌아갈래요
            </button>
          </div>
          <DrawerFooter>
            <p className="text-xs text-gray-500 text-center">
              공개하지 않으면 네트워킹 기능을 이용할 수 없어요.
            </p>
          </DrawerFooter>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
};

export default BusinessCardConsentSheet;
