import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '@components/NetworkingListPage/Card';
import AddModal from '@components/NetworkingListPage/AddModal';
import { Check, Plus } from 'lucide-react';
import { Button } from '@components/ui/button';
import { QrCode, Scan } from 'lucide-react';
import QRDrawer from '@components/commons/QR/QRDrawer';

interface BusinessCard {
  company: string;
  name: string;
  role: string;
  experience: string;
  skills: string[];
}

const UserCardPage: React.FC = (): React.JSX.Element => {
  const { userId, businessCardId } = useParams();
  const [businessCard, setBusinessCard] = useState<BusinessCard | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isQRDrawerOpen, setIsQRDrawerOpen] = useState(false);

  useEffect(() => {
    // TODO: 실제 API 요청으로 변경
    const fetchBusinessCard = async () => {
      const mockData: BusinessCard = {
        company: '대박회사',
        name: '홍길동',
        role: 'Developer',
        experience: '프론트엔드 n년차',
        skills: ['JavaScript', 'Git', '풀스택', 'MySQL'],
      };
      setBusinessCard(mockData);
    };
    fetchBusinessCard();
  }, [userId, businessCardId]);

  if (!businessCard) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">로딩 중...</div>
    );
  }

  // + 버튼 클릭 시 모달 열고 버튼 상태 변경
  const handleOpenModal = () => {
    setIsModalOpen(true);
    setIsChecked(true); // 버튼 상태 체크로 변경
  };

  // 모달 닫기 시 버튼 원상복귀
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-between flex-grow">
      {/* 헤더 */}
      <header className="relative z-10 flex items-center p-4 bg-gray-800 text-lg font-semibold">
        {/* 페이지 타이틀 */}
        <div className="absolute inset-0 flex justify-center items-center text-white">
          명함 상세보기
        </div>

        {/* 버튼 그룹 */}
        <div className="ml-auto flex space-x-2 z-20">
          <Button
            variant="outline"
            size="sm"
            className="text-black"
            onClick={() => {
              setIsQRDrawerOpen(true);
              console.log('QR Drawer 열림');
            }}
          >
            <Scan className="h-6 w-6 text-black" />
            QR 스캔
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-black"
            onClick={() => {
              setIsQRDrawerOpen(true);
              console.log('QR 표시');
            }}
          >
            <QrCode className="h-6 w-6" />
            QR 표시
          </Button>
        </div>
      </header>

      <div className="relative flex flex-col items-center justify-center flex-grow">
        <Card isGlossy={true} isMobile={false} isChat={false} />

        {/* 버튼 애니메이션 (Tailwind 사용) */}
        <button
          onClick={handleOpenModal}
          className={`w-16 h-16 mt-10 flex items-center justify-center rounded-full bg-green-500 cursor-pointer shadow-lg 
            transition-all duration-300 transform ${isChecked ? 'scale-110' : 'scale-100'}`}
        >
          {isChecked ? (
            <Check size={32} className="text-white transition-opacity duration-200" />
          ) : (
            <Plus size={32} className="text-white transition-opacity duration-200" />
          )}
        </button>
      </div>

      {/* 하단 네비게이션 */}
      <div className="w-full bg-gray-700 py-3 text-center text-white">네비게이션 바</div>

      {/* 모달 */}
      <AddModal isOpen={isModalOpen} onClose={handleCloseModal} />

      {/* QR Drawer */}
      <QRDrawer isOpen={isQRDrawerOpen} onClose={() => setIsQRDrawerOpen(false)} />
    </div>
  );
};

export default UserCardPage;
