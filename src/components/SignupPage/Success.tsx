import { Button } from '@components/commons/Button/Button';
import { useNavigate } from 'react-router-dom';
import SuccessBg from '@assets/Signup/Success.png';
import { Header } from '@components/commons/Header/Header';
import { Logo } from '@components/commons/Header/Logo';

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="relative  bg-[#0C0C0D] font-[NanumGothic]">
      <Header className="pl-[4px]">
        <Header.Left>
          <Logo />
          <div> Sign up</div>
        </Header.Left>
      </Header>
      <div
        className="flex flex-col  min-h-screen px-6 pt-20 pb-10 bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${SuccessBg})`, backgroundSize: '100% auto' }}
      >
        <div className="flex-1 flex flex-col justify-center items-center  text-center text-[var(--text-primary)]">
          {/* 상단 text */}
          <div>
            <h1 className="text-[28px] font-semibold leading-tight">
              에잇님
              <br />
              환영합니다
            </h1>
          </div>
          {/* 하단 text */}
          <div className="mt-[105px]">
            <p className="text-sm leading-relaxed text-white/80 mb-10">
              에잇님의 명함을 공유하고 컨퍼런스 참석자들과
              <br />
              즐거운 네트워킹 시간을 보내보세요!
            </p>
          </div>
        </div>

        {/* button */}
        <Button
          className="w-full max-w-sm mx-auto h-[52px] mt-[120px]"
          onClick={() => navigate('/selectcarddesign')}
        >
          나의 네트워킹 성향 선택하기
        </Button>
      </div>
    </div>
  );
};

export default Success;
