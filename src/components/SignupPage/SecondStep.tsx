import React from 'react';
import { useFormContext } from 'react-hook-form';

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
    formState: { errors },
  } = useFormContext();

  const selectedField = watch('fieldsOfExpertise');
  const isNextEnabled = !!watch('subExpertise');

  return (
    <div className="space-y-4">
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

      {/* 이전 및 다음 버튼 */}
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          type="button"
          className="py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-md"
        >
          이전 단계
        </button>
        <button
          onClick={nextStep}
          type="button"
          disabled={!isNextEnabled}
          className={`py-2 px-4 ${
            isNextEnabled ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-400 cursor-not-allowed'
          } text-white font-medium rounded-md`}
        >
          다음 단계
        </button>
      </div>
    </div>
  );
};

export default SecondStep;
