import React from 'react';
import { IconButton } from '@components/commons/Button/IconButton';
import { ChevronLeft } from 'lucide-react';
import GridCardBox from './GridCardBox';
import { Header } from '@components/commons/Header/Header';
import EmptyCard from './EmptyCard';

interface Recipient {
  id: string;
  name: string;
  role: string;
  detail: string;
  businessName?: string;
}

interface SharedCardProps {
  cardName: string;
  recipients: Recipient[];
  onBack: () => void;
}

const SharedCard: React.FC<SharedCardProps> = ({ cardName, recipients, onBack }) => {
  return (
    <div className="w-full min-h-screen bg-[var(--bg-default-black)] text-white pb-8">
      {/* 상단 헤더 */}
      <Header className="px-[16px] bg-[var(--bg-default-black)] top-0 left-0">
        <Header.Left>
          <IconButton icon={<ChevronLeft className="w-7 h-7" />} onClick={onBack} />
        </Header.Left>
        <Header.Center>
          <h1 className="text-base font-semibold ml-2 truncate">{cardName}을 공유받은 사람</h1>
        </Header.Center>
      </Header>

      {/* 본문 리스트 or Empty */}
      {recipients.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 mt-6 px-4">
          {recipients.map((user) => (
            <GridCardBox
              key={user.id}
              name={user.name}
              fieldsOfExpertise={user.role}
              subExpertise={user.detail}
              department=""
              cardType="morning"
              businessName={user.businessName || ''}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <EmptyCard />
        </div>
      )}
    </div>
  );
};

export default SharedCard;
