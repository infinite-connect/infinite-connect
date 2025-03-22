import TypeCardCarousel from '@components/commons/Card/TypeCardCarousel';
import { Button } from '@components/ui/button';
import { RootState } from '@store/store';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SelectCardDesignPage = (): React.JSX.Element => {
  const navigate = useNavigate();
  const userInfo = useSelector((state: RootState) => state.user.userInfo);

  console.log(userInfo);

  const handleCompleteSelection = () => {
    navigate('/additionalinfo');
  };

  return (
    <div className="w-120 flex flex-col items-center gap-4 p-6">
      <h1>{userInfo?.name}님이 선호하는 네트워킹 시간대를 선택해주세요</h1>
      <div className="mb-10 items-center ">
        <TypeCardCarousel />
      </div>
      <Button variant="outline" onClick={handleCompleteSelection}>
        선택 완료
      </Button>
    </div>
  );
};

export default SelectCardDesignPage;
