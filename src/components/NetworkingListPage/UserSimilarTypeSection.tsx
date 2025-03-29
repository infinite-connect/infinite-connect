import React from 'react';
import SimilarTypeBox from './SimilarTypeBox';
import { ScrollArea } from '@components/ui/scroll-area';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { useGetSameCardTypeUsersQuery } from '@features/Networking/networkingApi';

const UserSimilarTypeSection = (): React.JSX.Element => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const nickname = useSelector((state: RootState) => state.user.userInfo?.nickname) || '';
  const primaryCard = useSelector((state: RootState) => state.userBusinessCard.primaryCard);
  // 혹은 Redux에 저장한 대표 명함 정보

  console.log(primaryCard);
  // 카드타입과 닉네임이 있으면 동일한 사용자 목록 조회
  const { data, isLoading } = useGetSameCardTypeUsersQuery(
    primaryCard
      ? { cardType: primaryCard.card_type, excludeNickname: nickname }
      : { cardType: '', excludeNickname: '' },
    {
      skip: !primaryCard, // userBusinessCard가 없으면 API 호출 skip
    },
  );

  console.log('로그인한 유저와 비슷한 타입:', data);

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <div className="flex flex-col pl-[16px] gap-[20px]">
      <h2
        className="  
              text-[var(--text-primary)]   
                font-[NanumGothic]        
                text-[18px]             
                font-normal                 
                leading-[140%]           
                tracking-[-0.27px]         
                self-stretch
                "
      >
        <span className="text-[var(--text-accent)]">{userInfo?.name}</span>님과 네트워킹 타입이
        똑같아요
      </h2>
      <ScrollArea className="w-full relative">
        <div className="flex flex-row gap-[10px] flex-nowrap ">
          <SimilarTypeBox />
          <SimilarTypeBox />
          <SimilarTypeBox />
        </div>
      </ScrollArea>
    </div>
  );
};

export default UserSimilarTypeSection;
