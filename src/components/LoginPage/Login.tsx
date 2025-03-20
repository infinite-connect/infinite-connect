import { FloatingLabelInput } from '@components/commons/FloatingLabelInput';
import { Button } from '@components/ui/button';
import { Separator } from '@components/ui/separator';
import { Checkbox } from '@components/ui/checkbox';
import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const Login = (): React.JSX.Element => {
  const [userEmail, setUserEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

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
              <Checkbox id="auto-login" />
              <span className="ml-2">자동 로그인</span>
            </label>
          </div>

          {/* 로그인 버튼 */}
          <Button variant="default" className="w-full py-2 mt-4">
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
