import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@components/ui/tabs';
import { LayoutGrid, Menu } from 'lucide-react';
import { FilterValues, FullScreenFilter } from '@components/NetworkingListPage/FullScreenFilter';
import { filterOptions } from '@components/NetworkingListPage/FilterOptions';
import { Button } from '@components/commons/Button/Button';
import { Header } from '@components/commons/Header/Header';
import { Logo } from '@components/commons/Header/Logo';
import { IconButton } from '@components/commons/Button/IconButton';
import SearchIcon from '@components/NetworkingListPage/UI/SearchIcon';
import QrIcon from '@components/NetworkingListPage/UI/QrIcon';
import AlarmIcon from '@components/NetworkingListPage/UI/AlarmIcon';
import Section from '@components/BusinessCardBook/Section/Section';
import SettingRow from '@components/BusinessCardBook/Section/SettingRow';
import EmptyState from '@components/NetworkingListPage/SearchPopup/EmptyState';
import RecentSearchList from '@components/NetworkingListPage/SearchPopup/RecentSearchList';
import SearchHeader from '@components/NetworkingListPage/SearchPopup/SearchHeader';
import { useRecentSearches } from '@components/NetworkingListPage/SearchPopup/useRecentSearches';

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

const BusinessCardBookPage = (): React.JSX.Element => {
  const [activeTab, setActiveTab] = useState<'left' | 'right'>('left');
  const [isGridView, setIsGridView] = useState(true);
  const [filterPopupOpen, setFilterPopupOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isSearchMode, setIsSearchMode] = useState(false);

  const [filterValues, setFilterValues] = useState<FilterValues>({
    year: '',
    job: '',
    subJob: '',
    interests: [],
  });

  const { recentSearches, addSearch, removeSearch, clearSearches } = useRecentSearches();

  const filteredProfiles = profiles.filter((profile) => {
    const matchesSearch = profile.name.toLowerCase().includes(query.toLowerCase());
    const matchesJob = !filterValues.job || profile.role === filterValues.job;
    const matchesSub = !filterValues.subJob || profile.detail === filterValues.subJob;
    return matchesSearch && matchesJob && matchesSub;
  });

  const handleSearch = () => {
    if (query.trim()) {
      addSearch(query);
    }
  };

  const handleCloseSearch = () => {
    setQuery('');
    setIsSearchMode(false);
  };

  return (
    <div className="bg-black max-w-screen text-white">
      <Header className="px-[16px] bg-[var(--bg-default-black)] top-0 left-0 ">
        <Header.Left>
          <Logo />
          <span>Networking</span>
        </Header.Left>
        <Header.Right>
          <IconButton icon={<QrIcon />} onClick={() => {}} />
          <IconButton icon={<SearchIcon />} onClick={() => {}} />
          <IconButton icon={<AlarmIcon />} onClick={() => {}} />
        </Header.Right>
      </Header>

      <Tabs defaultValue="left" onValueChange={(val) => setActiveTab(val as 'left' | 'right')}>
        <TabsList className="w-full bg-black text-white flex justify-around py-3">
          <TabsTrigger value="left" className="data-[state=active]:underline">
            내 명함을 추가한 사람
          </TabsTrigger>
          <TabsTrigger value="right" className="data-[state=active]:underline">
            내가 추가한 사람
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <div className="px-4">
            <SearchHeader
              query={query}
              onChange={(val) => {
                if (!isSearchMode) setIsSearchMode(true);
                setQuery(val);
              }}
              onSearch={handleSearch}
              onReset={() => setQuery('')}
              onClose={handleCloseSearch}
            />
          </div>

          <div className="mt-[30px] mb-6">
            <Section title="카테고리">
              <SettingRow
                label="{명함이름}을 공유받은 사람"
                imageUrl="/path/to/image1.jpg"
                nameCount="Eight님 외 57명"
              />
              <SettingRow
                label="{명함이름} 명함을 공유받은 사람"
                imageUrl="/path/to/image1.jpg"
                nameCount="Eight님 외 57명"
              />
              <SettingRow
                label="{명함이름} 명함을 공유받은 사람"
                imageUrl="/path/to/image1.jpg"
                nameCount="Eight님 외 57명"
              />
            </Section>
          </div>

          {isSearchMode ? (
            query === '' ? (
              <div className="px-4 min-h-[40vh]">
                <RecentSearchList
                  items={recentSearches}
                  onSelect={(val) => setQuery(val)}
                  onRemove={removeSearch}
                  onClear={clearSearches}
                  jobKeyword={query}
                  hideJobSearch
                />
              </div>
            ) : filteredProfiles.length > 0 ? (
              <>
                <div className="px-4 py-2 text-sm text-[var(--text-secondary)]">
                  ‘{query}’로 검색된 명함 {filteredProfiles.length}건
                </div>
                <div
                  className={`grid ${isGridView ? 'grid-cols-2' : 'grid-cols-1'} gap-4 px-4 pb-24`}
                >
                  {filteredProfiles.map((profile) => (
                    <div
                      key={profile.id}
                      className="bg-gray-800 p-4 rounded-xl flex flex-col gap-1"
                    >
                      <p className="text-sm font-bold text-blue-300">{profile.role}</p>
                      <p className="text-sm">{profile.detail}</p>
                      <p className="font-semibold text-white">{profile.name}</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex  justify-center items-center min-h-[40vh]">
                <EmptyState />
              </div>
            )
          ) : (
            <>
              <div className="flex items-center justify-between px-4 py-3">
                <div className="text-lg font-semibold">교환한 명함 257</div>
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    className={`w-8 h-8 rounded-md ${!isGridView ? 'bg-white text-black' : 'text-white/50'}`}
                    onClick={() => setIsGridView(false)}
                  >
                    <Menu className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    className={`w-8 h-8 rounded-md ${isGridView ? 'bg-white text-black' : 'text-white/50'}`}
                    onClick={() => setIsGridView(true)}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div
                className={`grid ${isGridView ? 'grid-cols-2' : 'grid-cols-1'} gap-4 px-4 pb-24`}
              >
                {filteredProfiles.map((profile) => (
                  <div key={profile.id} className="bg-gray-800 p-4 rounded-xl flex flex-col gap-1">
                    <p className="text-sm font-bold text-blue-300">{profile.role}</p>
                    <p className="text-sm">{profile.detail}</p>
                    <p className="font-semibold text-white">{profile.name}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>

      {filterPopupOpen && (
        <FullScreenFilter
          values={filterValues}
          onChange={setFilterValues}
          onApply={(vals) => {
            setFilterValues(vals);
            setFilterPopupOpen(false);
          }}
          onClose={() => setFilterPopupOpen(false)}
          options={filterOptions}
        />
      )}

      <div className="fixed bottom-0 left-0 w-full py-3 bg-gray-900 text-center">네비게이션 바</div>
    </div>
  );
};

export default BusinessCardBookPage;
