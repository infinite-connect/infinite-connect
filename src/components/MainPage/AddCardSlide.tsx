import React from 'react';

interface AddCardSlideProps {
  /** 새 명함 추가 버튼을 눌렀을 때 실행할 함수 */
  onAddCardClick?: () => void;
}

const AddCardSlide: React.FC<AddCardSlideProps> = ({ onAddCardClick }) => {
  return (
    <div className="flex flex-col h-full">
      {/* + 아이콘 영역 */}
      <div className="flex flex-col"></div>
      <h2 className="text-center text-[16px] font-semibold ">새로운 명함을 추가해보세요!</h2>
      <h3 className="text-center text-[12px] font-normal text-[var(--text-secondary)] mb-4">
        다양한 명함으로 더 풍부한 네트워킹을 경험하세요
      </h3>
      <div
        onClick={onAddCardClick}
        className="
          w-full
          h-[180px]
          flex items-center justify-center
          cursor-pointer
        "
        style={{
          borderRadius: '7.713px',
          border: '2px dashed rgba(123, 97, 255, 0.50)',
          background: 'rgba(255, 255, 255, 0.10)',
        }}
      >
        <span className="text-[32px] font-bold text-[#7253FF]">+</span>
      </div>
    </div>
  );
};

export default AddCardSlide;
