import { useEffect } from 'react';
import { supabase } from '@utils/supabaseClient';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@features/User/slice/userSlice';

const useAutoLogin = () => {
  const dispatch = useDispatch();

  useEffect(() => {
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
          localStorage.removeItem('refresh_token'); // 실패 시 토큰 제거
          return;
        }

        if (data?.session && data?.user) {
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('nickname')
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
            }),
          );
          console.log('자동 로그인 성공:', data.user);
        }
      } catch (err) {
        console.error('자동 로그인 중 오류 발생:', err);
        localStorage.removeItem('refresh_token'); // 오류 발생 시 토큰 제거
      }
    };

    attemptAutoLogin();
  }, [dispatch]);
};

export default useAutoLogin;
