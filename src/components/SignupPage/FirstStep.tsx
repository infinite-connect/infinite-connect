import React, { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Icon } from '@iconify/react';
import {
  useLazyCheckEmailDuplicateQuery,
  useLazyCheckNicknameDuplicateQuery,
} from '@features/SignupPage/api/InfoDuplicateCheckApi';

interface FirstStepProps {
  nextStep: () => void;
}

const FirstStep: React.FC<FirstStepProps> = ({ nextStep }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [triggerCheckEmailDuplicate] = useLazyCheckEmailDuplicateQuery();
  const [triggerCheckNicknameDuplicate] = useLazyCheckNicknameDuplicateQuery();
  const {
    register,
    trigger,
    setFocus,
    setError, // 특정 필드에 에러 설정
    clearErrors,
    formState: { errors },
  } = useFormContext();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // 다음 단계로 이동
  const handleNextStep = async () => {
    const nickname = inputRefs.current[1]?.value ?? ''; // 닉네임 값 가져오기
    const email = inputRefs.current[2]?.value ?? ''; // 이메일 값 가져오기

    try {
      // 유효성 검사 실행
      const isValid = await trigger(['name', 'nickname', 'email', 'password', 'confirmPassword']);

      // 닉네임 유효성 검사 결과 처리
      if (errors.nickname) {
        setError('nickname', {
          type: 'manual',
          message:
            typeof errors.nickname?.message === 'string'
              ? errors.nickname.message
              : '아이디는 최소 4자 이상이어야 합니다.',
        });
      }

      // 이메일 유효성 검사 결과 처리
      if (errors.email) {
        setError('email', {
          type: 'manual',
          message:
            typeof errors.email?.message === 'string'
              ? errors.email.message
              : '유효한 이메일 주소를 입력해주세요.',
        });
      }

      // 중복 확인 병렬 실행
      const [isNicknameDuplicate, isEmailDuplicate] = await Promise.all([
        nickname ? triggerCheckNicknameDuplicate(nickname).unwrap() : false,
        email ? triggerCheckEmailDuplicate(email).unwrap() : false,
      ]);

      // 닉네임 중복 확인 결과 처리
      if (!errors.nickname && isNicknameDuplicate) {
        setError('nickname', { type: 'manual', message: '이미 사용 중인 아이디입니다.' });
      }

      // 이메일 중복 확인 결과 처리
      if (!errors.email && isEmailDuplicate) {
        setError('email', { type: 'manual', message: '이미 사용 중인 이메일입니다.' });
      }

      // 모든 필드가 유효성을 통과하고 중복되지 않은 경우 다음 단계로 이동
      if (isValid && !isNicknameDuplicate && !isEmailDuplicate) {
        nextStep();
      }
    } catch (error) {
      console.error('중복 확인 중 오류 발생:', error);
    }
  };

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>,
    fieldName: string,
    nextFieldIndex: number,
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      const isValid = await trigger(fieldName);

      if (!isValid) {
        setFocus(fieldName);
        return;
      }

      if (fieldName === 'nickname') {
        const nickname = inputRefs.current[nextFieldIndex - 1]?.value;
        try {
          const isNicknameDuplicate = await triggerCheckNicknameDuplicate(nickname!).unwrap();
          if (isNicknameDuplicate) {
            setError('nickname', { type: 'manual', message: '이미 사용 중인 아이디입니다.' });
            setFocus('nickname');
            return;
          } else {
            clearErrors('nickname');
          }
        } catch (error) {
          console.error('닉네임 중복 확인 중 오류 발생:', error);
          return;
        }
      }

      if (fieldName === 'email') {
        const email = inputRefs.current[nextFieldIndex - 1]?.value;
        try {
          const isEmailDuplicate = await triggerCheckEmailDuplicate(email!).unwrap();
          if (isEmailDuplicate) {
            setError('email', { type: 'manual', message: '이미 사용 중인 이메일입니다.' });
            setFocus('email');
            return;
          } else {
            clearErrors('email');
          }
        } catch (error) {
          console.error('이메일 중복 확인 중 오류 발생:', error);
          return;
        }
      }

      inputRefs.current[nextFieldIndex]?.focus();
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
          onBlur={async () => {
            const isValid = await trigger('nickname'); // 유효성 검사 실행

            if (!isValid) {
              return; // 유효성 검사를 통과하지 못하면 중복 확인 건너뜀
            }

            const nickname = inputRefs.current[1]?.value;
            try {
              const isNicknameDuplicate = await triggerCheckNicknameDuplicate(nickname!).unwrap();
              if (isNicknameDuplicate) {
                setError('nickname', { type: 'manual', message: '이미 사용 중인 아이디입니다.' });
              } else {
                clearErrors('nickname');
              }
            } catch (error) {
              console.error('닉네임 중복 확인 중 오류 발생:', error);
            }
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
          onBlur={async () => {
            const isValid = await trigger('email'); // 유효성 검사 실행

            if (!isValid) {
              return; // 유효성 검사를 통과하지 못하면 중복 확인 건너뜀
            }

            const email = inputRefs.current[2]?.value;
            try {
              const isEmailDuplicate = await triggerCheckEmailDuplicate(email!).unwrap();
              if (isEmailDuplicate) {
                setError('email', { type: 'manual', message: '이미 사용 중인 이메일입니다.' });
              } else {
                clearErrors('email');
              }
            } catch (error) {
              console.error('이메일 중복 확인 중 오류 발생:', error);
            }
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
