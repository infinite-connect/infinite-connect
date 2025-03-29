import React from 'react';
import { Badge } from '@components/ui/badge';

interface SearchResultListProps {
  query: string;
  results: string[];
}

const SearchResultList: React.FC<SearchResultListProps> = ({ query, results }) => {
  return (
    <div className="mt-8 space-y-4">
      <h2 className="font-bold text-[18px] text-[var(--text-primary)] leading-[140%] tracking-[-0.27px]">
        <span className="text-[var(--text-accent)]">‘{query}’</span>로 검색된 명함 {results.length}
        건
      </h2>
      <ul className="space-y-4">
        {results.map((r, idx) => (
          <li
            key={`${r}-${idx}`}
            className="bg-black px-4 py-3 rounded-lg flex justify-between items-center"
          >
            <div>
              <p className="text-sm font-semibold text-white">DEVELOPMENT</p>
              <p className="text-sm text-muted-foreground">프론트엔드 | Engineering팀</p>
              <p className="text-sm mt-1 text-muted-foreground">Infinite Connect</p>
            </div>
            <div className="text-right">
              <p className="text-white font-semibold">{r}</p>
              <Badge variant="secondary" className="mt-2">
                ✨ 인기있는
              </Badge>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResultList;
