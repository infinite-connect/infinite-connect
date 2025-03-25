import { CardType } from '@components/SelectCardDesignPage/types';
import { CARD_TYPE_IMAGES, CARD_TYPE_TEXT } from '@constants/cardType'; // 텍스트 매핑 상수
import { useState, useEffect } from 'react';

type TypeCardProps = {
  isActive: boolean; // 활성화 상태
  type: CardType; // 카드 타입
};

const TypeCard = ({ isActive, type }: TypeCardProps): React.JSX.Element => {
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
      setIsAnimating(true); // 애니메이션 시작 (isActive 변경 시)
      setIsFront(false); // 비활성화 시 내부적으로 뒷면으로 설정
      setTimeout(() => {
        setIsFrontVisible(false); // 화면 표시용 상태도 뒷면으로 설정
      }, 429);
      setTimeout(() => {
        setIsAnimating(false); // 애니메이션 종료 시 클릭 가능 복구
      }, 1300);
    } else {
      setIsAnimating(true); // 애니메이션 시작 (isActive 변경 시)
      // 활성화된 카드가 뒷면에서 앞면으로 바뀌도록 애니메이션 처리
      setTimeout(() => {
        setIsFront(true); // 내부적으로 앞면으로 설정
        setTimeout(() => {
          setIsFrontVisible(true); // 화면 표시용 상태도 앞면으로 설정
        }, 429);
        setTimeout(() => {
          setIsAnimating(false); // 애니메이션 종료 시 클릭 가능 복구
        }, 1300);
      }, 0);
    }
  }, [isActive]);

  return (
    <div
      onClick={handleFlip}
      className={`flex justify-center items-center overflow-visible`} // 부모 컨테이너에 overflow-visible 추가
      style={{
        perspective: '1000px', // 카드의 3D 효과를 위한 원근감 설정
        boxSizing: 'border-box',
        width: '248px',
        height: '400px',
      }}
    >
      <div
        className={`rounded-3xl relative ${
          isActive ? 'scale-100' : 'scale-85 opacity-30 pointer-events-none'
        }`}
        style={{
          width: '248px',
          height: '350px',
          overflow: 'visible', // 카드 요소에도 overflow-visible 추가
          transformStyle: 'preserve-3d', // 3D 회전 유지
          transformOrigin: 'center center', // 회전 중심을 중앙으로 설정
          borderRadius: '20px',
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
            className="absolute inset-0 w-full h-full flex items-center justify-center"
            style={{
              backgroundImage: `url(${CARD_TYPE_IMAGES[type].vertical})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backfaceVisibility: isFrontVisible ? 'visible' : 'hidden',
              transform: 'rotateY(0deg)',
              zIndex: isFrontVisible ? 10 : -1, // 앞면이 활성화될 때 z-index를 높게 설정
            }}
          >
            <h1 className="text-2xl font-bold text-[var(--text-black)]">
              {CARD_TYPE_TEXT[type].label}
            </h1>
          </div>

          {/* 뒷면 */}
          <div
            className="absolute inset-0 w-full h-full flex flex-col justify-center items-center text-white rounded-3xl"
            style={{
              backgroundImage: `url(${CARD_TYPE_IMAGES[type].vertical})`, // 뒷면 배경 이미지 설정
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backfaceVisibility: !isFrontVisible ? 'visible' : 'hidden',
              transform: 'rotateY(180deg)',
              zIndex: isFrontVisible ? -1 : 10,
            }}
          >
            <h1 className="text-2xl font-bold text-[var(--text-black)]">
              {CARD_TYPE_TEXT[type].label}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypeCard;
