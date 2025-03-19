import { z } from 'zod';

export const schema = z
  .object({
    name: z
      .string({
        required_error: '이름을 입력해주세요.',
        invalid_type_error: '이름은 문자열이어야 합니다.',
      })
      .min(1, { message: '이름은 최소 1자 이상이어야 합니다.' }),

    nickname: z
      .string({
        required_error: '아이디를 입력해주세요.',
      })
      .min(4, { message: '아이디는 최소 4자 이상이어야 합니다' }),
    email: z
      .string({
        required_error: '이메일을 입력해주세요.',
      })
      .email({ message: '유효한 이메일 주소를 입력하세요.' }),
    password: z
      .string({
        required_error: '비밀번호를 입력해주세요.',
      })
      .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' }),
    confirmPassword: z
      .string({
        required_error: '비밀번호 확인을 입력해주세요.',
      })
      .min(8, { message: '비밀번호 확인은 최소 8자 이상이어야 합니다.' }),
    fieldsOfExpertise: z.string().min(1, { message: '직무를 선택하세요.' }),
    subExpertise: z.string().min(1, { message: '세부 직무를 선택하세요.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });
