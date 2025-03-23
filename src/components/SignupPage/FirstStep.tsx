import React, { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Icon } from '@iconify/react';
import {
  useLazyCheckEmailDuplicateQuery,
  useLazyCheckNicknameDuplicateQuery,
  useLazyCheckPhoneNumberDuplicateQuery,
} from '@features/SignupPage/api/infoDuplicateCheckApi';
import { Button } from '@components/commons/Button/Button';
import { formatPhoneNumber } from '@utils/formatPhoneNumber';

interface FirstStepProps {
  nextStep: () => void;
}

const FirstStep: React.FC<FirstStepProps> = ({ nextStep }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessages, setSuccessMessages] = useState<{ [key: string]: string }>({});
  const [triggerCheckEmailDuplicate] = useLazyCheckEmailDuplicateQuery();
  const [triggerCheckNicknameDuplicate] = useLazyCheckNicknameDuplicateQuery();
  const [triggerCheckPhoneNumberDuplicate] = useLazyCheckPhoneNumberDuplicateQuery();
  const {
    register,
    trigger,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // 다음 단계로 이동
  const handleNextStep = async () => {
    const phoneNumber = inputRefs.current[1]?.value ?? '';
    const nickname = inputRefs.current[2]?.value ?? '';
    const email = inputRefs.current[3]?.value ?? '';

    try {
      // 유효성 검사 실행
      const isValid = await trigger([
        'name',
        'phoneNumber',
        'nickname',
        'email',
        'password',
        'confirmPassword',
      ]);

      // 중복 확인 병렬 실행
      const [isPhoneNumberDuplicate, isNicknameDuplicate, isEmailDuplicate] = await Promise.all([
        phoneNumber ? triggerCheckPhoneNumberDuplicate(phoneNumber).unwrap() : false,
        nickname ? triggerCheckNicknameDuplicate(nickname).unwrap() : false,
        email ? triggerCheckEmailDuplicate(email).unwrap() : false,
      ]);

      // 핸드폰 번호 중복 확인 결과 처리
      if (!errors.phoneNumber && !isPhoneNumberDuplicate) {
        setSuccessMessages((prev) => ({
          ...prev,
          phoneNumber: '사용하실 수 있는 핸드폰 번호예요',
        }));
      } else if (isPhoneNumberDuplicate) {
        setError('phoneNumber', { type: 'manual', message: '이미 존재하는 핸드폰 번호예요' });
      }

      // 닉네임 중복 확인 결과 처리
      if (!errors.nickname && !isNicknameDuplicate) {
        setSuccessMessages((prev) => ({ ...prev, nickname: '사용하실 수 있는 아이디예요' }));
      } else if (isNicknameDuplicate) {
        setError('nickname', { type: 'manual', message: '이미 존재하는 아이디예요' });
      }

      // 이메일 중복 확인 결과 처리
      if (!errors.email && !isEmailDuplicate) {
        setSuccessMessages((prev) => ({ ...prev, email: '사용하실 수 있는 이메일이에요' }));
      } else if (isEmailDuplicate) {
        setError('email', { type: 'manual', message: '이미 존재하는 이메일이에요' });
      }

      // 모든 필드가 유효성을 통과하고 중복되지 않은 경우 다음 단계로 이동
      if (isValid && !isPhoneNumberDuplicate && !isNicknameDuplicate && !isEmailDuplicate) {
        nextStep();
      }
    } catch (error) {
      console.error('중복 확인 중 오류 발생:', error);
    }
  };

  // 개별 필드 유효성 검사 및 성공 메시지 처리
  const handleFieldValidation = async (fieldName: string, index: number) => {
    const isValid = await trigger(fieldName);

    if (isValid) {
      // 성공 메시지 커스터마이즈
      const successMessageMap: { [key: string]: string } = {
        name: '사용하실 수 있는 이름이에요',
        phoneNumber: '사용하실 수 있는 핸드폰 번호예요',
        nickname: '사용하실 수 있는 아이디예요',
        email: '사용하실 수 있는 이메일이에요',
        password: '안전한 비밀번호예요',
        confirmPassword: '비밀번호가 일치합니다',
      };

      setSuccessMessages((prev) => ({
        ...prev,
        [fieldName]: successMessageMap[fieldName] || '유효한 값입니다',
      }));
      clearErrors(fieldName);
    } else {
      setSuccessMessages((prev) => {
        const updatedMessages = { ...prev };
        delete updatedMessages[fieldName];
        return updatedMessages;
      });
    }

    // 추가적으로 닉네임, 이메일, 핸드폰 번호는 중복 검사를 실행
    if (fieldName === 'phoneNumber') {
      const phoneNumber = inputRefs.current[index]?.value;
      try {
        const isPhoneNumberDuplicate = await triggerCheckPhoneNumberDuplicate(
          formatPhoneNumber(phoneNumber!),
        ).unwrap();
        if (!isPhoneNumberDuplicate) {
          setSuccessMessages((prev) => ({
            ...prev,
            phoneNumber: '사용하실 수 있는 핸드폰 번호예요',
          }));
          clearErrors('phoneNumber');
        } else {
          setError('phoneNumber', { type: 'manual', message: '이미 존재하는 핸드폰 번호예요' });
        }
      } catch (error) {
        console.error('핸드폰 번호 중복 확인 중 오류 발생:', error);
      }
    }

    // 추가적으로 닉네임과 이메일은 중복 검사를 실행
    if (fieldName === 'nickname') {
      const nickname = inputRefs.current[index]?.value;
      try {
        const isNicknameDuplicate = await triggerCheckNicknameDuplicate(nickname!).unwrap();
        if (!isNicknameDuplicate) {
          setSuccessMessages((prev) => ({ ...prev, nickname: '사용하실 수 있는 아이디예요' }));
          clearErrors('nickname');
        } else {
          setError('nickname', { type: 'manual', message: '이미 존재하는 아이디예요' });
        }
      } catch (error) {
        console.error('닉네임 중복 확인 중 오류 발생:', error);
      }
    }

    if (fieldName === 'email') {
      const email = inputRefs.current[index]?.value;
      try {
        const isEmailDuplicate = await triggerCheckEmailDuplicate(email!).unwrap();
        if (!isEmailDuplicate) {
          setSuccessMessages((prev) => ({ ...prev, email: '사용하실 수 있는 이메일이에요' }));
          clearErrors('email');
        } else {
          setError('email', { type: 'manual', message: '이미 존재하는 이메일이에요' });
        }
      } catch (error) {
        console.error('이메일 중복 확인 중 오류 발생:', error);
      }
    }
  };

  return (
    <div className="space-y-[20px]">
      {/* 이름 */}
      <div className="flex flex-col space-y-[6px]">
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
          onBlur={() => handleFieldValidation('name', 0)}
          placeholder="이름"
          className={`rounded-md border ${
            errors.name ? 'border-red-500' : 'border-gray-600'
          } bg-gray-700 px-4 py-2 text-white`}
        />
        {errors.name && (
          <span className="text-xs text-red-500">{errors.name.message?.toString()}</span>
        )}
        {!errors.name && successMessages.name && (
          <div className="flex items-center">
            <Icon icon="mdi-check" width={20} height={20} className="text-[#55FCB1]" />
            <span className="text-xs text-[#55FCB1]">{successMessages.name}</span>
          </div>
        )}
      </div>

      {/* 핸드폰 번호 */}
      <div className="flex flex-col space-y-[6px]">
        <label htmlFor="phoneNumber" className="text-sm text-gray-400">
          핸드폰 번호
        </label>
        <input
          id="phoneNumber"
          {...register('phoneNumber')}
          ref={(el) => {
            register('phoneNumber').ref(el);
            inputRefs.current[1] = el;
          }}
          onBlur={() => handleFieldValidation('phoneNumber', 1)}
          placeholder="01012345678"
          className={`rounded-md border ${
            errors.phoneNumber ? 'border-red-500' : 'border-gray-600'
          } bg-gray-700 px-4 py-2 text-white`}
        />
        {errors.phoneNumber && (
          <span className="text-xs text-red-500">{errors.phoneNumber.message?.toString()}</span>
        )}
        {!errors.phoneNumber && successMessages.phoneNumber && (
          <div className="flex items-center space-x-2">
            <span className="text-xs text-green-500">{successMessages.phoneNumber}</span>
            <Icon icon="mdi-check" width={20} height={20} className="text-green-500" />
          </div>
        )}
      </div>

      {/* 아이디 */}
      <div className="flex flex-col space-y-[6px]">
        <label htmlFor="nickname" className="text-sm text-gray-400">
          아이디
        </label>
        <input
          id="nickname"
          {...register('nickname')}
          ref={(el) => {
            register('nickname').ref(el);
            inputRefs.current[2] = el;
          }}
          onBlur={() => handleFieldValidation('nickname', 2)}
          placeholder="아이디"
          className={`rounded-md border ${
            errors.nickname ? 'border-red-500' : 'border-gray-600'
          } bg-gray-700 px-4 py-2 text-white`}
        />
        {errors.nickname && (
          <span className="text-xs text-red-500">{errors.nickname.message?.toString()}</span>
        )}
        {!errors.nickname && successMessages.nickname && (
          <div className="flex items-center">
            <Icon icon="mdi-check" width={20} height={20} className="text-[#55FCB1]" />
            <span className="text-xs text-[#55FCB1]">{successMessages.nickname}</span>
          </div>
        )}
      </div>

      {/* 이메일 */}
      <div className="flex flex-col space-y-[6px]">
        <label htmlFor="email" className="text-sm text-gray-400">
          이메일
        </label>
        <input
          id="email"
          {...register('email')}
          ref={(el) => {
            register('email').ref(el);
            inputRefs.current[3] = el;
          }}
          onBlur={() => handleFieldValidation('email', 3)}
          type="email"
          placeholder="이메일"
          className={`rounded-md border ${
            errors.email ? 'border-red-500' : 'border-gray-600'
          } bg-gray-700 px-4 py-2 text-white`}
        />
        {errors.email && (
          <span className="text-xs text-red-500">{errors.email.message?.toString()}</span>
        )}
        {!errors.email && successMessages.email && (
          <div className="flex items-center">
            <Icon icon="mdi-check" width={20} height={20} className="text-[#55FCB1]" />
            <span className="text-xs text-[#55FCB1]">{successMessages.email}</span>
          </div>
        )}
      </div>

      {/* 비밀번호 */}
      <div className="flex flex-col space-y-[6px]">
        <label htmlFor="password" className="text-sm text-gray-400">
          비밀번호
        </label>
        <div className="relative">
          <input
            id="password"
            {...register('password')}
            ref={(el) => {
              register('password').ref(el);
              inputRefs.current[4] = el;
            }}
            onBlur={() => handleFieldValidation('password', 4)}
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
        {!errors.password && successMessages.password && (
          <div className="flex items-center">
            <Icon icon="mdi-check" width={20} height={20} className="text-[#55FCB1]" />
            <span className="text-xs text-[#55FCB1]">{successMessages.password}</span>
          </div>
        )}
      </div>

      {/* 비밀번호 확인 */}
      <div className="flex flex-col space-y-[6px]">
        <label htmlFor="confirmPassword" className="text-sm text-gray-400">
          비밀번호 확인
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            {...register('confirmPassword')}
            ref={(el) => {
              register('confirmPassword').ref(el);
              inputRefs.current[5] = el;
            }}
            onBlur={() => handleFieldValidation('confirmPassword', 5)}
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
        {!errors.confirmPassword && successMessages.confirmPassword && (
          <div className="flex items-center">
            <Icon icon="mdi-check" width={20} height={20} className="text-[#55FCB1]" />
            <span className="text-xs text-[#55FCB1]">{successMessages.confirmPassword}</span>
          </div>
        )}
      </div>

      {/* 다음 단계 버튼 */}
      <Button onClick={handleNextStep} type="button" className="w-full py-2 mt-4">
        다음 단계
      </Button>
    </div>
  );
};

export default FirstStep;
