import React from 'react';

interface CompanyInfoProps {
  company?: string;
  fax?: string;
  businessWebsite?: string;
  jobTitle?: string;
  department?: string;
}

const CompanyInfo: React.FC<CompanyInfoProps> = ({
  company,
  fax,
  businessWebsite,
  jobTitle,
  department,
}) => {
  const infoItems = [
    { label: '회사', value: company },
    { label: '부서', value: department },
    { label: '직책', value: jobTitle },
    { label: '팩스', value: fax },
    { label: '회사 웹사이트', value: businessWebsite },
  ].filter((item) => item.value);

  if (infoItems.length === 0) return null;

  return (
    <div className="relative flex flex-col px-5 py-4 items-center bg-[#1E1E1E]">
      <div className="w-full h-[33px] flex items-start justify-start text-[14px] font-bold leading-[150%]">
        회사 정보
      </div>
      {infoItems.map((item) => (
        <div
          key={item.label}
          className="w-full h-[57px] flex flex-row items-center justify-between border-b border-[#292929] last:border-b-0"
        >
          <div className="text-[14px] leading-[150%]">{item.label}</div>
          <div>{item.value}</div>
        </div>
      ))}
    </div>
  );
};

export default CompanyInfo;
