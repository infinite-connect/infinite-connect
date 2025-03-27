import React, { useState } from 'react';
import { Checkbox } from '@components/ui/checkbox';
import { Icon } from '@iconify/react';
import { supabase } from '@utils/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@features/User/slice/userSlice';
import { Button } from '@components/commons/Button/Button';
import { Input } from '@components/Input/input';

const LoginForm = (): React.JSX.Element => {
  const [userEmail, setUserEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [autoLogin, setAutoLogin] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = () => {
    navigate('/signup');
  };

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
          .select('nickname, name')
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
            name: userData?.name ?? '',
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
    <div className="space-y-6">
      <div className="space-y-5">
        {/* Email */}
        <div className="space-y-[6px]">
          <div className="text-[var(--text-primary)]">Email</div>
          {/* Email Input */}
          <Input
            id="email"
            type="email"
            placeholder="이메일을 입력하세요"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="w-full  text-left leading-[1.25rem] "
          />
        </div>

        {/* password */}
        <div className="space-y-[6px]">
          {/* Password Input */}
          <div className="text-[var(--text-primary)]">Password</div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              placeholder="비밀번호를 입력하세요"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full  text-left leading-[1.25rem] "
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
        </div>

        {/* 아이디 저장 및 자동 로그인 */}
        <div className="flex items-center justify-between mt-2">
          <label className="flex items-center text-sm text-gray-400">
            <Checkbox
              id="auto-login"
              checked={autoLogin}
              onCheckedChange={(checked) => setAutoLogin(checked === true)}
            />
            <span className="ml-2">자동 로그인</span>
          </label>
        </div>
      </div>

      {/* 로그인 버튼 */}
      <div>
        <Button btntype="enabled" className="w-full py-2 mt-4" onClick={handleLogin}>
          로그인
        </Button>

        <Button btntype="secondary" className="w-full py-2 mt-4" onClick={handleSignUp}>
          회원가입
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
