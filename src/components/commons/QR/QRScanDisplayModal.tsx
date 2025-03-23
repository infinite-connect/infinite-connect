import React, { useState } from 'react';
import { Dialog, DialogContent } from '@components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@components/ui/tabs';
import { X } from 'lucide-react';
import QRScannerTabContent from './QRScannerTabContent';
import QRDisplayTabContent from './QRDisplayTabContent';

interface QRScanDisplayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QRScanDisplayModal: React.FC<QRScanDisplayModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<string>('tab1');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        hideCloseButton
        className="
                fixed inset-0 w-full h-full max-w-none max-h-none 
                translate-x-0 translate-y-0 rounded-none border-none shadow-none
                p-0 flex flex-col bg-white
              "
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black opacity-80 hover:opacity-100"
        >
          <X size={24} />
        </button>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-grow">
          {/* TabsList 중앙 정렬 */}
          <TabsList className="flex justify-center self-center items-center mt-10 border-gray-300">
            <TabsTrigger value="tab1" className="px-6 py-2 text-sm font-medium text-black">
              QR 스캔
            </TabsTrigger>
            <TabsTrigger value="tab2" className="px-6 py-2 text-sm font-medium text-black">
              QR 표시
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="flex justify-start items-start pt-10 bg-white">
            {/* QR 스캐너 콘텐츠 */}
            <QRScannerTabContent />
          </TabsContent>
          <TabsContent value="tab2" className="p-6 text-white">
            <QRDisplayTabContent />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default QRScanDisplayModal;
