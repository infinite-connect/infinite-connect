import { supabase } from '@utils/supabaseClient';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { z } from 'zod';
import { schema } from './signupSchema';

type SignupData = z.infer<typeof schema>;

interface SecondStepProps {
  fieldsOfExpertise: string[];
  subExpertise: Record<string, string[]>;
  prevStep: () => void;
  nextStep: () => void;
}

const SecondStep: React.FC<SecondStepProps> = ({
  fieldsOfExpertise,
  subExpertise,
  prevStep,
  nextStep,
}) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useFormContext<SignupData>();

  const selectedField = watch('fieldsOfExpertise');
  const isNextEnabled = !!watch('subExpertise');

  const onSubmit = async (formData: SignupData) => {
    try {
      // Supabase Auth로 회원가입
      const { error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            nickname: formData.nickname,
          },
        },
      });

      if (authError) {
        console.error('Auth Error:', authError.message);
        alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
        return;
      }

      // 명함 생성은 트리거로 자동 처리되므로, 직무 및 세부 직무 추가
      const { data: businessCardData, error: businessCardFetchError } = await supabase
        .from('business_cards')
        .select('business_card_id')
        .eq('nickname', formData.nickname)
        .single();

      if (businessCardFetchError || !businessCardData) {
        console.error('Business Card Fetch Error:', businessCardFetchError?.message);
        alert('명함 데이터를 가져오는 중 오류가 발생했습니다.');
        return;
      }

      const businessCardId = businessCardData.business_card_id;

      // 직무 및 세부 직무 업데이트
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

      alert('회원가입이 완료되었습니다! 이메일 인증을 진행해주세요.');
      nextStep();
    } catch (error) {
      console.error('Unexpected Error:', error);
      alert('회원가입 처리 중 예상치 못한 오류가 발생했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-lg text-white">직무 선택</h2>

      {/* 첫 번째 드롭다운 */}
      <div className="flex flex-col">
        <label htmlFor="fieldsOfExpertise" className="text-sm text-gray-400">
          직무
        </label>
        <select
          {...register('fieldsOfExpertise')}
          id="fieldsOfExpertise"
          className={`w-full rounded-md border ${
            errors.fieldsOfExpertise ? 'border-red-500' : 'border-gray-600'
          } bg-gray-700 px-4 py-2 text-white`}
        >
          <option value="">직무를 선택하세요</option>
          {fieldsOfExpertise.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* 두 번째 드롭다운 */}
      <div className="flex flex-col">
        <label htmlFor="subExpertise" className="text-sm text-gray-400">
          세부 직무
        </label>
        <select
          {...register('subExpertise')}
          id="subExpertise"
          disabled={!selectedField}
          className={`w-full rounded-md border ${
            selectedField
              ? errors.subExpertise
                ? 'border-red-500'
                : 'border-gray-600'
              : 'border-gray-500 cursor-not-allowed'
          } ${selectedField ? 'bg-gray-700' : 'bg-gray-800'} px-4 py-2 text-white`}
        >
          <option value="">세부 직무를 선택하세요</option>
          {selectedField &&
            subExpertise[selectedField]?.map((job) => (
              <option key={job} value={job}>
                {job}
              </option>
            ))}
        </select>
      </div>

      {/* 이전 및 등록 완료 버튼 */}
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          type="button"
          className="py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-md"
        >
          이전 단계
        </button>
        <button
          type="submit"
          disabled={!isNextEnabled}
          className={`py-2 px-4 ${
            isNextEnabled ? 'bg-green-600 hover:bg-green-700' : 'bg-green-400 cursor-not-allowed'
          } text-white font-medium rounded-md`}
        >
          회원가입 완료
        </button>
      </div>
    </form>
  );
};

export default SecondStep;
