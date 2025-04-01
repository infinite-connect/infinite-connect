import React, { useState, useEffect } from 'react';
import TabList from './TabList';
import InfiniteScroll from 'react-infinite-scroll-component';
import UserListCard from './UserListCard';
import { useGetUserAllPrimaryBusinessListQuery } from '@features/Networking/networkingApi';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { AllPrimaryBusinessCardList } from '@features/Networking/networkingApi';
import { FullScreenFilter } from './FullScreenFilter';
import { filterOptions } from './FilterOptions';
import { FilterValues } from './FullScreenFilter';
import { applyAllFilters } from '@utils/ApplyFiter';

const PAGE_SIZE = 5; // 한 번에 로드할 개수

const UserFilterSection: React.FC = () => {
  const nickname = useSelector((state: RootState) => state.user.userInfo?.nickname) || '';
  const [activeTab, setActiveTab] = useState('ALL');
  const [filterPopupOpen, setFilterPopupOpen] = useState(false);
  // 5) 필터 값 상태
  const [filterValues, setFilterValues] = useState<FilterValues>({
    year: '',
    job: '',
    subJob: '',
    interests: [],
  });

  console.log(filterOptions);
  // 무한 스크롤용 상태
  const [displayedUsers, setDisplayedUsers] = useState<AllPrimaryBusinessCardList[]>([]);
  const [hasMore, setHasMore] = useState(true);

  // 리스트 가져오기
  const { data, isLoading } = useGetUserAllPrimaryBusinessListQuery(nickname);
  console.log('유저데이터', data);

  // 필터 & 탭 동시 적용
  useEffect(() => {
    if (!data) return;
    const filtered = applyAllFilters(data, activeTab, filterValues);
    setDisplayedUsers(filtered.slice(0, PAGE_SIZE));
    setHasMore(filtered.length > PAGE_SIZE);
  }, [data, activeTab, filterValues]);

  // 무한 스크롤에서 다음 데이터 로드
  const fetchMoreData = () => {
    if (!data) return;
    const filtered = applyAllFilters(data, activeTab, filterValues);

    const currentLength = displayedUsers.length;
    const nextLength = currentLength + PAGE_SIZE;

    if (nextLength >= filtered.length) {
      setDisplayedUsers(filtered);
      setHasMore(false);
    } else {
      setDisplayedUsers(filtered.slice(0, nextLength));
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  // 팝업 열기 함수
  const handleFilterClick = () => {
    setFilterPopupOpen(true);
  };

  // 팝업 닫기 함수
  const handleClosePopup = () => {
    setFilterPopupOpen(false);
  };

  // 필터 적용함수
  const handleApplyFilters = (vals: FilterValues) => {
    setFilterValues(vals); // 새 필터 값 저장

    // 직무(job)가 선택되었다면, 탭도 해당 직무(대문자)로 업데이트
    if (vals.job && vals.job !== 'ALL') {
      // 탭 리스트는 ['ALL', 'DEVELOPMENT', ...] 형식이므로 대문자로 변환
      setActiveTab(vals.job.toUpperCase());
    } else {
      setActiveTab('ALL');
    }

    setFilterPopupOpen(false);
  };

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="sticky top-14 z-11 bg-[var(--bg-default-black)]">
        <TabList
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onFilterClick={handleFilterClick}
        />
      </div>

      {/* 실제 카드 리스트 (무한 스크롤) */}
      <div className="px-[16px] flex flex-col py-[16px]">
        <h2 className="text-[18px] font-medium  mb-[20px]">무한한 기회, 가벼운 시작</h2>
        <InfiniteScroll
          dataLength={displayedUsers.length} // 현재까지 보여준 아이템 수
          next={fetchMoreData} // 스크롤 끝에 도달 시 호출할 함수
          hasMore={hasMore} // 더 로드할 데이터가 있는지 여부
          loader={<h4>Loading...</h4>}
          endMessage={<p className="text-gray-400">No more data</p>}
          height={600}
        >
          {/** 이미지부분 하드코딩 되어 있음  */}
          {displayedUsers.map((user) => (
            <div key={user.business_card_id} className="mb-4">
              <UserListCard cardId={user.business_card_id} nickName={user.nickname} />
            </div>
          ))}
        </InfiniteScroll>
      </div>

      {/* 필터 풀팝업 */}
      {filterPopupOpen && (
        <FullScreenFilter
          values={filterValues}
          onChange={setFilterValues}
          onApply={handleApplyFilters}
          onClose={handleClosePopup}
          options={filterOptions}
        />
      )}
    </div>
  );
};

export default UserFilterSection;
