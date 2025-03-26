import { CardType } from '@components/SelectCardDesignPage/types';
import { CARD_TYPE_IMAGES, CARD_TYPE_OBJ, CARD_TYPE_TEXT } from '@constants/cardType'; // 텍스트 매핑 상수
import { useState, useEffect } from 'react';
import { Mail } from 'lucide-react';
import IconRenderer from './CardIconRenderer';

type TypeCardProps = {
  isActive: boolean; // 활성화 상태
  type: CardType; // 카드 타입
  isExample: boolean;
};

const TypeCard = ({ isActive, type, isExample }: TypeCardProps): React.JSX.Element => {
  const [isFront, setIsFront] = useState<boolean>(true); // 내부적으로 앞뒷면 상태 관리
  const [isFrontVisible, setIsFrontVisible] = useState<boolean>(isActive); // 화면 표시용 앞뒷면 상태
  const [isAnimating, setIsAnimating] = useState<boolean>(false); // 애니메이션 진행 여부

  console.log(isExample);

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
      className={`flex py-[30px] justify-center items-end overflow-visible`} // 95
      style={{
        perspective: '1000px', // 카드의 3D 효과를 위한 원근감 설정
        boxSizing: 'border-box',
        width: '236px',
        height: '400px',
      }}
    >
      <div
        className={`rounded-3xl relative ${
          isActive ? 'scale-100' : 'scale-85 opacity-30 pointer-events-none'
        }`}
        style={{
          width: '236px',
          height: '332px',
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
            className="absolute inset-0 w-full h-full flex flex-col items-center justify-end"
            style={{
              backgroundImage: `url(${CARD_TYPE_IMAGES[type].vertical})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backfaceVisibility: isFrontVisible ? 'visible' : 'hidden',
              transform: 'rotateY(0deg)',
              zIndex: isFrontVisible ? 10 : -1, // 앞면이 활성화될 때 z-index를 높게 설정
            }}
          >
            <div
              className="absolute inset-0 top-[60px] left-1/2 w-[220px] h-[220px] flex items-center justify-center"
              style={{
                backgroundImage: `url(${CARD_TYPE_OBJ[type].obj})`,
                transform: 'translate(-50%, -50%) rotateY(0deg)',
                visibility: isFrontVisible ? 'visible' : 'hidden',
              }}
            ></div>
            <div className="relative flex flex-col w-full h-[140px] gap-[18px]">
              <div className="flex flex-col w-full h-[46px] px-[20px] gap-[4vpx]">
                <div className="h-[23px] text-[20px] text-[var(--text-black)] font-bold leading-[22.8px] tracking-[-0.33px]">
                  Product Designer
                </div>
                <div className="h-[19px] flex flex-row text-[14px] text-[var(--text-black)] gap-[4px] leading-[19px]">
                  <div>Eight.kim</div>
                  <div>김에잇</div>
                </div>
              </div>
              <div className="flex flex-col justify-center items-start w-full h-[74px] px-[20px] gap-[6px]">
                <div className="flex flex-row gap-[7.6px]">
                  <Mail className="w-[12px] h-[12px]" />
                  <div className="text-[12px] leading-[13.3px]">eightkim-mail@gmail.com</div>
                </div>
                <div className="flex flex-row gap-[7.6hpx]">
                  <IconRenderer type="none" />
                  <div className="text-[12px] leading-[13.3px]">eightkim-portfolio.com</div>
                </div>
              </div>
            </div>
          </div>

          {/* 뒷면 */}
          <div
            className="absolute inset-0 w-full h-full flex flex-col justify-end items-center text-white"
            style={{
              backgroundImage: `url(${CARD_TYPE_IMAGES[type].vertical})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backfaceVisibility: !isFrontVisible ? 'visible' : 'hidden',
              transform: 'rotateY(180deg)',
              zIndex: isFrontVisible ? -1 : 10,
            }}
          >
            <div className="w-full h-[145px] flex flex-col gap-[14px] text-[var(--text-black)]">
              <div className="flex flex-col h-[53px] pl-[20px] gap-[10px]">
                <div className="text-[14px] leading-[20px]">
                  {CARD_TYPE_TEXT[type].timeRange}를 선호하는 당신은
                </div>
                <div className="text-[20px] font-bold leading-[114%] tracking-[-0.3px]">
                  {CARD_TYPE_TEXT[type].label}
                </div>
              </div>

              <div className="flex w-full h-[78px] justify-center items-center text-[14px] leading-[150%]">
                {CARD_TYPE_TEXT[type].tag}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypeCard;
