import React from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@components/ui/drawer';
import QRCodeDisplay from '../QRcodeDisplay';

interface SelectCardDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const SelectCardDrawer: React.FC<SelectCardDrawerProps> = ({ isOpen, onClose }) => {
  const qrCodeData = 'user/1'; // QR 코드에 넣을 데이터

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="p-4">
        <DrawerHeader>
          <DrawerTitle>QR 코드</DrawerTitle>
        </DrawerHeader>
        {/* QRCodeDisplay 컴포넌트를 사용 */}
        <div className="flex justify-center items-center mt-4">
          <QRCodeDisplay url={qrCodeData} size={256} />
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700"
        >
          닫기
        </button>
      </DrawerContent>
    </Drawer>
  );
};

export default SelectCardDrawer;
