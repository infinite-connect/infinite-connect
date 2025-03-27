import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { supabase } from '@utils/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '@features/User/slice/userSlice';
import { useDispatch } from 'react-redux';
import { Button } from '@components/commons/Button/Button';

const ThirdStep: React.FC = () => {
  const { getValues } = useFormContext();
  const [isChecking, setIsChecking] = useState(false);
  const [, setBusinessCardId] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkEmailVerification = async () => {
    setIsChecking(true);

    try {
      const email = getValues('email');
      const password = getValues('password');

      if (!email || !password) {
        alert('이메일 또는 비밀번호 정보가 없습니다. 다시 시도해주세요.');
        return;
      }

      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError || !authData.user) {
        console.error('로그인 중 오류 발생:', authError?.message);
        alert('이메일 인증이 완료되지 않았거나 로그인에 실패했습니다. 이메일을 확인해주세요.');
        return;
      }

      if (authData.user.email_confirmed_at) {
        alert('이메일 인증이 완료되었습니다!');

        const { data: businessCardData, error: fetchError } = await supabase
          .from('business_cards')
          .select('business_card_id')
          .eq('nickname', getValues('nickname'))
          .single();

        if (fetchError || !businessCardData) {
          console.error('Business Card Fetch Error:', fetchError?.message);
          alert('명함 데이터를 가져오는 중 오류가 발생했습니다.');
          return;
        }

        setBusinessCardId(businessCardData.business_card_id);

        dispatch(
          loginSuccess({
            id: authData.user.id,
            email: authData.user.email ?? '',
            nickname: getValues('nickname'),
            name: authData.user.user_metadata?.name || '',
          }),
        );

        navigate('/인증완료', { state: { businessCardId: businessCardData.business_card_id } });
      } else {
        alert('이메일 인증이 아직 완료되지 않았습니다. 이메일을 확인해주세요.');
      }
    } catch (error) {
      console.error('Unexpected Error:', error);
      alert('이메일 인증 상태를 확인하는 중 오류가 발생했습니다.');
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <div className="w-full max-w-md">
        <div className="px-6 py-[30px]">
          <h1 className="text-2xl font-bold text-center text-white mb-[20px]">이메일 인증</h1>
          <p className="text-sm text-gray-300 text-center">
            회원가입 시 입력한 이메일로 인증 메일이 발송되었습니다.
            <br />
            이메일을 확인하고 아래 버튼을 눌러주세요.
          </p>
        </div>

        <Button onClick={checkEmailVerification} disabled={isChecking} className="w-full mt-4 ">
          {isChecking ? '확인 중...' : '인증 확인'}
        </Button>
      </div>
    </div>
  );
};

export default ThirdStep;
