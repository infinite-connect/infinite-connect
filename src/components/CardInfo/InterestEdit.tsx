// InterestsEdit.tsx
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@components/commons/Button/Button';

interface InterestsEditProps {
  interests?: string[];
  onChange: (interests: string[]) => void;
}

const InterestsEdit: React.FC<InterestsEditProps> = ({ interests = [], onChange }) => {
  const [newInterest, setNewInterest] = useState('');

  const handleAddInterest = () => {
    if (newInterest.trim() === '') return;
    const updatedInterests = [...interests, newInterest.trim()];
    onChange(updatedInterests);
    setNewInterest('');
  };

  const handleRemoveInterest = (index: number) => {
    const updatedInterests = interests.filter((_, i) => i !== index);
    onChange(updatedInterests);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddInterest();
    }
  };

  return (
    <div className="relative flex flex-col px-5 py-4 items-center bg-[#1E1E1E]">
      <div className="w-full h-[33px] flex items-start justify-start text-[14px] font-bold leading-[150%]">
        관심사
      </div>

      <div className="w-full py-4 flex flex-col items-start justify-between">
        <div className="text-[14px] leading-[150%] mb-2">관심 분야</div>
        <div className="flex flex-wrap gap-2 w-full mb-4">
          {interests.map((interest, index) => (
            <div
              key={index}
              className="flex items-center gap-1 px-3 py-1 bg-[#292929] rounded-full"
            >
              <span className="text-sm">{interest}</span>
              <button
                onClick={() => handleRemoveInterest(index)}
                className="text-gray-400 hover:text-white"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
        <div className="flex w-[50px] gap-2">
          <input
            type="text"
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="관심사를 입력하세요"
            className="flex-1 px-3 py-2 bg-[#252525] rounded-md text-[var(--text-primary)] focus:outline-none"
          />
          <Button btntype="enabled" className="px-4 py-2" onClick={handleAddInterest}>
            추가
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterestsEdit;
