import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@store/store';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@utils/supabaseClient'; // Supabase 클라이언트 import
import { logoutSuccess } from '@features/User/slice/userSlice';
import QRDisplayDrawer from '@components/commons/QR/QRDisplayDrawer';
import QRScanDisplayModal from '@components/commons/QR/QRScanDisplayModal';
import QRScanModal from '@components/commons/QR/QRScanModal';

const MainPage = (): React.JSX.Element => {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [isThirdDrawerOpen, setIsThirdDrawerOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('로그아웃 실패:', error.message);
        alert('로그아웃 중 오류가 발생했습니다.');
        return;
      }

      dispatch(logoutSuccess());

      localStorage.removeItem('refresh_token');
      localStorage.removeItem('auto_login');

      alert('로그아웃 성공!');
      navigate('/login'); // 로그인 페이지로 이동
    } catch (err) {
      console.error('로그아웃 중 오류 발생:', err);
      alert('알 수 없는 오류가 발생했습니다.');
    }
  };

  return (
    <div className="px-20">
      <h1>홈 페이지</h1>
      {userInfo ? (
        <>
          <div>
            <p>사용자 ID: {userInfo.id}</p>
            <p>닉네임: {userInfo.nickname}</p>
            <p>이름: {userInfo.name}</p>
            <p>이메일: {userInfo.email}</p>
            <button
              onClick={() => setIsFirstModalOpen(true)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              첫 번째 모달 열기
            </button>

            <button
              onClick={() => setIsSecondModalOpen(true)}
              className="mt-4 ml-4 px-4 py-2 bg-green-500 text-white rounded"
            >
              두 번째 모달 열기
            </button>

            <button
              onClick={() => setIsThirdDrawerOpen(true)}
              className="mt-4 mx-4 px-4 py-2 bg-purple-500 text-white rounded"
            >
              세 번째 드로어 열기
            </button>
            <button onClick={handleLogout} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
              로그아웃
            </button>
          </div>
          <QRScanDisplayModal
            isOpen={isFirstModalOpen}
            onClose={() => setIsFirstModalOpen(false)}
          />
          <QRScanModal isOpen={isSecondModalOpen} onClose={() => setIsSecondModalOpen(false)} />
          <QRDisplayDrawer isOpen={isThirdDrawerOpen} onClose={() => setIsThirdDrawerOpen(false)} />
        </>
      ) : (
        <p>로그인이 필요합니다.</p>
      )}
    </div>
  );
};

export default MainPage;
