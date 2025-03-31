import { useEffect } from 'react';
import { supabase } from '@utils/supabaseClient';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '@features/User/slice/userSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { RootState } from '@store/store';

const useAutoLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // Redux 스토어에서 사용자 정보 가져오기
  const userInfo = useSelector((state: RootState) => state.user.userInfo);

  useEffect(() => {
    // 이미 로그인되어 있는 경우 자동 로그인 시도하지 않음
    if (userInfo && userInfo.id) {
      console.log('이미 로그인되어 있습니다.');
      return;
    }

    const attemptAutoLogin = async () => {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        console.log('자동 로그인 토큰이 없습니다.');
        return;
      }

      try {
        const { data, error } = await supabase.auth.refreshSession({ refresh_token: refreshToken });

        if (error) {
          console.error('자동 로그인 실패:', error);
          localStorage.removeItem('refresh_token');
          return;
        }

        if (data?.session && data?.user) {
          // 새 세션 토큰 저장
          localStorage.setItem('refresh_token', data.session.refresh_token);

          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('nickname, name, phone_number')
            .eq('user_id', data.user.id)
            .single();

          if (userError) {
            console.error('사용자 정보를 가져오는 중 오류 발생:', userError);
            return;
          }

          dispatch(
            loginSuccess({
              id: data.user.id,
              email: data.user.email ?? '',
              nickname: userData?.nickname ?? '',
              name: userData?.name ?? '',
              phone_number: userData?.phone_number ?? '',
            }),
          );
          console.log('자동 로그인 성공:', data.user);

          // 로그인 페이지에서 왔다면 홈으로 리다이렉트
          if (location.pathname === '/login') {
            navigate('/');
          }
        }
      } catch (err) {
        console.error('자동 로그인 중 오류 발생:', err);
        localStorage.removeItem('refresh_token');
      }
    };

    attemptAutoLogin();
  }, [dispatch, navigate, userInfo, location.pathname]);
};

export default useAutoLogin;
