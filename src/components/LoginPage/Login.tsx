import { FloatingLabelInput } from '@components/commons/FloatingLabelInput';
import { Button } from '@components/ui/button';
import { Separator } from '@components/ui/separator';
import { Checkbox } from '@components/ui/checkbox';
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { supabase } from '@utils/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@features/User/slice/userSlice';

const Login = (): React.JSX.Element => {
  const [userEmail, setUserEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [autoLogin, setAutoLogin] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      // Supabase를 통해 이메일/비밀번호로 로그인
      const { data, error } = await supabase.auth.signInWithPassword({
        email: userEmail,
        password: password,
      });

      if (error) {
        if (error.message === 'Email not confirmed') {
          alert('이메일 인증이 필요합니다.');
        } else {
          alert(`로그인 실패: ${error.message}`);
        }
        return;
      }

      if (data.user && data.session) {
        // 로그인 성공 시 추가 사용자 정보를 가져옴
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('nickname')
          .eq('user_id', data.user.id)
          .single();

        if (userError) {
          console.error('사용자 정보를 가져오는 중 오류 발생:', userError);
          alert('사용자 정보를 가져오는 중 오류가 발생했습니다.');
          return;
        }

        // Redux 상태 업데이트
        dispatch(
          loginSuccess({
            id: data.user.id,
            email: data.user.email ?? '',
            nickname: userData?.nickname ?? '',
          }),
        );

        // refresh_token 저장 (자동 로그인용)
        localStorage.setItem('refresh_token', data.session.refresh_token);

        if (autoLogin) {
          localStorage.setItem('auto_login', 'true');
        } else {
          localStorage.removeItem('auto_login');
        }

        alert('로그인 성공!');
        navigate('/'); // 홈 화면으로 이동
      }
    } catch (err) {
      console.error('로그인 중 오류 발생:', err);
      alert('알 수 없는 오류가 발생했습니다.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        {/* 타이틀 */}
        <h1 className="text-2xl font-bold text-center text-white mb-6">Infinite Connect</h1>

        {/* 입력 필드 */}
        <div className="space-y-6">
          {/* Email Input */}
          <FloatingLabelInput
            id="email"
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            label="Email"
            className="w-full rounded-md border border-gray-600 bg-transparent px-4 pt-[10px] pb-[8px] text-sm text-white text-left leading-[1.25rem] focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />

          {/* Password Input */}
          <div className="relative">
            <FloatingLabelInput
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              className="w-full rounded-md border border-gray-600 bg-transparent px-4 pt-[10px] pb-[8px] text-sm text-white text-left leading-[1.25rem] focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
            {/* 비밀번호 보기 아이콘 */}
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[50%] translate-y-[-50%] text-gray-400 hover:text-gray-200"
            >
              <Icon icon={showPassword ? 'mdi:eye-off' : 'mdi:eye'} width={20} height={20} />
            </button>
          </div>

          {/* 아이디 저장 및 자동 로그인 */}
          <div className="flex items-center justify-between mt-2">
            <label className="flex items-center text-sm text-gray-400">
              <Checkbox
                id="auto-login"
                checked={autoLogin}
                onCheckedChange={
                  (checked) => setAutoLogin(checked === true) // CheckedState를 boolean으로 변환
                }
              />
              <span className="ml-2">자동 로그인</span>
            </label>
          </div>

          {/* 로그인 버튼 */}
          <Button variant="default" className="w-full py-2 mt-4" onClick={handleLogin}>
            ➡️ 로그인
          </Button>

          <div className="flex items-center my-4">
            <Separator className="flex-grow h-px bg-gray-600" />
          </div>
          <div className="flex justify-center gap-x-4">
            {/* Google */}
            <Button
              variant="outline"
              size="sm"
              className="w-[50px] h-[50px] rounded-md bg-white flex items-center justify-center shadow-md hover:shadow-lg"
            >
              <Icon icon="logos:google-icon" width={24} height={24} />
            </Button>

            {/* GitHub */}
            <Button
              variant="outline"
              size="sm"
              className="w-[50px] h-[50px] rounded-md bg-black flex items-center justify-center shadow-md hover:shadow-lg"
            >
              <Icon icon="mdi:github" color="#ffffff" width={24} height={24} />
            </Button>
          </div>

          {/* 회원가입 링크 */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              계정이 없으신가요?{' '}
              <a href="/register" className="text-blue-400 hover:underline">
                회원가입
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
