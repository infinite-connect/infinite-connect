const EmptyState = () => {
  return (
    <div className="flex justify-center items-center h-full text-center space-y-[6px]">
      <div>
        <p className="text-[var(--text-primary)] font-bold text-[16px]">검색 결과가 없어요</p>
        <p className="text-[var(--text-tertiary)] font-bold text-[14px]">
          다른 검색어로 검색해 보세요.
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
