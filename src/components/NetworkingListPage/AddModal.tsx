import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddModal: React.FC<AddModalProps> = ({ isOpen, onClose }): React.JSX.Element => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/70 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-800 p-6 rounded-lg shadow-lg text-white w-80 text-center z-50">
          <Dialog.Title className="text-lg font-semibold">추가되었습니다.</Dialog.Title>
          <p className="text-gray-400 mt-2">성공적으로 명함이 추가되었습니다.</p>
          <button onClick={onClose} className="mt-4 bg-green-500 px-4 py-2 rounded-lg text-white">
            확인
          </button>
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
