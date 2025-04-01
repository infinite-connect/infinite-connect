import React, { useMemo, useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@components/ui/tabs';
import { LayoutGrid, Menu, SlidersHorizontal } from 'lucide-react';
import { FilterValues, FullScreenFilter } from '@components/NetworkingListPage/FullScreenFilter';
import { filterOptions } from '@components/NetworkingListPage/FilterOptions';
import { Button } from '@components/commons/Button/Button';
import { Header } from '@components/commons/Header/Header';
import { Logo } from '@components/commons/Header/Logo';
import { IconButton } from '@components/commons/Button/IconButton';
import QrIcon from '@components/NetworkingListPage/UI/QrIcon';
import AlarmIcon from '@components/NetworkingListPage/UI/AlarmIcon';
import Section from '@components/BusinessCardBook/Section/Section';
import SettingRow from '@components/BusinessCardBook/Section/SettingRow';
import EmptyState from '@components/NetworkingListPage/SearchPopup/EmptyState';
import RecentSearchList from '@components/NetworkingListPage/SearchPopup/RecentSearchList';
import SearchHeader from '@components/NetworkingListPage/SearchPopup/SearchHeader';
import { useRecentSearches } from '@components/NetworkingListPage/SearchPopup/useRecentSearches';
import UserListCard from '@components/NetworkingListPage/UserListCard';
import GridCardBox from '@components/BusinessCardBook/GridCardBox';
import SharedCard from '@components/BusinessCardBook/SharedCard';
import BottomNavbar from '@components/commons/BottomNavbar/BottomNavbar';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { useGetUserCardsViewCountsQuery } from '@features/Networking/networkingApi';
import {
  useGetFollowingViewQuery,
  useGetFollowerViewQuery,
  DetailedCard,
} from '@features/BusinessCardBookPage/BusinessCardBookApi';
import QRScanDisplayModal from '@components/commons/QR/QRScanDisplayModal';
import SlideDrawer from '@components/Alarm/SlideDrawer';
import AlarmContents from '@components/Alarm/AlarmContents';

const BusinessCardBookPage = (): React.JSX.Element => {
  const [activeTab, setActiveTab] = useState<'left' | 'right'>('left');
  const [isGridView, setIsGridView] = useState(true);
  const [filterPopupOpen, setFilterPopupOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isAlarmDrawerOpen, setIsAlarmDrawerOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [filterValues, setFilterValues] = useState<FilterValues>({
    year: '',
    job: '',
    subJob: '',
    interests: [],
  });

  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const primaryCard = useSelector((state: RootState) => state.userBusinessCard.primaryCard);

  const { data: userCards } = useGetUserCardsViewCountsQuery(userInfo?.nickname || '');
  console.log('로그인한 유저의 카드개수 확인:', userCards);

  // 대표 명함을 맨 위로 정렬
  const orderedCards = useMemo(() => {
    if (!userCards) return [];
    if (!primaryCard) return userCards;
    return [...userCards].sort((a, b) => {
      if (a.business_card_id === primaryCard.business_card_id) return -1;
      if (b.business_card_id === primaryCard.business_card_id) return 1;
      return 0;
    });
  }, [userCards, primaryCard]);

  // “내 명함을 추가한 사람” (followerView), “내가 추가한 사람” (followingView)
  const followerViewQuery = useGetFollowerViewQuery({ myNickname: userInfo?.nickname || '' });
  const followingViewQuery = useGetFollowingViewQuery({ myNickname: userInfo?.nickname || '' });

  // activeTab에 따라 상세 데이터를 가져옴
  const detailedCards = useMemo<DetailedCard[]>(() => {
    return activeTab === 'left'
      ? followerViewQuery.data?.cards || []
      : followingViewQuery.data?.cards || [];
  }, [activeTab, followerViewQuery.data, followingViewQuery.data]);

  // 필터 + 검색어 적용 (각 필드를 빈 문자열로 기본값 설정)
  const filteredCards = useMemo<DetailedCard[]>(() => {
    const lowerSearch = (searchKeyword || '').toLowerCase();
    return detailedCards.filter((card) => {
      const nickname = (card.nickname || '').toLowerCase();
      const expertise = (card.fields_of_expertise || '').toLowerCase();
      const subExpertise = (card.sub_expertise || '').toLowerCase();
      const businessName = (card.business_name || '').toLowerCase();
      const name = (card.name || '').toLowerCase();

      const matchesSearch =
        !searchKeyword ||
        nickname.includes(lowerSearch) ||
        expertise.includes(lowerSearch) ||
        subExpertise.includes(lowerSearch) ||
        businessName.includes(lowerSearch) ||
        name.includes(lowerSearch);
      const matchesJob = filterValues.job
        ? expertise === (filterValues.job || '').toLowerCase()
        : true;
      const matchesSubJob = filterValues.subJob
        ? subExpertise === (filterValues.subJob || '').toLowerCase()
        : true;
      return matchesSearch && matchesJob && matchesSubJob;
    });
  }, [detailedCards, searchKeyword, filterValues]);

  // 검색 기록
  const { recentSearches, addSearch, removeSearch, clearSearches } = useRecentSearches();

  const handleSearch = () => {
    if (query.trim()) {
      setSearchKeyword(query);
      addSearch(query);
    }
  };

  const handleCloseSearch = () => {
    setQuery('');
    setSearchKeyword('');
    setIsSearchMode(false);
  };

  // 공통 카드 렌더링 함수
  const renderCardList = (cards: DetailedCard[]) => {
    if (cards.length === 0) {
      // 카드가 없을 때 “결과가 없습니다” 표시
      return (
        <div className="flex flex-col items-center justify-center min-h-[40vh] text-sm text-gray-400">
          결과가 없습니다
        </div>
      );
    }
    return (
      <div className={`grid ${isGridView ? 'grid-cols-2' : 'grid-cols-1'} gap-4 px-4 pb-24`}>
        {cards.map((card) =>
          isGridView ? (
            <GridCardBox key={card.cardId} cardId={card.cardId} nickName={card.nickname} />
          ) : (
            <UserListCard key={card.cardId} cardId={card.cardId} nickName={card.nickname} />
          ),
        )}
      </div>
    );
  };

  return (
    <div className="bg-[var(--bg-default-black)] max-w-screen min-h-screen text-white">
      {/* 상단 헤더 */}
      {!selectedCard && (
        <Header className="px-[16px] bg-[var(--bg-default-black)] top-0 left-0 ">
          <Header.Left>
            <Logo />
            <span>명함첩</span>
          </Header.Left>
          <Header.Right>
            <IconButton icon={<QrIcon />} onClick={() => setIsQRModalOpen(true)} />
            <IconButton icon={<AlarmIcon />} onClick={() => setIsAlarmDrawerOpen(true)} />
          </Header.Right>
        </Header>
      )}

      {/* SharedCard (명함 클릭 시 상세) */}
      {selectedCard ? (
        <SharedCard selectCardId={selectedCard} onBack={() => setSelectedCard(null)} />
      ) : (
        <Tabs defaultValue="left" onValueChange={(val) => setActiveTab(val as 'left' | 'right')}>
          <TabsList className="w-full flex justify-around mt-[30px]">
            <TabsTrigger value="left">내 명함을 추가한 사람</TabsTrigger>
            <TabsTrigger value="right">내가 추가한 사람</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            {/* 검색 입력 */}
            <div className="px-4">
              <SearchHeader
                query={query}
                showChevron={isSearchMode}
                onChange={(val) => {
                  if (!isSearchMode) setIsSearchMode(true);
                  setQuery(val);
                }}
                onSearch={handleSearch}
                onReset={() => {
                  setQuery('');
                  setSearchKeyword('');
                }}
                onClose={handleCloseSearch}
              />
            </div>

            {/* 카테고리(내 명함 목록) */}
            <div className="mt-[30px] mb-6">
              <Section title="카테고리">
                {orderedCards.length > 0 ? (
                  orderedCards.map((card) => (
                    <SettingRow
                      key={card.business_card_id}
                      label={`${card.card_name}`}
                      networkType={card.card_type}
                      loginUser={userInfo?.nickname || ''}
                      loginUserCardId={card.business_card_id}
                      onClick={() => setSelectedCard(card.business_card_id)}
                    />
                  ))
                ) : (
                  <div className="p-4 text-sm text-gray-400">명함 정보가 없습니다.</div>
                )}
              </Section>
            </div>

            {/* 검색 모드 / 일반 모드 */}
            {isSearchMode ? (
              // 검색 모드
              searchKeyword === '' ? (
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
              ) : filteredCards.length > 0 ? (
                <>
                  <div className="px-4 py-2 text-sm text-[var(--text-secondary)]">
                    ‘{searchKeyword}’로 검색된 명함 {filteredCards.length}건
                  </div>
                  {renderCardList(filteredCards)}
                </>
              ) : (
                // 검색 결과가 없는 경우
                <div className="flex justify-center items-center min-h-[40vh]">
                  <EmptyState />
                </div>
              )
            ) : (
              // 일반 모드
              <>
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="text-lg font-semibold">교환한 명함 {filteredCards.length}</div>
                  <div className="flex items-center gap-2">
                    <Button
                      className="icon w-8 h-8 bg-transparent text-[var(--fill-white)] hover:bg-[var(--icon-hover)]"
                      onClick={() => setFilterPopupOpen(true)}
                    >
                      <SlidersHorizontal />
                    </Button>
                    <div className="flex items-center gap-2 border border-[var(--fill-secondary)] p-[5px] rounded-md">
                      <Button
                        size="icon"
                        className={`w-8 h-8 p-1 rounded-md ${
                          !isGridView
                            ? 'bg-[var(--fill-secondary)] text-[var(--fill-white)] hover:bg-[var(--icon-hover)]'
                            : 'bg-transparent text-[var(--text-tertiary)] hover:bg-[var(--icon-hover)]'
                        }`}
                        onClick={() => setIsGridView(false)}
                      >
                        <Menu className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        className={`w-8 h-8 p-1 rounded-md ${
                          isGridView
                            ? 'bg-[var(--fill-secondary)] text-[var(--fill-white)] hover:bg-[var(--icon-hover)]'
                            : 'bg-transparent text-[var(--text-tertiary)] hover:bg-[var(--icon-hover)]'
                        }`}
                        onClick={() => setIsGridView(true)}
                      >
                        <LayoutGrid className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                {renderCardList(filteredCards)}
              </>
            )}
          </TabsContent>
        </Tabs>
      )}

      {/* 풀화면 필터 팝업 */}
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
      <QRScanDisplayModal isOpen={isQRModalOpen} onClose={() => setIsQRModalOpen(false)} />
      <SlideDrawer isOpen={isAlarmDrawerOpen} onClose={() => setIsAlarmDrawerOpen(false)}>
        <AlarmContents />
      </SlideDrawer>

      <BottomNavbar />
    </div>
  );
};

export default BusinessCardBookPage;
