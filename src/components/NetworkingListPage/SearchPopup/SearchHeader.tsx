import { CloseButton } from '@components/commons/Button/CloseButton';
import { Input } from '@components/Input/input';
import { ChevronLeft, Search } from 'lucide-react';
import React from 'react';

interface SearchHeaderProps {
  query: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  onClose: () => void;
  onReset?: () => void;
  showChevron?: boolean;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({
  query,
  onChange,
  onSearch,
  onClose,
  onReset,
  showChevron = true,
}) => {
  return (
    <div className="flex items-center gap-2 pt-[18px]">
      {showChevron && (
        <button onClick={onClose}>
          <ChevronLeft className="stroke-[var(--fill-white)]" size={24} />
        </button>
      )}
      <div className="relative flex-1">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 stroke-[var(--fill-white)]"
          size={16}
        />
        <Input
          value={query}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          placeholder="회사명, 이름 등으로 명함을 검색하세요!"
          className="bg-[var(--fill-secondary)] pl-9 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        {query && (
          <CloseButton
            onClick={onReset ? onReset : () => onChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          />
        )}
      </div>
    </div>
  );
};

export default SearchHeader;
