import React, { useState } from 'react';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from './signupSchema';
import ThirdStep from './ThirdStep';
import { fieldsOfExpertise, subExpertise } from '@constants/expertiseConstants';

type SignupData = z.infer<typeof schema>;

const SignupForm = (): React.JSX.Element => {
  const [step, setStep] = useState<number>(1);
  const [newCardId, setNewCardId] = useState('');
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
