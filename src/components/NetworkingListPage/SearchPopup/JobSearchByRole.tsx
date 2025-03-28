import React from 'react';

interface JobSearchByRoleProps {
  jobKeyword: string;
  onSelect: (value: string) => void;
}

const JobSearchByRole: React.FC<JobSearchByRoleProps> = ({ jobKeyword, onSelect }) => {
  if (!jobKeyword) return null;

  return (
    <div className="pt-5 pb-4">
      <h2 className="text-[var(--text-primary)] text-[16px] font-bold mb-4">내 직무로 검색</h2>
      <button
        onClick={() => onSelect(jobKeyword)}
        className="px-[14px] py-[10px] bg-none text-[14px] rounded-[6px] border border-[var(--text-tertiary)] text-[var(--text-primary)] font-regular"
      >
        {jobKeyword}
      </button>
    </div>
  );
};

export default JobSearchByRole;
