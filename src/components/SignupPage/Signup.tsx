import React, { useState } from 'react';
import { Progress } from '@components/ui/progress';

const SignupForm = (): React.JSX.Element => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    jobCategory: '',
    specificJob: '',
  });

  const jobCategories = [
    'Development',
    'Design',
    'PM / 기획',
    'Data & AI',
    'Operation & Others',
  ] as const;

  const specificJobs: Record<(typeof jobCategories)[number], string[]> = {
    Development: ['Frontend Developer', 'Backend Developer', 'Fullstack Developer'],
    Design: ['UI/UX Designer', 'Graphic Designer'],
    'PM / 기획': ['Project Manager', 'Product Owner'],
    'Data & AI': ['Data Scientist', 'AI Engineer'],
    'Operation & Others': ['HR Manager', 'Finance Specialist'],
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        {/* 헤더 */}
        <h1 className="text-2xl font-bold text-center text-white mb-6">회원가입</h1>

        {/* 진행 상태 표시 */}
        <Progress value={(step / 3) * 100} className="mb-6" />

        {/* 단계별 폼 */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg text-white">기본 정보 입력</h2>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="이름"
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="이메일"
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호"
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white"
            />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="비밀번호 확인"
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white"
            />
            <button
              onClick={nextStep}
              disabled={
                !formData.name ||
                !formData.email ||
                !formData.password ||
                formData.password !== formData.confirmPassword
              }
              className={`w-full py-2 mt-4 ${
                formData.name &&
                formData.email &&
                formData.password &&
                formData.password === formData.confirmPassword
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-blue-400 cursor-not-allowed'
              } text-white font-medium rounded-md`}
            >
              다음 단계
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg text-white">직무 선택</h2>
            {/* 첫 번째 드롭다운 */}
            <select
              name="jobCategory"
              value={formData.jobCategory}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white"
            >
              <option value="">직무를 선택하세요</option>
              {jobCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* 두 번째 드롭다운 (첫 번째 선택 후 활성화) */}
            <select
              name="specificJob"
              value={formData.specificJob}
              onChange={handleChange}
              disabled={!formData.jobCategory} // 첫 번째 드롭다운 선택 여부에 따라 활성화
              className={`w-full rounded-md border ${
                formData.jobCategory
                  ? 'border-gray-600 bg-gray-700'
                  : 'border-gray-500 bg-gray-800 cursor-not-allowed'
              } px-4 py-2 text-white`}
            >
              <option value="">세부 직무를 선택하세요</option>
              {formData.jobCategory &&
                specificJobs[formData.jobCategory as keyof typeof specificJobs].map((job) => (
                  <option key={job} value={job}>
                    {job}
                  </option>
                ))}
            </select>

            {/* 이전 및 다음 단계 버튼 */}
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-md"
              >
                이전 단계
              </button>
              <button
                onClick={nextStep}
                disabled={!formData.specificJob} // 세부 직무가 선택되지 않으면 비활성화
                className={`py-2 px-4 ${
                  formData.specificJob
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-blue-400 cursor-not-allowed'
                } text-white font-medium rounded-md`}
              >
                다음 단계
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-lg text-white">입력된 정보가 맞나요?</h2>
            <p className="text-sm text-gray-300">이름: {formData.name}</p>
            <p className="text-sm text-gray-300">이메일: {formData.email}</p>
            <p className="text-sm text-gray-300">직무: {formData.jobCategory}</p>
            <p className="text-sm text-gray-300">세부 직무: {formData.specificJob}</p>

            {/* 이전 및 등록 완료 버튼 */}
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-md"
              >
                재확인
              </button>
              <button
                onClick={() => alert('회원가입 완료!')}
                className={`py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md`}
              >
                등록 완료
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupForm;
