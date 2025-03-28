import { Button } from '@components/commons/Button/Button';
import { useNavigate } from 'react-router-dom';
import SuccessBg from '@assets/Signup/Success.png';
import { Header } from '@components/commons/Header/Header';
import { Logo } from '@components/commons/Header/Logo';

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-[#0C0C0D] font-[NanumGothic]  ">
      {/* 헤더 */}
      <Header className="pl-[20px]">
        <Header.Left>
          <Logo />
          <div> Sign up</div>
        </Header.Left>
      </Header>

      {/* 본문 */}
      <div
        className="flex flex-col flex-1 bg-no-repeat bg-cover bg-center px-6"
        style={{
          backgroundImage: `url(${SuccessBg})`,
          backgroundSize: '100% auto',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center -40px',
        }}
      >
        {/* 중앙 텍스트 영역 */}
        <div className="flex flex-1 flex-col items-center justify-center text-center text-[var(--text-primary)]">
          <h1 className="text-[28px] font-semibold leading-tight mb-6">
            에잇님
            <br />
            환영합니다
          </h1>
          <p className="mt-[135px] text-[14px] text-sm leading-relaxed text-white/80">
            에잇님의 명함을 공유하고 컨퍼런스 참석자들과
            <br />
            즐거운 네트워킹 시간을 보내보세요!
          </p>
        </div>

        {/* 하단 버튼 영역 */}
        <div className="w-full max-w-sm mx-auto pb-10">
          <Button className="w-full h-[52px]" onClick={() => navigate('/selectcarddesign')}>
            나의 네트워킹 성향 선택하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Success;
