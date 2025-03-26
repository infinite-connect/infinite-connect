import React, { useState, useEffect } from 'react';
import TabList from './TabList';
import InfiniteScroll from 'react-infinite-scroll-component';
import UserListCard from './UserListCard';

const ALL_USERS = [
  {
    id: 1,
    imageUrl: 'https://loremflickr.com/400/225',
    mainLabel: 'DEVELOPMENT',
    subLabel: 'Frontend | Engineering팀',
    name: 'Anna',
    badge: '인기있는',
  },
  {
    id: 2,
    imageUrl: 'https://loremflickr.com/400/225',
    mainLabel: 'DESIGN',
    subLabel: 'UI/UX | Creative팀',
    name: 'Chris',
  },
  {
    id: 3,
    imageUrl: 'https://loremflickr.com/400/225',
    mainLabel: 'INFRASTRUCTURE',
    subLabel: 'DevOps | Engineering팀',
    name: 'Daisy',
  },
  {
    id: 4,
    imageUrl: 'https://loremflickr.com/400/225',
    mainLabel: 'DEVELOPMENT',
    subLabel: 'Frontend | Engineering팀',
    name: 'Anna',
    badge: '인기있는',
  },
  {
    id: 5,
    imageUrl: 'https://loremflickr.com/400/225',
    mainLabel: 'DESIGN',
    subLabel: 'UI/UX | Creative팀',
    name: 'Chris',
  },
  {
    id: 6,
    imageUrl: 'https://loremflickr.com/400/225',
    mainLabel: 'INFRASTRUCTURE',
    subLabel: 'DevOps | Engineering팀',
    name: 'Daisy',
  },
  {
    id: 7,
    imageUrl: 'https://loremflickr.com/400/225',
    mainLabel: 'DEVELOPMENT',
    subLabel: 'Frontend | Engineering팀',
    name: 'Anna',
    badge: '인기있는',
  },
  {
    id: 8,
    imageUrl: 'https://loremflickr.com/400/225',
    mainLabel: 'DESIGN',
    subLabel: 'UI/UX | Creative팀',
    name: 'Chris',
  },
  {
    id: 9,
    imageUrl: 'https://loremflickr.com/400/225',
    mainLabel: 'INFRASTRUCTURE',
    subLabel: 'DevOps | Engineering팀',
    name: 'Daisy',
  },
  {
    id: 10,
    imageUrl: 'https://loremflickr.com/400/225',
    mainLabel: 'DEVELOPMENT',
    subLabel: 'Frontend | Engineering팀',
    name: 'Anna',
    badge: '인기있는',
  },
  {
    id: 11,
    imageUrl: 'https://loremflickr.com/400/225',
    mainLabel: 'DESIGN',
    subLabel: 'UI/UX | Creative팀',
    name: 'Chris',
  },
  {
    id: 12,
    imageUrl: 'https://loremflickr.com/400/225',
    mainLabel: 'INFRASTRUCTURE',
    subLabel: 'DevOps | Engineering팀',
    name: 'Daisy',
  },
  // ...데이터 더 추가 가능
];

// 탭에 따른 필터 로직
function filterUsers(users: typeof ALL_USERS, tab: string) {
  if (tab === 'ALL') return users;
  return users.filter((item) => item.mainLabel === tab);
}

const PAGE_SIZE = 5; // 한 번에 로드할 개수

const UserFilterSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ALL');
  const [filterPopupOpen, setFilterPopupOpen] = useState(false);

  // 무한 스크롤용 상태
  const [displayedUsers, setDisplayedUsers] = useState<typeof ALL_USERS>([]);
  const [hasMore, setHasMore] = useState(true);

  // 탭이 바뀔 때마다 리스트 초기화
  useEffect(() => {
    const newFiltered = filterUsers(ALL_USERS, activeTab);
    // 처음 PAGE_SIZE만큼만 보여주고
    setDisplayedUsers(newFiltered.slice(0, PAGE_SIZE));
    // 더 불러올 데이터가 있으면 hasMore = true
    setHasMore(newFiltered.length > PAGE_SIZE);
  }, [activeTab]);

  // 무한 스크롤: 다음 데이터 로드
  const fetchMoreData = () => {
    const newFiltered = filterUsers(ALL_USERS, activeTab);
    const currentLength = displayedUsers.length;
    const nextLength = currentLength + PAGE_SIZE;

    if (nextLength >= newFiltered.length) {
      // 더 이상 불러올 게 없으면 전부 보여주고 종료
      setDisplayedUsers(newFiltered);
      setHasMore(false);
    } else {
      // 일부만 추가로 보여주기
      setDisplayedUsers(newFiltered.slice(0, nextLength));
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleFilterClick = () => {
    setFilterPopupOpen(true);
  };

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
        <h2 className="text-[18px] font-[NanumGothic] font-medium  mb-[20px]">
          무한한 기회, 가벼운 시작
        </h2>
        <InfiniteScroll
          dataLength={displayedUsers.length} // 현재까지 보여준 아이템 수
          next={fetchMoreData} // 스크롤 끝에 도달 시 호출할 함수
          hasMore={hasMore} // 더 로드할 데이터가 있는지 여부
          loader={<h4>Loading...</h4>}
          endMessage={<p className="text-gray-400">No more data</p>}
          height={700}
        >
          {displayedUsers.map((user) => (
            <div key={user.id} className="mb-4">
              <UserListCard
                imageUrl={user.imageUrl}
                mainLabel={user.mainLabel}
                name={user.name}
                badge={user.badge}
              />
            </div>
          ))}
        </InfiniteScroll>
      </div>

      {/* 필터 팝업 (예시) */}
      {filterPopupOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white text-black p-4 rounded">
            <h2 className="text-lg font-bold">필터 설정</h2>
            <button
              className="mt-4 bg-gray-200 px-4 py-2 rounded"
              onClick={() => setFilterPopupOpen(false)}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserFilterSection;
