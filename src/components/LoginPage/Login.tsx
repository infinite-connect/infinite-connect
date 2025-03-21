import React from 'react';
import LoginForm from '@components/LoginPage/LoginForm';
import SocialLogin from '@components/LoginPage/SocialLogin';
import { Separator } from '@components/ui/separator';

const Login = (): React.JSX.Element => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--bg-default-black)]">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        {/* 타이틀 */}
        <h1 className="text-2xl font-bold text-center text-white mb-6">Infinite Connect</h1>

        {/* 로그인 폼 */}
        <LoginForm />

        {/* 구분선 */}
        <div className="flex items-center my-4">
          <Separator className="flex-grow h-px bg-gray-600" />
        </div>

        {/* 소셜 로그인 */}
        <SocialLogin />

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
  );
};

export default Login;
