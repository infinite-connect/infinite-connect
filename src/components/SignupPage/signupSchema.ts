import { z } from 'zod';

export const schema = z
  .object({
    name: z.string().min(1, { message: '이름은 필수입니다.' }),
    nickname: z
      .string()
      .min(4, { message: '아이디는 최소 4자 이상이어야 합니다' })
      .max(20, { message: '아이디는 최대 20자까지 가능합니다' })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: '아이디는 영문, 숫자, 언더스코어(_)만 사용 가능합니다',
      }),
    email: z.string().email({ message: '유효한 이메일 주소를 입력하세요.' }),
    password: z
      .string()
      .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: '비밀번호에 최소 1개의 특수문자가 포함되어야 합니다.',
      }),
    confirmPassword: z.string().min(8, { message: '비밀번호 확인은 최소 8자 이상이어야 합니다.' }),
    fieldsOfExpertise: z.string().min(1, { message: '직무를 선택하세요.' }),
    subExpertise: z.string().min(1, { message: '세부 직무를 선택하세요.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });
