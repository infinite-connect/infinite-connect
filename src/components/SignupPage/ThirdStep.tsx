import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { supabase } from '@utils/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '@features/User/slice/userSlice';
import { useDispatch } from 'react-redux';

const ThirdStep: React.FC = () => {
  const { getValues } = useFormContext(); // react-hook-form에서 폼 데이터 가져오기
  const [isChecking, setIsChecking] = useState(false); // 이메일 인증 상태 확인 중 여부
  const [isVerified, setIsVerified] = useState(false); // 이메일 인증 여부
  const [businessCardId, setBusinessCardId] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkEmailVerification = async () => {
    setIsChecking(true);

    try {
      // 폼 데이터에서 이메일과 비밀번호 가져오기
      const email = getValues('email');
      const password = getValues('password');

      if (!email || !password) {
        alert('이메일 또는 비밀번호 정보가 없습니다. 다시 시도해주세요.');
        setIsChecking(false);
        return;
      }

      // Supabase Auth로 로그인 시도
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError || !authData.user) {
        console.error('로그인 중 오류 발생:', authError?.message);
        alert('이메일 인증이 완료되지 않았거나 로그인에 실패했습니다. 이메일을 확인해주세요.');
        setIsChecking(false);
        return;
      }

      // 이메일 인증 여부 확인
      if (authData.user.email_confirmed_at) {
        setIsVerified(true);
        alert('이메일 인증이 완료되었습니다!');

        // 명함 데이터 가져오기
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

        // Redux 상태 업데이트 (loginSuccess 호출)
        dispatch(
          loginSuccess({
            id: authData.user.id,
            email: authData.user.email ?? '',
            nickname: getValues('nickname'),
            name: authData.user.user_metadata?.name || '', // Supabase 사용자 메타데이터 활용
          }),
        );
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

  const handleNext = () => {
    if (!isVerified) {
      alert('이메일 인증이 완료되지 않았습니다. 이메일을 확인해주세요.');
      return;
    }

    navigate('/selectcarddesign', { state: { businessCardId } });
  };

  return (
    <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center text-white mb-6">이메일 인증</h1>
      <p className="text-sm text-gray-300 mb-6 text-center">
        회원가입 시 입력한 이메일로 인증 메일이 발송되었습니다.
        <br />
        이메일을 확인하고 아래 버튼을 눌러주세요.
      </p>

      {/* 인증 확인 버튼 */}
      <button
        onClick={checkEmailVerification}
        disabled={isChecking}
        className={`w-full py-2 px-4 mb-4 ${
          isChecking ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'
        } text-white font-medium rounded-md`}
      >
        {isChecking ? '확인 중...' : '인증 확인'}
      </button>

      {/* 다음 단계로 이동 버튼 */}
      <button
        onClick={handleNext}
        disabled={!isVerified}
        className={`w-full py-2 px-4 mb-4 ${
          isVerified ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600'
        } text-white font-medium rounded-md`}
      >
        카드 디자인 선택으로 이동
      </button>
    </div>
  );
};

export default ThirdStep;
