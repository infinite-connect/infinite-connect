import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@components/ui/dialog';

interface QRScanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QRScanModal: React.FC<QRScanModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="h-full w-full p-6">
        <DialogHeader>
          <DialogTitle>두 번째 모달</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <p>이것은 두 번째 풀스크린 모달입니다.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRScanModal;
