import React, { useState } from 'react';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import { Progress } from '@components/ui/progress';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import ThirdStep from './ThirdStep';
import { schema } from './signupSchema';
import FourthStep from './FourthStep';

type SignupData = z.infer<typeof schema>;

const SignupForm = (): React.JSX.Element => {
  const [step, setStep] = useState<number>(1);
  const methods = useForm<SignupData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      nickname: '',
      email: '',
      password: '',
      confirmPassword: '',
      fieldsOfExpertise: '',
      subExpertise: '',
    },
  });

  const fieldsOfExpertise = [
    'Development',
    'Design',
    'PM / 기획',
    'Data & AI',
    'Operation & Others',
  ];
  const subExpertise = {
    Development: ['Frontend Developer', 'Backend Developer', 'Fullstack Developer'],
    Design: ['UI/UX Designer', 'Graphic Designer'],
    'PM / 기획': ['Project Manager', 'Product Owner'],
    'Data & AI': ['Data Scientist', 'AI Engineer'],
    'Operation & Others': ['HR Manager', 'Finance Specialist'],
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-white mb-6">회원가입</h1>
        {step !== 4 && <Progress value={(step / 3) * 100} />}

        <FormProvider {...methods}>
          {step === 1 && <FirstStep nextStep={nextStep} />}
          {step === 2 && (
            <SecondStep
              fieldsOfExpertise={fieldsOfExpertise}
              subExpertise={subExpertise}
              prevStep={prevStep}
              nextStep={nextStep}
            />
          )}
          {step === 3 && <ThirdStep prevStep={prevStep} nextStep={nextStep} />}
          {step === 4 && <FourthStep />}
        </FormProvider>
      </div>
    </div>
  );
};

export default SignupForm;
