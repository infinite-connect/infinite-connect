// AddModal.tsx
import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { Button } from '@components/ui/button';

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'confirm' | 'already';
  onConfirm?: () => void;
}

const AddModal: React.FC<AddModalProps> = ({
  isOpen,
  onClose,
  mode,
  onConfirm,
}): React.JSX.Element => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/70 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-800 p-6 rounded-lg shadow-lg text-white w-80 text-center z-50">
          {mode === 'confirm' ? (
            <>
              <Dialog.Title className="text-lg font-semibold">명함 추가 확인</Dialog.Title>
              <p className="text-gray-400 mt-2">이 명함을 내 명함첩에 추가하시겠습니까?</p>
              <div className="flex justify-end mt-4">
                <Button onClick={onConfirm} className="bg-blue-500 text-white mr-2">
                  추가
                </Button>
                <Button onClick={onClose} variant="outline" className="text-blue-500">
                  취소
                </Button>
              </div>
            </>
          ) : (
            <>
              <Dialog.Title className="text-lg font-semibold">추가되었습니다.</Dialog.Title>
              <p className="text-gray-400 mt-2">성공적으로 명함이 추가되었습니다.</p>
              <div className="flex justify-end mt-4">
                <Button onClick={onClose} className="bg-green-500 text-white">
                  확인
                </Button>
              </div>
            </>
          )}
          <Dialog.Close asChild>
            <button className="absolute top-3 right-3 text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AddModal;
