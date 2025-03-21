// UserCardPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '@components/NetworkingListPage/Card';
import AddModal from '@components/NetworkingListPage/AddModal';
import { Check, Plus } from 'lucide-react';
import { Button } from '@components/ui/button';
import { QrCode, Scan } from 'lucide-react';
import QRDrawer from '@components/commons/QR/QRDrawer';
import { useGetBusinessCardQuery } from '@features/Networking/networkingApi';
import {
  useCreateConnectionMutation,
  useGetConnectionQuery,
} from '@features/UserCardPage/userCardApi';

const UserCardPage: React.FC = (): React.JSX.Element => {
  // 로그인한 사용자의 닉네임 (실제 프로젝트에서는 Auth/Redux/Context 등에서 가져옴)
  const loginUserNickname = 'test2Nickname';
  // URL 파라미터: 상대방 명함 ID
  const { businessCardId } = useParams<{ businessCardId: string }>();
  const navigate = useNavigate();

  // 모달 상태 및 모달 모드 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  // modalMode: 'confirm' → 아직 추가하지 않음
  //              'already' → 이미 추가된 상태
  const [modalMode, setModalMode] = useState<'confirm' | 'already'>('confirm');
  const [isChecked, setIsChecked] = useState(false);
  const [isQRDrawerOpen, setIsQRDrawerOpen] = useState(false);

  // 명함 상세 데이터 API 호출
  const { data: businessCard, isLoading, error } = useGetBusinessCardQuery(businessCardId!);
  // 온라인 명함 추가 Mutation
  const [createConnection] = useCreateConnectionMutation();
  // 이미 해당 명함이 추가되었는지 확인하는 Query (로그인 사용자와 명함 ID로)
  const { data: connectionData } = useGetConnectionQuery(
    {
      scanner_id: loginUserNickname,
      business_card_id: businessCard ? businessCard.business_card_id : '',
    },
    { skip: !businessCard },
  );

  // connectionData가 존재하면 이미 추가된 것으로 판단
  useEffect(() => {
    if (connectionData) {
      setIsChecked(true);
      setModalMode('already');
    } else {
      setIsChecked(false);
      setModalMode('confirm');
    }
  }, [connectionData]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">로딩 중...</div>
    );
  }
  if (error || !businessCard) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        명함 데이터를 불러오는데 실패했습니다.
      </div>
    );
  }

  // + 버튼 클릭 시, 아직 추가되지 않은 경우에만 모달 열기
  const handleButtonClick = () => {
    if (!isChecked) {
      setModalMode('confirm');
      setIsModalOpen(true);
    }
    // 이미 추가된 경우에는 아무 액션도 하지 않음.
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 온라인 명함 추가 로직 (아직 추가되지 않은 경우에만)
  const handleAddCard = async () => {
    try {
      await createConnection({
        owner_id: businessCard.nickname, // 상대방 명함 소유자 (닉네임)
        scanner_id: loginUserNickname, // 현재 로그인 사용자의 닉네임
        business_card_id: businessCard.business_card_id,
        exchange_method: 'online',
        status: 'active', // DB에는 항상 'active'로 저장
      }).unwrap();
      // 추가 후 바로 모달 닫기
      setIsModalOpen(false);
      // 상태 업데이트: 이미 추가된 상태로 표시
      setIsChecked(true);
      setModalMode('already');
    } catch (err) {
      console.error('명함 추가 중 오류:', err);
      alert('명함 추가에 실패했습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-between flex-grow">
      {/* 헤더 */}
      <header className="relative z-10 flex items-center p-4 bg-gray-800 text-lg font-semibold">
        <div className="absolute inset-0 flex justify-center items-center text-white">
          명함 상세보기
        </div>
        <div className="ml-auto flex space-x-2 z-20">
          <Button
            variant="outline"
            size="sm"
            className="text-black"
            onClick={() => navigate('/qr-scan')}
          >
            <Scan className="h-6 w-6 text-black" />
            QR 스캔
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-black"
            onClick={() => setIsQRDrawerOpen(true)}
          >
            <QrCode className="h-6 w-6" />
            QR 표시
          </Button>
        </div>
      </header>

      <div className="relative flex flex-col items-center justify-center flex-grow">
        <Card isGlossy={true} isMobile={false} isChat={false} businessCardData={businessCard} />

        {/* + 버튼: isChecked 상태에 따라 아이콘이 달라짐 */}
        <button
          onClick={handleButtonClick}
          className={`w-16 h-16 mt-10 flex items-center justify-center rounded-full bg-green-500 cursor-pointer shadow-lg transition-all duration-300 transform ${isChecked ? 'scale-110' : 'scale-100'}`}
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

      {/* AddModal: 모달은 confirm 모드일 때만 보여줌 */}
      <AddModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        mode={modalMode}
        onConfirm={modalMode === 'confirm' ? handleAddCard : undefined}
      />

      {/* QR Drawer */}
      <QRDrawer isOpen={isQRDrawerOpen} onClose={() => setIsQRDrawerOpen(false)} />
    </div>
  );
};

export default UserCardPage;
