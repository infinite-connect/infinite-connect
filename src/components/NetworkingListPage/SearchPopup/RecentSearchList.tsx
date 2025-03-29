import React from 'react';
import { X } from 'lucide-react';
import JobSearchByRole from './JobSearchByRole';

interface RecentSearchListProps {
  items: string[];
  onSelect: (value: string) => void;
  onRemove: (value: string) => void;
  onClear: () => void;
  jobKeyword: string;
  hideJobSearch?: boolean;
}

const RecentSearchList: React.FC<RecentSearchListProps> = ({
  items,
  onSelect,
  onRemove,
  onClear,
  jobKeyword,
  hideJobSearch = false,
}) => {
  return (
    <>
      {!hideJobSearch && <JobSearchByRole jobKeyword={jobKeyword} onSelect={onSelect} />}

      {items.length === 0 ? (
        <div className="py-[20px]">
          <h2 className="text-[var(--text-primary)] text-[16px] font-semibold mb-[72px]">
            최근 검색어
          </h2>
          <p className="text-center font-bold text-[var(--text-tertiary)] mt-12">
            최근 검색어가 없어요
          </p>
        </div>
      ) : (
        <div className="py-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[var(--text-primary)] text-[16px] font-semibold">최근 검색어</h2>
            <button
              onClick={onClear}
              className="text-[var(--text-secondary)] text-[14px] text-muted-foreground hover:underline"
            >
              전체 삭제
            </button>
          </div>
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item} className="flex justify-between items-center">
                <button
                  onClick={() => onSelect(item)}
                  className="text-[var(--text-primary)] font-bold"
                >
                  {item}
                </button>
                <button onClick={() => onRemove(item)} className="text-[var(--text-secondary)]">
                  <X size={16} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default RecentSearchList;
