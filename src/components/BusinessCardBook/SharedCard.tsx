import React from 'react';
import { IconButton } from '@components/commons/Button/IconButton';
import { ChevronLeft } from 'lucide-react';
import EmptyCard from './EmptyCard';
import { Header } from '@components/commons/Header/Header';
import { useGetRecipientsByFollowingCardIdQuery } from '@features/BusinessCard/api/exchangeApi';
import SpecificCardBox from './SpecificCardBox';
import { useGetBusinessCardQuery } from '@features/Networking/networkingApi';

interface SharedCardProps {
  selectCardId: string;
  onBack: () => void;
}

const SharedCard: React.FC<SharedCardProps> = ({ selectCardId, onBack }) => {
  // API를 통해 해당 카드의 팔로워 목록(배열)을 받아옵니다.
  const { data, isLoading, error } = useGetRecipientsByFollowingCardIdQuery({
    cardId: selectCardId,
  });
  const { data: cardData } = useGetBusinessCardQuery(selectCardId);
  console.log('cardData:::::::', cardData);

  if (isLoading) return <div className="p-4 text-center">로딩 중...</div>;
  if (error) return <div className="p-4 text-center">에러가 발생했습니다.</div>;
  if (!data || data.length === 0) {
    return (
      <>
        <Header className="px-[16px] bg-[var(--bg-default-black)] top-0 left-0">
          <Header.Left>
            <IconButton icon={<ChevronLeft className="w-7 h-7" />} onClick={onBack} />
          </Header.Left>
          <Header.Center>
            <h1 className="text-base font-semibold ml-2 truncate">
              {cardData?.card_name}을 공유받은 사람
            </h1>
          </Header.Center>
        </Header>
        <div className="flex flex-col items-center justify-center min-h-[100vh] px-4">
          <EmptyCard />
        </div>
      </>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[var(--bg-default-black)] text-white pb-8">
      {/* 상단 헤더 */}
      <Header className="px-[16px] bg-[var(--bg-default-black)] top-0 left-0">
        <Header.Left>
          <IconButton icon={<ChevronLeft className="w-7 h-7" />} onClick={onBack} />
        </Header.Left>
        <Header.Center>
          {cardData?.card_name && (
            <h1 className="text-base font-semibold ml-2 truncate">
              {cardData?.card_name}을 공유받은 사람
            </h1>
          )}
        </Header.Center>
      </Header>

      {/* 팔로워 목록 */}
      <div className="grid grid-cols-2 gap-4 mt-6 px-4">
        {data.map((user) => (
          <SpecificCardBox key={user.cardId} cardId={user.cardId} nickName={user.nickname} />
        ))}
      </div>
    </div>
  );
};

export default SharedCard;
