import React, { useState } from 'react';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from './signupSchema';
import ThirdStep from './ThirdStep';
import { fieldsOfExpertise, subExpertise } from '@constants/expertiseConstants';
import { Header } from '@components/commons/Header/Header';
import { Logo } from '@components/commons/Header/Logo';

type SignupData = z.infer<typeof schema>;

const SignupForm = (): React.JSX.Element => {
  const [step, setStep] = useState<number>(1);
  const methods = useForm<SignupData>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      phoneNumber: '',
      nickname: '',
      email: '',
      password: '',
      confirmPassword: '',
      fieldsOfExpertise: '',
      subExpertise: '',
    },
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="bg-[var(--bg-default-black)] px-6 font-[NanumGothic]">
      <div>
        <Header className="pl-[4px]">
          <Header.Left>
            <Logo />
            <div> Sign up</div>
          </Header.Left>
        </Header>
        <div className="relative flex flex-col justify-start min-h-screen  pt-7.5">
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
    </div>
  );
};

export default SignupForm;
