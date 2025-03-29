import React, { useState } from 'react';
import SearchHeader from './SearchHeader';
import EmptyState from './EmptyState';
import RecentSearchList from './RecentSearchList';
import SearchResultList from './SearchResultList';
import { useRecentSearches } from './useRecentSearches';

interface SearchPopupProps {
  onClose: () => void;
}

const SearchPopup: React.FC<SearchPopupProps> = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState<string[]>([]); // 임시로 string[]

  const { recentSearches, addSearch, removeSearch, clearSearches } = useRecentSearches();

  const handleSearch = (q: string) => {
    if (!q.trim()) return;
    setHasSearched(true);
    addSearch(q);
    setQuery(q);

    // TODO: 검색 결과 로직 추가
    const fakeResults = q.toLowerCase() === 'anna' ? new Array(4).fill('Anna') : [];
    setResults(fakeResults);
  };

  const handleReset = () => {
    setQuery('');
    setHasSearched(false);
    setResults([]);
  };

  return (
    <div className="w-full h-full px-4 pb-8 overflow-y-auto">
      <SearchHeader
        query={query}
        onChange={setQuery}
        onSearch={() => handleSearch(query)}
        onClose={onClose}
        onReset={handleReset}
      />

      {hasSearched ? (
        results.length > 0 ? (
          <SearchResultList query={query} results={results} />
        ) : (
          <EmptyState />
        )
      ) : (
        <RecentSearchList
          items={recentSearches}
          onSelect={handleSearch}
          onRemove={removeSearch}
          onClear={clearSearches}
          jobKeyword="DESIGN · 프로덕트 디자인" // 임시 하드코딩 값
        />
      )}
    </div>
  );
};

export default SearchPopup;
