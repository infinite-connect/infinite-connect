import { useState, useEffect } from 'react';

type TypeCardProps = {
  isActive: boolean; // 활성화 상태
  frontImage: string; // 앞면 이미지 경로
  backImage: string; // 뒷면 이미지 경로
};

const TypeCard = ({ isActive, frontImage, backImage }: TypeCardProps) => {
  const [isFront, setIsFront] = useState<boolean>(true); // 내부적으로 앞뒷면 상태 관리
  const [isFrontVisible, setIsFrontVisible] = useState<boolean>(isActive); // 화면 표시용 앞뒷면 상태
  const [isAnimating, setIsAnimating] = useState<boolean>(false); // 애니메이션 진행 여부

  const handleFlip = () => {
    if (!isActive || isAnimating) return; // 비활성화된 카드나 애니메이션 중인 카드는 클릭 불가

    setIsAnimating(true); // 애니메이션 시작
    setIsFront((prev) => !prev); // 내부적으로 앞뒷면 상태 전환

    // 애니메이션 중간(카드가 선으로 보이는 지점)에서 화면 표시용 상태 전환
    setTimeout(() => {
      setIsFrontVisible((prev) => !prev);
    }, 429);

    // 애니메이션 종료 시 클릭 가능 상태 복구
    setTimeout(() => {
      setIsAnimating(false);
    }, 1300); // 애니메이션 전체 시간과 동일하게 설정
  };

  useEffect(() => {
    if (!isActive) {
      setIsFront(false); // 비활성화 시 내부적으로 뒷면으로 설정
      setIsFrontVisible(false); // 화면 표시용 상태도 뒷면으로 설정
    } else {
      // 활성화된 카드가 뒷면에서 앞면으로 바뀌도록 애니메이션 처리
      setTimeout(() => {
        setIsFront(true); // 내부적으로 앞면으로 설정
        setTimeout(() => {
          setIsFrontVisible(true); // 화면 표시용 상태도 앞면으로 설정
        }, 429); // 애니메이션 중간에 화면 표시용 상태 변경
      }, 0); // 즉시 실행하여 자연스러운 전환 처리
    }
  }, [isActive]);

  return (
    <div
      onClick={handleFlip}
      className={`flex justify-center items-center w-full h-[160mm] overflow-visible`} // 부모 컨테이너에 overflow-visible 추가
      style={{
        perspective: '1000px', // 카드의 3D 효과를 위한 원근감 설정
        boxSizing: 'border-box',
      }}
    >
      <div
        className={`w-[80mm] h-[128mm] rounded-3xl relative ${
          isActive ? 'scale-100' : 'scale-90 opacity-70 pointer-events-none'
        }`}
        style={{
          overflow: 'visible', // 카드 요소에도 overflow-visible 추가
          transformStyle: 'preserve-3d', // 3D 회전 유지
          transformOrigin: 'center center', // 회전 중심을 중앙으로 설정
        }}
      >
        {/* 카드 앞뒷면 */}
        <div
          className="absolute inset-0 w-full h-full transition-transform duration-1300"
          style={{
            transform: isFront ? 'rotateY(0deg)' : 'rotateY(180deg)', // 내부 상태에 따라 회전 애니메이션 실행
          }}
        >
          {/* 앞면 */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backfaceVisibility: isFrontVisible ? 'visible' : 'hidden', // 화면 표시용 상태에 따라 보임/숨김 처리
              transform: 'rotateY(0deg)', // 앞면은 기본 상태 유지
            }}
          >
            <img
              src={frontImage}
              alt="Front Side"
              className="w-full h-full object-cover rounded-3xl"
            />
          </div>

          {/* 뒷면 */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backfaceVisibility: !isFrontVisible ? 'visible' : 'hidden', // 화면 표시용 상태에 따라 보임/숨김 처리
              transform: 'rotateY(180deg)', // 뒷면은 반대 방향으로 배치
            }}
          >
            <img
              src={backImage}
              alt="Back Side"
              className="w-full h-full object-cover rounded-3xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypeCard;
