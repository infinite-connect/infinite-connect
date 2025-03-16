import React from 'react';
import { useFormContext } from 'react-hook-form';
import { z } from 'zod';
import { schema } from './signupSchema';
import { supabase } from '@utils/supabaseClient';

type SignupData = z.infer<typeof schema>; // 타입 추출

interface ThirdStepProps {
  prevStep: () => void;
}

const ThirdStep: React.FC<ThirdStepProps> = ({ prevStep }) => {
  const { getValues, handleSubmit } = useFormContext<SignupData>();

  // 회원가입 완료 핸들러
  const onSubmit = async (formData: SignupData) => {
    try {
      // 1. Supabase Auth로 회원가입
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            userId: formData.userId,
          },
        },
      });

      if (authError) {
        console.error('Auth Error:', authError.message);
        alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
        return;
      }

      // 2. `auth.users` → `public.users` 데이터 복사는 트리거로 자동 처리
      const userId = authData.user?.id; // Supabase Auth에서 생성된 사용자 ID 가져오기

      if (!userId) {
        console.error('User ID not found after Auth signup.');
        alert('사용자 ID를 가져오는 데 실패했습니다.');
        return;
      }

      // 3. 명함 생성은 트리거로 자동 처리되므로, 직무 및 세부 직무 추가
      const { data: businessCardData, error: businessCardFetchError } = await supabase
        .from('business_cards')
        .select('business_card_id')
        .eq('user_id', userId)
        .single();

      if (businessCardFetchError || !businessCardData) {
        console.error('Business Card Fetch Error:', businessCardFetchError?.message);
        alert('명함 데이터를 가져오는 중 오류가 발생했습니다.');
        return;
      }

      const businessCardId = businessCardData.business_card_id;

      // 4. 직무 및 세부 직무 업데이트
      const { error: updateError } = await supabase
        .from('business_cards')
        .update({
          fields_of_expertise: formData.fieldsOfExpertise,
          sub_expertise: formData.subExpertise,
        })
        .eq('business_card_id', businessCardId);

      if (updateError) {
        console.error('Business Card Update Error:', updateError.message);
        alert('명함 정보를 업데이트하는 중 오류가 발생했습니다.');
        return;
      }

      alert('회원가입이 완료되었습니다!');
    } catch (error) {
      console.error('Unexpected Error:', error);
      alert('회원가입 처리 중 예상치 못한 오류가 발생했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-lg text-white">입력된 정보가 맞나요?</h2>
      <p className="text-sm text-gray-300">이름: {getValues('name')}</p>
      <p className="text-sm text-gray-300">아이디: {getValues('userId')}</p>
      <p className="text-sm text-gray-300">이메일: {getValues('email')}</p>
      <p className="text-sm text-gray-300">직무: {getValues('fieldsOfExpertise')}</p>
      <p className="text-sm text-gray-300">세부 직무: {getValues('subExpertise')}</p>

      {/* 이전 및 등록 완료 버튼 */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-md"
        >
          이전 단계
        </button>
        <button
          type="submit"
          className="py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md"
        >
          등록 완료
        </button>
      </div>
    </form>
  );
};

export default ThirdStep;
