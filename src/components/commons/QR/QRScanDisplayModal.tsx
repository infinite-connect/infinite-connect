import React, { useState } from 'react';
import { Dialog, DialogContent } from '@components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@components/ui/tabs';
import QRScannerTabContent from './QRScannerTabContent';
import QRDisplayTabContent from './QRDisplayTabContent';
import { Header } from '../Header/Header';
import { X } from 'lucide-react';

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
          translate-x-0 translate-y-0 rounded-none shadow-none
          p-0 flex flex-col bg-white gap-0 border-none
        "
      >
        {/* 탭 */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-grow justify-items-center items-center space-y-[36px] relative z-20 bg-[var(--bg-default-black)]"
        >
          {/* 헤더 */}
          <div
            className={`
              relative inset-0 w-full z-50 text-white 
              ${
                activeTab === 'tab1'
                  ? 'bg-[linear-gradient(0deg,rgba(18,18,18,0.863),rgba(55,88,113,1)),linear-gradient(0deg,rgba(0,0,0,0.7),rgba(0,0,0,0.7)),linear-gradient(180deg,rgba(93,117,250,1),rgba(57,72,153,1))]'
                  : ''
              }
            `}
          >
            <Header>Networking</Header>

            {/* X 버튼 */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center text-white hover:text-gray-300"
              aria-label="Close Modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* TabsList 중앙 정렬 */}
          <TabsList
            className="
              flex justify-center items-center w-[324px] h-[46px] bg-[#2a2a2a] rounded-[100px] relative z-20
            "
          >
            <TabsTrigger
              value="tab1"
              className="
                px-6 py-2 w-[166px] h-[38px] text-sm font-bold rounded-[100px]
                bg-[#7253ff] text-[var(--text-secondary)] data-[state=active]:bg-[#7253ff] data-[state=active]:text-[var(--text-secondary)] 
                data-[state=inactive]:bg-transparent data-[state=inactive]:text-[var(--text-secondary)]
              "
            >
              QR표시
            </TabsTrigger>
            <TabsTrigger
              value="tab2"
              className="
                px-6 py-2 w-[166px] h-[38px] text-sm font-bold rounded-[100px]
                bg-transparent text-[var(--text-secondary)] data-[state=active]:bg-[#7253ff] data-[state=active]:text-black
                data-[state=inactive]:bg-transparent data-[state=inactive]:text-[var(--text-secondary)]
              "
            >
              QR스캔
            </TabsTrigger>
          </TabsList>

          {/* QR 표시 콘텐츠 */}
          <div>
            <TabsContent value="tab1" className=" text-white bg-[var(--bg-default-black)]">
              <QRDisplayTabContent />
            </TabsContent>
          </div>

          {/* QR 스캔 콘텐츠 */}
          <TabsContent
            value="tab2"
            className={`
              ${activeTab === 'tab2' ? 'absolute inset-0 w-full h-full z-10' : ''}
              flex justify-start items-start
            `}
          >
            <QRScannerTabContent isActive={activeTab === 'tab2'} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default QRScanDisplayModal;
