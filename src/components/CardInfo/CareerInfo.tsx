import React from 'react';

interface CareerInfoProps {
  company?: string;
  jobTitle?: string;
  experienceYears?: string;
  fieldsOfExpertise?: string;
  subExpertise?: string;
}

const CareerInfo: React.FC<CareerInfoProps> = ({
  company,
  jobTitle,
  experienceYears,
  fieldsOfExpertise,
  subExpertise,
}) => {
  const infoItems = [
    { label: '회사', value: company },
    { label: '직책', value: jobTitle },
    { label: '연차', value: experienceYears },
    {
      label: '직무',
      value:
        fieldsOfExpertise && subExpertise
          ? `${fieldsOfExpertise} | ${subExpertise}`
          : fieldsOfExpertise || subExpertise,
    },
  ].filter((item) => item.value);

  return (
    <div className="relative flex flex-col px-5 py-4 items-center bg-[#1E1E1E]">
      <div className="w-full h-[33px] flex items-start justify-start text-[14px] font-bold leading-[150%]">
        경력 정보
      </div>
      {infoItems.map((item) => (
        <div
          key={item.label}
          className="w-full h-[57px] flex flex-row items-center justify-between border-b border-[#292929] last:not:only:border-b-0"
        >
          <div className="text-[14px] leading-[150%]">{item.label}</div>
          <div>{item.value}</div>
        </div>
      ))}
    </div>
  );
};

export default CareerInfo;
