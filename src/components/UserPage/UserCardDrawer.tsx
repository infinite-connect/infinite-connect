import React from 'react';
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader } from '@components/ui/drawer';
import { Button } from '@components/commons/Button/Button';
import {
  Pencil1Icon,
  ListBulletIcon,
  BookmarkIcon,
  GearIcon,
  TrashIcon,
} from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';

interface CardManagementDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCardId: string;
  onSetPrimary: (cardId: string) => void;
}

const CardManagementDrawer: React.FC<CardManagementDrawerProps> = ({
  isOpen,
  onOpenChange,
  selectedCardId,
  onSetPrimary,
}) => {
  const navigate = useNavigate();

  const handleEditCard = () => {
    navigate(`edit/${selectedCardId}`);
    onOpenChange(false);
  };

  const handleSetPrimary = (selectedCardId: string) => {
    onSetPrimary(selectedCardId);
    onOpenChange(false);
  };

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent hideIndicator className="bg-[#1a1a1a] text-white rounded-t-3xl">
        <DrawerHeader className="flex justify-center items-center pt-[40px] pb-[24px] px-[24px]">
          <span className="text-[18px] font-bold text-[var(--text-primary)] leading-[140%] tracking-[-0.27px]">
            더보기
          </span>
        </DrawerHeader>

        <div className="flex flex-col justify-center item-center px-[24px] gap-[9px]">
          <Button btntype="secondary" className="w-full gap-[6px]" onClick={handleEditCard}>
            <Pencil1Icon />내 명함 수정하기
          </Button>
          <Button btntype="secondary" className="w-full gap-[6px]">
            <ListBulletIcon />
            교환 목록 바로가기
          </Button>
          <Button
            btntype="secondary"
            className="w-full gap-[6px]"
            onClick={() => handleSetPrimary(selectedCardId)}
          >
            <BookmarkIcon />
            대표명함으로 설정하기
          </Button>
          <Button btntype="secondary" className="w-full gap-[6px]">
            <GearIcon />
            항목별 정보 공개 설정하기
          </Button>
          <Button btntype="modalError" className="w-full gap-[6px]">
            <TrashIcon />내 명함 삭제하기
          </Button>
        </div>
        <DrawerFooter className="flex justify-center items-center pt-[40px] pb-[24px] px-[24px]">
          <Button btntype="enabled" className="w-full">
            닫기
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CardManagementDrawer;
