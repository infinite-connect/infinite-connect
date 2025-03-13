import React, { useEffect, useState } from 'react';
import FullScreenPopup from '@components/NetworkingListPage/FullScreenPopup';
import BusinessCardConsentSheet from '@components/NetworkingListPage/BusinessCardConsentSheet';
import { useNavigate } from 'react-router-dom';
import {
  mockGetUserCheckPrimaryPublicBusinessCards,
  mockUpdateBusinessCardVisibility,
} from '@components/NetworkingListPage/MockApi';
import DropDown from '@components/ui/dropDown';

// 필터링 된 데이터가 이렇게 왔다고 가정...
const profiles = [
  { id: '1', userId: '101', name: '유현상', role: 'Development', detail: '프론트엔드' },
  { id: '2', userId: '102', name: '이종혁', role: 'Development', detail: '백엔드' },
  { id: '3', userId: '103', name: '조혜주', role: 'Design', detail: 'UI/UX 디자인' },
  { id: '4', userId: '104', name: '김해담', role: 'Design', detail: '그래픽 디자인' },
  { id: '5', userId: '105', name: '최*서', role: 'PM / 기획', detail: '프로덕트 매니저' },
  { id: '6', userId: '106', name: '유*민', role: 'PM / 기획', detail: '게임 기획' },
  { id: '7', userId: '107', name: '배*진', role: 'Data & AI', detail: '데이터 사이언스' },
  { id: '8', userId: '108', name: '조*영', role: 'Data & AI', detail: 'AI 엔지니어' },
  { id: '9', userId: '109', name: '배*진', role: 'Operation & Others', detail: 'IT 컨설팅' },
  { id: '10', userId: '110', name: '조*영', role: 'Operation & Others', detail: '기술 지원' },
];

const roles = ['All', 'Development', 'Design', 'PM / 기획', 'Data & AI', 'Operation & Others'];

const detailsMap = {
  Development: [
    'All',
    '프론트엔드',
    '백엔드',
    '풀스택',
    '모바일',
    '데브옵스',
    '데이터 엔지니어링',
    '임베디드',
    'QA/ 테스트 엔지니어',
    '게임 개발',
    '블록체인 개발',
  ],
  Design: [
    'All',
    'UI/UX 디자인',
    '제품 디자인',
    '그래픽 디자인',
    '모션 그래픽',
    '브랜딩 디자인',
    '일러스트레이션',
    '3D 디자인',
    '게임 아트',
  ],
  'PM / 기획': [
    'All',
    '프로덕트 매니저',
    '프로젝트 매니저',
    '서비스 기획',
    '게임 기획',
    '데이터 분석',
    '마케팅 기획',
    'U/UX 리서치',
  ],
  'Data & AI': [
    'All',
    '데이터 사이언스',
    'AI 엔지니어링',
    '머신러닝 엔지니어',
    'BI/ 데이터 애널리스트',
    '빅데이터 엔지니어링',
  ],
  'Operation & Others': [
    'All',
    'IT 컨설팅',
    '기술 지원',
    '보안',
    'DBA',
    '네트워크 엔지니어',
    '클라우드 엔지니어',
  ],
};

const NetworkingList: React.FC = (): React.JSX.Element => {
  const [userId] = useState('101'); // 현재 로그인한 사용자 ID (목데이터)
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedDetail, setSelectedDetail] = useState('All');

  const [showPopup, setShowPopup] = useState(false);
  const [showConsentSheet, setShowConsentSheet] = useState(false);
  const [, setIsPublic] = useState<boolean | null>(null);

  const filteredProfiles = profiles.filter((profile) => {
    const roleMatch = selectedRole === 'All' || profile.role === selectedRole;
    const detailMatch = selectedDetail === 'All' || profile.detail === selectedDetail;

    return roleMatch && detailMatch;
  });

  useEffect(() => {
    console.log('선택된 분야:', selectedRole);
    console.log('선택된 세부 분야:', selectedDetail);
  }, [selectedRole, selectedDetail]);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('seenNetworkingPopup');

    if (!hasSeenPopup) {
      setShowPopup(true); // 풀팝업 먼저 띄우기
    } else {
      fetchUserData();
    }
  }, []);

  useEffect(() => {
    if (!showPopup) {
      fetchUserData(); // 풀팝업이 닫히고 나서 실행
    }
  }, [showPopup]);

  const fetchUserData = async () => {
    const data = await mockGetUserCheckPrimaryPublicBusinessCards(userId);
    console.log('현재 명함 공개 여부:', data.is_public);
    setIsPublic(data.is_public);

    if (!data.is_public) {
      setShowConsentSheet(true);
    }
  };

  // X 버튼으로 닫을 때: 단순히 팝업을 닫음 (다음에 다시 뜰 수 있음)
  const handlePopupXClose = () => {
    setShowPopup(false);
  };

  // "다시 보지 않기" 버튼 클릭 시: 팝업 닫고 로컬스토리지에 기록
  const handleDontShowPopup = () => {
    setShowPopup(false);
    localStorage.setItem('seenNetworkingPopup', 'true');
  };

  const handleConsentAgree = async () => {
    const result = await mockUpdateBusinessCardVisibility(userId);
    if (result.is_public) {
      setIsPublic(true);
      setShowConsentSheet(false);
    }
  };

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setSelectedDetail('All'); // 역할 선택 시 세부 분야 초기화
  };

  const availableDetails =
    selectedRole === 'All' ? ['All'] : detailsMap[selectedRole as keyof typeof detailsMap];

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
          disabled={selectedRole === 'All'} // 역할 선택 전에는 비활성화
        />
      </div>

      <div className="px-4 mt-4">
        {filteredProfiles.map((profile) => (
          <div
            key={profile.id}
            className="flex items-center gap-4 bg-gray-800 p-4 rounded-lg mb-2 cursor-pointer"
            onClick={() => navigate(`/${profile.userId}/${profile.id}`)}
          >
            <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-sm">
              profile
            </div>
            <div>
              <p className="font-semibold">{profile.name}</p>
              <p className="text-gray-400">
                <span className="font-bold">{profile.role}</span> | {profile.detail}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-gray-700 py-3 text-center text-white">
        네비게이션 바
      </div>

      <FullScreenPopup
        open={showPopup}
        onClose={handlePopupXClose} // X 버튼용
        onDontShowAgain={handleDontShowPopup} // "다시 보지 않기"용
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
