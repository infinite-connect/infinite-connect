import React from 'react';
import SocialLogin from '@components/LoginPage/SocialLogin';
import LoginForm from '@components/LoginPage/LoginForm';
import LoginHeader from '@assets/Login/LoginHeader.svg';

const Login = (): React.JSX.Element => {
  return (
    <div className="relative flex flex-col justify-center min-h-screen bg-[radial-gradient(198.03%_32.79%_at_47.73%_100%,_#6262BB_0%,_#121212_51.3%)] px-6">
      {/* 타이틀 */}
      <div className="w-1/2 h-auto mb-10">
        <img src={LoginHeader} alt="Login Header" className="w-full h-auto" />
      </div>

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
