import React from 'react';
import { Drawer, DrawerContent } from '@components/ui/drawer';
import { Button } from '@components/commons/Button/Button';

interface CardManagementDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const CardManagementDrawer: React.FC<CardManagementDrawerProps> = ({ isOpen, onOpenChange }) => {
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent hideIndicator className="bg-[#1a1a1a] pt-[21px] text-white">
        <div>
          <div className="flex flex-col justify-center item-center px-[24px] py-[30px] gap-[8px]">
            <div></div>
            <div className="flex justify-center text-[18px] leading-[140%] tracking-[-0.27px] text-[var(--text-primary)]">
              스캔하면 공유되는 내 명함 확인하세요!
            </div>
            <div className="flex justify-center text-[12px] leading-[20px] text-[var(--text-secondary)]">
              공유하고 싶은 명함을 선택해 주세요
            </div>
          </div>

          <div className="flex flex-col justify-center mt-4 px-[25px] pb-[40px] gap-[4px]">
            <Button btntype="enabled" className="w-full">
              선택 완료
            </Button>
            <Button btntype="secondary" className="w-full">
              돌아가기
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CardManagementDrawer;
