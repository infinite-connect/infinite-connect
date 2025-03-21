import React from 'react';
import LoginForm from '@components/LoginPage/LoginForm';
import SocialLogin from '@components/LoginPage/SocialLogin';

const Login = (): React.JSX.Element => {
  return (
    <div className="flex flex-col justify-center min-h-screen bg-[var(--bg-default-black)] px-6">
      {/* 타이틀 */}
      <h1 className="text-2xl font-bold text-white mb-1 mt-20">
        INFINITE
        <br />
        CONNECT
      </h1>
      <h5 className="text-l font-bold text-white mb-10">무한한 기회, 가벼운 시작</h5>

      <div>
        {/* 로그인 폼 */}
        <LoginForm />
      </div>

      {/* 회원가입 링크 */}
      <div className="mt-10 space-y-6 text-center">
        <p className="text-[var(--color-text-primary)]">SNS 계정으로 간편하게 가입하기</p>

        {/* 소셜 로그인 */}
        <SocialLogin />
      </div>
    </div>
  );
};

export default Login;
