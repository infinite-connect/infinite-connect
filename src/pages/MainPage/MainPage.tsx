import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';

const MainPage = (): React.JSX.Element => {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);

  return (
    <div className="px-20">
      <h1>홈 페이지</h1>
      {userInfo ? (
        <div>
          <p>사용자 ID: {userInfo.id}</p>
          <p>닉네임: {userInfo.nickname}</p>
          <p>이메일: {userInfo.email}</p>
        </div>
      ) : (
        <p>로그인이 필요합니다.</p>
      )}
    </div>
  );
};

export default MainPage;
