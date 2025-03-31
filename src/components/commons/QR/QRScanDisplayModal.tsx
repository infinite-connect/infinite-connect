import React, { useState } from 'react';
import { Dialog, DialogContent } from '@components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@components/ui/tabs';
import QRScannerTabContent from './QRScannerTabContent';
import QRDisplayTabContent from './QRDisplayTabContent';
import { Header } from '../Header/Header';
import { Logo } from '../Header/Logo';
import { IconButton } from '../Button/IconButton';
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
          !fixed !inset-0 !w-full !h-full !max-w-none !max-h-none 
          !translate-x-0 !translate-y-0 !rounded-none !border-none !shadow-none
          p-0 flex flex-col
        "
      >
        {/* 헤더 */}
        <Header className="px-[16px] bg-transparent fixed top-11 left-0 z-12">
          <Header.Left>
            <Logo />
            <span className="font-semibold text-[20px] text-white tracking-[-0.33px]">
              Networking
            </span>
          </Header.Left>
          <Header.Right>
            <IconButton icon={<X className="w-[24px] h-[24px] text-white" />} onClick={onClose} />
          </Header.Right>
        </Header>
        {/* 탭 */}
        <div
          className={`pt-25 px-1 h-full flex justify-center items-start space-y-[36px]
            ${
              activeTab === 'tab1'
                ? 'bg-[linear-gradient(0deg,#121212_86.3%,#375871_100%),linear-gradient(0deg,rgba(0,0,0,0.70)_0%,rgba(0,0,0,0.70)_100%),linear-gradient(180deg,#5D75FA_0%,#394899_100%)]'
                : ''
            }`}
        >
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex justify-center items-center"
          >
            {/* TabsList 중앙 정렬 */}
            <TabsList
              className="
              flex justify-center items-center self-center mt-9 w-[324px] h-[46px] bg-[#2a2a2a] rounded-[100px] relative z-20
            "
            >
              <TabsTrigger
                value="tab1"
                className="
                px-6 py-2 w-[166px] h-[38px] text-[14px] font-bold leading-[20px] rounded-[100px]
                bg-[#7253ff] text-[var(--text-secondary)] data-[state=active]:bg-[#7253ff] data-[state=active]:text-[var(--text-secondary)] 
                data-[state=inactive]:bg-transparent data-[state=inactive]:text-[var(--text-secondary)]
              "
              >
                QR표시
              </TabsTrigger>
              <TabsTrigger
                value="tab2"
                className="
                px-6 py-2 w-[166px] h-[38px] text-[14px] font-bold leading-[20px] rounded-[100px]
                bg-transparent text-[var(--text-secondary)] data-[state=active]:bg-[#7253ff] data-[state=active]:text-black
                data-[state=inactive]:bg-transparent data-[state=inactive]:text-[var(--text-secondary)]
              "
              >
                QR스캔
              </TabsTrigger>
            </TabsList>

            {/* QR 표시 콘텐츠 */}
            <TabsContent value="tab1" className=" text-white bg-[var(--bg-default-black)] pt-9">
              <QRDisplayTabContent />
            </TabsContent>

            {/* QR 스캔 콘텐츠 */}
            <TabsContent
              value="tab2"
              className={`
              ${activeTab === 'tab2' ? 'absolute inset-0 w-full h-full z-10' : ''}
              flex justify-start items-start
            `}
            >
              <QRScannerTabContent isActive={activeTab === 'tab2'} onClose={onClose} />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRScanDisplayModal;
