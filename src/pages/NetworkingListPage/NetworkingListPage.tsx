import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FullScreenPopup from '@components/NetworkingListPage/FullScreenPopup';
import BusinessCardConsentSheet from '@components/NetworkingListPage/BusinessCardConsentSheet';
import DropDown from '@components/ui/dropDown';
import List from '@components/NetworkingListPage/List'; // 🔹 리스트 컴포넌트 분리
import {
  useCheckUserBusinessCardVisibilityQuery,
  useGetNetworkingListQuery,
  useUpdateBusinessCardVisibilityMutation,
} from '@features/Networking/networkingApi';
import { roles, detailsMap } from '@constants/userRole';

const NetworkingList: React.FC = (): React.JSX.Element => {
  const nickname = 'test2Nickname'; // 테스트용 닉네임
  const location = useLocation();
  // UI 상태 관리
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedDetail, setSelectedDetail] = useState('All');
  const [showPopup, setShowPopup] = useState(false);
  const [showConsentSheet, setShowConsentSheet] = useState(false);

  // 네트워킹 리스트 가져오기
  const { data: networkingList, error, refetch } = useGetNetworkingListQuery(nickname);
  console.log('네트워킹 리스트:', networkingList);
  // 명함 공개 여부 확인
  const { data: userBusinessCard, isLoading } = useCheckUserBusinessCardVisibilityQuery(nickname);
  //  명함 공개 여부 업데이트
  const [updateBusinessCardVisibility] = useUpdateBusinessCardVisibilityMutation();

  // 상세명함페이지에서 친구 추가 후 리스트 쿼리 재요청
  useEffect(() => {
    refetch();
  }, [location, refetch]);

  // 최초 접근 시 풀 팝업 로직 처리
  useEffect(() => {
    if (!localStorage.getItem('seenNetworkingPopup')) {
      setShowPopup(true);
    }
  }, []);

  // 명함 공개 여부 확인 후 바텀 시트 노출
  useEffect(() => {
    if (!isLoading && userBusinessCard?.is_primary && !userBusinessCard.is_public) {
      setShowConsentSheet(true);
    }
  }, [userBusinessCard, isLoading]);

  const handlePopupXClose = () => {
    setShowPopup(false);
  };

  const handleDontShowPopup = () => {
    setShowPopup(false);
    localStorage.setItem('seenNetworkingPopup', 'true');
  };

  // 명함 공개 처리
  const handleConsentAgree = async () => {
    if (userBusinessCard?.is_primary) {
      try {
        await updateBusinessCardVisibility({
          business_card_id: userBusinessCard.business_card_id,
          is_public: true, // 공개 처리
        }).unwrap();

        setShowConsentSheet(false);
      } catch (error) {
        console.error('명함 공개 실패:', error);
      }
    }
  };

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setSelectedDetail('All'); // 역할 변경 시 세부 분야 초기화
  };

  const availableDetails =
    selectedRole === 'All' ? ['All'] : detailsMap[selectedRole as keyof typeof detailsMap];

  // ✅ 필터링된 네트워킹 리스트 반환
  const getFilteredNetworkingList = () =>
    networkingList?.filter((profile) => {
      const roleMatch = selectedRole === 'All' || profile.fields_of_expertise === selectedRole;
      const detailMatch = selectedDetail === 'All' || profile.sub_expertise === selectedDetail;
      return roleMatch && detailMatch;
    });
  if (error) {
    return <div>네트워킹 리스트를 불러오는 중 오류가 발생했습니다.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="p-4 bg-gray-800 text-center text-lg font-semibold">네트워킹 리스트</header>

      <div className="flex gap-2 p-4">
        <DropDown
          options={roles}
          selected={selectedRole}
          onSelect={handleRoleSelect}
          placeholder="분야 선택"
          className="w-48 bg-blue-700"
          menuClassName="bg-blue-800 text-white shadow-lg"
        />
        <DropDown
          options={availableDetails}
          selected={selectedDetail}
          onSelect={setSelectedDetail}
          placeholder="세부 분야 선택"
          className="w-48 bg-green-700"
          menuClassName="bg-green-800 text-white shadow-lg"
          disabled={selectedRole === 'All'}
        />
      </div>

      {/* 🔹 필터링된 네트워킹 리스트 전달 */}
      <List networkingList={getFilteredNetworkingList()} />

      <div className="fixed bottom-0 left-0 w-full bg-gray-700 py-3 text-center text-white">
        네비게이션 바
      </div>

      <FullScreenPopup
        open={showPopup}
        onClose={handlePopupXClose}
        onDontShowAgain={handleDontShowPopup}
      />

      {!showPopup && (
        <BusinessCardConsentSheet
          open={showConsentSheet}
          onClose={() => setShowConsentSheet(false)}
          onAgree={handleConsentAgree}
        />
      )}
    </div>
  );
};

export default NetworkingList;
