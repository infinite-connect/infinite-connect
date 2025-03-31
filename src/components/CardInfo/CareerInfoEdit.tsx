// CareerInfoEdit.tsx
import React from 'react';

interface CareerInfoEditProps {
  experienceYears?: string;
  fieldsOfExpertise?: string;
  subExpertise?: string;
  onChange: (field: string, value: string) => void;
}

const CareerInfoEdit: React.FC<CareerInfoEditProps> = ({
  experienceYears = '',
  fieldsOfExpertise = '',
  subExpertise = '',
  onChange,
}) => {
  const infoItems = [
    { label: '연차', field: 'experienceYears', value: experienceYears },
    { label: '주 직무', field: 'fieldsOfExpertise', value: fieldsOfExpertise },
    { label: '세부 직무', field: 'subExpertise', value: subExpertise },
  ];

  return (
    <div className="relative flex flex-col px-5 py-4 items-center bg-[#1E1E1E]">
      <div className="w-full h-[33px] flex items-start justify-start text-[14px] font-bold leading-[150%]">
        경력 정보
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

export default CareerInfoEdit;
