import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@components/ui/tabs';
import DropDown from '@components/ui/dropDown';
import { Button } from '@components/ui/button';
import SearchBar from '@components/BusinessCardBook/SearchBar';

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

const BusinessCardBookPage = (): React.JSX.Element => {
  const [tab, setTab] = useState<'left' | 'right'>('left');

  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedDetail, setSelectedDetail] = useState('All');

  //검색 상태
  const [searchTerm, setSearchTerm] = useState('');

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setSelectedDetail('All'); // 역할 선택 시 세부 분야 초기화
  };

  const availableDetails =
    selectedRole === 'All' ? ['All'] : detailsMap[selectedRole as keyof typeof detailsMap];

  // 필터링된 데이터 (역할+세부 분야+검색어)
  const filteredProfiles = profiles.filter((profile) => {
    const roleMatch = selectedRole === 'All' || profile.role === selectedRole;
    const detailMatch = selectedDetail === 'All' || profile.detail === selectedDetail;
    const searchMatch = profile.name.toLowerCase().includes(searchTerm.toLowerCase()); // 검색 기능 적용

    return roleMatch && detailMatch && searchMatch;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="p-4 bg-gray-800 text-center text-lg font-semibold">명함첩</header>

      <Tabs defaultValue="left" onValueChange={(val) => setTab(val as 'left' | 'right')}>
        <TabsList className="w-full bg-gray-800 flex justify-center">
          <TabsTrigger value="left">보관된 명함</TabsTrigger>
          <TabsTrigger value="right">신청받은 명함</TabsTrigger>
        </TabsList>

        <TabsContent value={tab}>
          <div className="p-4">
            {/* 검색 필드 */}
            <div className="flex items-center gap-2 mb-4">
              <SearchBar value={searchTerm} onChange={setSearchTerm} />
              <Button>정렬</Button>

              {/* 필터 DropDown */}
              <div className="flex gap-2 mb-4">
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
            </div>

            {/* 필터링된 명함 데이터 표시 */}
            <div>
              {filteredProfiles.length > 0 ? (
                filteredProfiles.map((profile) => (
                  <div
                    key={profile.id}
                    className="flex items-center gap-4 bg-gray-800 p-4 rounded-lg mb-2"
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
                ))
              ) : (
                <p className="text-gray-400">조건에 맞는 명함이 없습니다.</p>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
      <div className="fixed bottom-0 left-0 w-full bg-gray-700 py-3 text-center text-white">
        네비게이션 바
      </div>
    </div>
  );
};

export default BusinessCardBookPage;
