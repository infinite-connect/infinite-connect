import React, { useState } from 'react';
import InterestBottomSheet from '@components/UserPage/InterestBottomSheet';

interface InterestsEditProps {
  interests?: string[];
  onChange: (interests: string[]) => void;
}

const InterestsEdit: React.FC<InterestsEditProps> = ({ interests = [], onChange }) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleSaveInterests = (selected: string[]) => {
    onChange(selected);
  };

  return (
    <div
      onClick={() => setIsBottomSheetOpen(true)}
      className="relative flex flex-col px-5 py-4 items-center bg-[#1E1E1E] "
    >
      <div className="w-full h-[33px] flex items-start justify-start text-[14px] font-bold leading-[150%]">
        관심사
      </div>

      <div className="w-full py-4 flex flex-col items-start justify-between">
        <div className="w-full mb-4">
          {interests.length > 0 ? (
            <div className="text-sm p-3 bg-[#252525] rounded-md">
              {interests.map((interest, index) => (
                <span key={index} className="text-[#7253FF] mr-1">
                  #{interest}
                </span>
              ))}
            </div>
          ) : (
            <div className="text-sm p-3 bg-[#252525] rounded-md text-white/50">
              관심사를 선택해주세요
            </div>
          )}
        </div>
      </div>

      <InterestBottomSheet
        open={isBottomSheetOpen}
        setOpen={setIsBottomSheetOpen}
        onSave={handleSaveInterests}
        initialSelected={interests}
        max={5}
      />
    </div>
  );
};

export default InterestsEdit;
