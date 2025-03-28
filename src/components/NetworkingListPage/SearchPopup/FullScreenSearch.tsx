import React from 'react';
import { Dialog, DialogContent } from '@components/ui/dialog';

interface FullScreenSearchProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const FullScreenSearch: React.FC<FullScreenSearchProps> = ({ open, onClose, children }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        hideCloseButton
        className="
          !fixed !inset-0 !w-full !h-full !max-w-none !max-h-none 
          !translate-x-0 !translate-y-0 !rounded-none !border-none !shadow-none
          p-0 flex flex-col bg-[var(--bg-default-black)]
        "
      >
        <div className="flex-1 overflow-y-auto px-4 pb-8">{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default FullScreenSearch;
