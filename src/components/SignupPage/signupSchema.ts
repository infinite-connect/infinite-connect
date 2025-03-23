import { z } from 'zod';

export const schema = z
  .object({
    name: z
      .string({
        required_error: '이름을 입력해주세요',
        invalid_type_error: '이름은 문자열이어야 합니다',
      })
      .min(1, { message: '이름은 최소 1자 이상이어야 합니다' })
      .regex(/^[a-zA-Z가-힣]+$/, {
        message: '이름은 영문 또는 한글만 입력 가능합니다',
      }),
    phoneNumber: z
      .string({
        required_error: '핸드폰 번호를 입력해주세요',
      })
      .regex(/^01[016789]-?\d{3,4}-?\d{4}$/, {
        message: '유효한 핸드폰 번호를 입력해주세요 ex) 01012345678',
      })
      .transform((value) => {
        // '-'가 없는 경우 자동으로 추가
        const formatted = value.replace(/-/g, '').replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3');
        return formatted;
      })
      .refine(
        (value) => {
          // '-' 제거 후 길이 검사
          const digitsOnly = value.replace(/-/g, '');
          return digitsOnly.length === 11 && digitsOnly.startsWith('010');
        },
        {
          message: '핸드폰 번호는 "010"을 제외하고 정확히 8자리여야 합니다',
        },
      ),
    nickname: z
      .string({
        required_error: '아이디를 입력해주세요',
      })
      .min(5, { message: '아이디는 최소 5자 이상이어야 합니다' })
      .max(20, { message: '아이디는 최대 20자 이하여야 합니다' })
      .regex(/^[a-z0-9_-]+$/, {
        message: '아이디는 영문 소문자, 숫자, 밑줄(_), 하이픈(-)만 가능합니다',
      }),
    email: z
      .string({
        required_error: '이메일을 입력해주세요',
      })
      .email({ message: '유효한 이메일 주소를 입력하세요' }),
    password: z
      .string({
        required_error: '비밀번호를 입력해주세요',
      })
      .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다' }),
    confirmPassword: z
      .string({
        required_error: '비밀번호 확인을 입력해주세요',
      })
      .min(8, { message: '비밀번호 확인은 최소 8자 이상이어야 합니다' }),
    fieldsOfExpertise: z.string().min(1, { message: '직무를 선택하세요' }),
    subExpertise: z.string().min(1, { message: '세부 직무를 선택하세요' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  });
