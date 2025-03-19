import React, { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Icon } from '@iconify/react';

interface FirstStepProps {
  nextStep: () => void;
}

const FirstStep: React.FC<FirstStepProps> = ({ nextStep }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    trigger,
    setFocus,
    formState: { errors },
  } = useFormContext();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // 다음 단계로 이동
  const handleNextStep = async () => {
    const isValid = await trigger(['name', 'nickname', 'email', 'password', 'confirmPassword']);
    if (isValid) {
      nextStep(); // 유효성 검사를 통과하면 다음 단계로 이동
    }
  };

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>,
    fieldName: string,
    nextFieldIndex: number,
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // 기본 Enter 동작 방지
      const isValid = await trigger(fieldName); // 현재 필드 유효성 검사

      if (isValid) {
        // 유효성 검사를 통과하면 다음 필드로 포커스 이동
        inputRefs.current[nextFieldIndex]?.focus();
      } else {
        // 유효성 검사 실패 시 현재 필드에 머무름
        setFocus(fieldName);
      }
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg text-white">기본 정보 입력</h2>

      {/* 이름 */}
      <div className="flex flex-col">
        <label htmlFor="name" className="text-sm text-gray-400">
          이름
        </label>
        <input
          id="name"
          {...register('name')}
          ref={(el) => {
            register('name').ref(el);
            inputRefs.current[0] = el;
          }}
          onKeyDown={(e) => handleKeyDown(e, 'name', 1)}
          placeholder="이름"
          className={`rounded-md border ${
            errors.name ? 'border-red-500' : 'border-gray-600'
          } bg-gray-700 px-4 py-2 text-white`}
        />
        {errors.name && (
          <span className="text-xs text-red-500">{errors.name.message?.toString()}</span>
        )}
      </div>

      {/* 아이디 */}
      <div className="flex flex-col">
        <label htmlFor="nickname" className="text-sm text-gray-400">
          아이디
        </label>
        <input
          id="nickname"
          {...register('nickname')}
          ref={(el) => {
            register('nickname').ref(el);
            inputRefs.current[1] = el;
          }}
          onKeyDown={(e) => handleKeyDown(e, 'nickname', 2)}
          placeholder="아이디"
          className={`rounded-md border ${
            errors.nickname ? 'border-red-500' : 'border-gray-600'
          } bg-gray-700 px-4 py-2 text-white`}
        />
        {errors.nickname && (
          <span className="text-xs text-red-500">{errors.nickname.message?.toString()}</span>
        )}
      </div>

      {/* 이메일 */}
      <div className="flex flex-col">
        <label htmlFor="email" className="text-sm text-gray-400">
          이메일
        </label>
        <input
          id="email"
          {...register('email')}
          ref={(el) => {
            register('email').ref(el);
            inputRefs.current[2] = el;
          }}
          onKeyDown={(e) => handleKeyDown(e, 'email', 3)}
          type="email"
          placeholder="이메일"
          className={`rounded-md border ${
            errors.email ? 'border-red-500' : 'border-gray-600'
          } bg-gray-700 px-4 py-2 text-white`}
        />
        {errors.email && (
          <span className="text-xs text-red-500">{errors.email.message?.toString()}</span>
        )}
      </div>

      {/* 비밀번호 */}
      <div className="flex flex-col">
        <label htmlFor="password" className="text-sm text-gray-400">
          비밀번호
        </label>
        <div className="relative">
          <input
            id="password"
            {...register('password')}
            ref={(el) => {
              register('password').ref(el);
              inputRefs.current[3] = el;
            }}
            onKeyDown={(e) => handleKeyDown(e, 'password', 4)}
            type={showPassword ? 'text' : 'password'}
            placeholder="비밀번호"
            className={`w-full rounded-md border ${
              errors.password ? 'border-red-500' : 'border-gray-600'
            } bg-gray-700 px-4 py-2 text-white`}
          />
          {/* 눈 아이콘 */}
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-[50%] translate-y-[-50%] text-gray-400 hover:text-gray-200"
          >
            <Icon icon={showPassword ? 'mdi:eye-off' : 'mdi:eye'} width={20} height={20} />
          </button>
        </div>
        {errors.password && (
          <span className="text-xs text-red-500">{errors.password.message?.toString()}</span>
        )}
      </div>

      {/* 비밀번호 확인 */}
      <div className="flex flex-col">
        <label htmlFor="confirmPassword" className="text-sm text-gray-400">
          비밀번호 확인
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            {...register('confirmPassword')}
            ref={(el) => {
              register('confirmPassword').ref(el);
              inputRefs.current[4] = el;
            }}
            onKeyDown={(e) => handleKeyDown(e, 'confirmPassword', 5)}
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="비밀번호 확인"
            className={`w-full rounded-md border ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-600'
            } bg-gray-700 px-4 py-2 text-white`}
          />
          {/* 눈 아이콘 */}
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 top-[50%] translate-y-[-50%] text-gray-400 hover:text-gray-200"
          >
            <Icon icon={showConfirmPassword ? 'mdi:eye-off' : 'mdi:eye'} width={20} height={20} />
          </button>
        </div>
        {errors.confirmPassword && (
          <span className="text-xs text-red-500">{errors.confirmPassword.message?.toString()}</span>
        )}
      </div>

      {/* 다음 단계 버튼 */}
      <button
        onClick={handleNextStep}
        type="button"
        className={`w-full py-2 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md`}
      >
        다음 단계
      </button>
    </div>
  );
};

export default FirstStep;
