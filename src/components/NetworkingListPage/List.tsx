import { useNavigate } from 'react-router-dom';
import React from 'react';
import { BusinessCardList } from '@features/Networking/networkingApi'; // BusinessCard 타입 가져오기

interface ListProps {
  networkingList: BusinessCardList[] | undefined;
}

const List: React.FC<ListProps> = ({ networkingList }): React.JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="px-4 mt-4">
      {networkingList?.map((profile) => (
        <div
          key={profile.business_card_id}
          className="flex items-center gap-4 bg-gray-800 p-4 rounded-lg mb-2 cursor-pointer"
          onClick={() => navigate(`/${profile.nickname}/${profile.business_card_id}`)}
        >
          <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-sm">
            profile
          </div>
          <div>
            <p className="font-semibold">{profile.nickname}</p>
            <p className="text-gray-400">
              <span className="font-bold">{profile.fields_of_expertise}</span> |{' '}
              {profile.sub_expertise}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
