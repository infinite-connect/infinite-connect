const EmptyCard = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-[6px]">
      <div>
        <p className="text-[var(--text-secondary)] font-bold text-[16px]">
          아직 명함을 공유한 사람이 없어요
        </p>
        <p className="text-[var(--text-tertiary)] font-bold text-[14px]">
          새로운 사람과 지금 연결해 보세요!✨
        </p>
      </div>
    </div>
  );
};

export default EmptyCard;
