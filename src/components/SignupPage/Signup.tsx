import React, { useState } from 'react';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from './signupSchema';
import ThirdStep from './ThirdStep';

type SignupData = z.infer<typeof schema>;

const SignupForm = (): React.JSX.Element => {
  const [step, setStep] = useState<number>(1);
  const methods = useForm<SignupData>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
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
    <div>
      <div className="min-h-[32px] text-white bg-[#121212] px-[20px] py-[12px]">SignUp</div>
      <div className="relative flex flex-col justify-start min-h-screen bg-[#121212] px-6 pt-7.5">
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
          {step === 3 && <ThirdStep />}
        </FormProvider>
      </div>
    </div>
  );
};

export default SignupForm;
