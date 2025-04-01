// CompanyInfoEdit.tsx
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface CompanyInfoEditProps<T = any> {
  company?: string;
  fax?: string;
  businessWebsite?: string;
  businessAddress?: string;
  jobTitle?: string;
  department?: string;
  onChange: (field: keyof T, value: string) => void;
}

const CompanyInfoEdit: React.FC<CompanyInfoEditProps> = ({
  company = '',
  fax = '',
  businessWebsite = '',
  businessAddress = '',
  jobTitle = '',
  department = '',

  onChange,
}) => {
  const fields = [
    { label: '이름', field: 'company', value: company },
    { label: '직책', field: 'jobTitle', value: jobTitle },
    { label: '연차', field: 'experienceYears', value: '6~10년차' },
    { label: '부서', field: 'department', value: department },
    { label: 'FAX', field: 'fax', value: fax },
    { label: '회사 웹사이트', field: 'businessWebsite', value: businessWebsite },
    { label: '회사 주소', field: 'businessAddress', value: businessAddress },
  ];

  return (
    <div className="relative flex flex-col px-5 py-4 items-center bg-[#1E1E1E]">
      <div className="w-full h-[33px] flex items-start justify-start text-[14px] font-bold leading-[150%]">
        회사 정보
      </div>

      <div className="w-full space-y-4 mt-2">
        {fields.map((item) => (
          <div
            key={item.field}
            className="flex items-center justify-between h-[54px] bg-[#2A2A2A] px-4 rounded"
          >
            <span className="text-[14px] text-gray-400">{item.label}</span>
            <input
              type="text"
              value={item.value}
              onChange={(e) => onChange(item.field, e.target.value)}
              className="bg-transparent text-white text-right focus:outline-none w-[70%]"
              placeholder={item.label}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyInfoEdit;
