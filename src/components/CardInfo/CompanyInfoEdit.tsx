// CompanyInfoEdit.tsx
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface CompanyInfoEditProps<T = any> {
  company?: string;
  fax?: string;
  businessWebsite?: string;
  jobTitle?: string;
  department?: string;
  onChange: (field: keyof T, value: string) => void;
}

const CompanyInfoEdit: React.FC<CompanyInfoEditProps> = ({
  company = '',
  fax = '',
  businessWebsite = '',
  jobTitle = '',
  department = '',
  onChange,
}) => {
  const infoItems = [
    { label: '회사', field: 'company', value: company },
    { label: '부서', field: 'department', value: department },
    { label: '직책', field: 'jobTitle', value: jobTitle },
    { label: '팩스', field: 'fax', value: fax },
    { label: '회사 웹사이트', field: 'businessWebsite', value: businessWebsite },
  ];

  return (
    <div className="relative flex flex-col px-5 py-4 items-center bg-[#1E1E1E]">
      <div className="w-full h-[33px] flex items-start justify-start text-[14px] font-bold leading-[150%]">
        회사 정보
      </div>
      {infoItems.map((item) => (
        <div
          key={item.field}
          className="w-full h-[57px] flex flex-row items-center justify-between border-b border-[#292929] last:border-b-0"
        >
          <div className="text-[14px] leading-[150%]">{item.label}</div>
          <input
            type="text"
            value={item.value}
            onChange={(e) => onChange(item.field, e.target.value)}
            className="bg-[#2A2A2A] text-white px-3 py-2 rounded w-[60%] focus:outline-none focus:ring-1 focus:ring-[#7253ff]"
            placeholder={`${item.label} 입력`}
          />
        </div>
      ))}
    </div>
  );
};

export default CompanyInfoEdit;
