import { useEffect, useState } from 'react';

const STORAGE_KEY = 'recent_searches';
const LIMIT = 5;

export const useRecentSearches = () => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  const save = (data: string[]) => {
    setRecentSearches(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const addSearch = (query: string) => {
    const newData = [query, ...recentSearches.filter((q) => q !== query)].slice(0, LIMIT);
    save(newData);
  };

  const removeSearch = (query: string) => {
    save(recentSearches.filter((q) => q !== query));
  };

  const clearSearches = () => {
    save([]);
  };

  return { recentSearches, addSearch, removeSearch, clearSearches };
};
