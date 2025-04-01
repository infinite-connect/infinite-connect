// CareerInfoEdit.tsx
import { Dropdown } from '@components/AdditionalInfoPage/DropDown';
import { experienceItems } from '@constants/additionalInfoConstants';
import React from 'react';

interface CareerInfoEditProps {
  experienceYears?: string;
  businessName?: string;
  jobTitle?: string;
  fax?: string;
  businessWebsite: string;
  businessAddress: string;
  onChange: (field: string, value: string) => void;
}

const CareerInfoEdit: React.FC<CareerInfoEditProps> = ({
  experienceYears = '',
  businessName = '',
  jobTitle = '',
  fax = '',
  businessAddress = '',
  businessWebsite = '',
  onChange,
}) => {
  return (
    <div className="relative flex flex-col px-5 py-4 items-center bg-[#1E1E1E]">
      <div className="w-full h-[33px] flex items-start justify-start text-[14px] font-bold leading-[150%]">
        경력 정보
      </div>

      <div className="w-full space-y-4 mt-2">
        <div className="flex items-center justify-between h-[54px] bg-[#2A2A2A] px-4 rounded">
          <span className="text-[14px] text-gray-400">이름</span>
          <input
            type="text"
            value={businessName}
            onChange={(e) => onChange('businessName', e.target.value)}
            className="bg-transparent text-white text-right focus:outline-none w-[70%]"
            placeholder="비즈니스명"
          />
        </div>

        <div className="flex items-center justify-between h-[54px] bg-[#2A2A2A] pl-4 rounded">
          <span className="text-[14px] text-gray-400">연차</span>
          <div className="w-[70%]">
            <Dropdown
              value={experienceYears}
              items={experienceItems}
              onChange={(value) => onChange('experienceYears', value)}
              className="border-none"
              id="experience-dropdown"
              triggerClassName="h-[54px] bg-transparent border-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-between h-[54px] bg-[#2A2A2A] px-4 rounded">
          <span className="text-[14px] text-gray-400">직책</span>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => onChange('jobTitle', e.target.value)}
            className="bg-transparent text-white text-right focus:outline-none w-[70%]"
            placeholder="직책"
          />
        </div>

        <div className="flex items-center justify-between h-[54px] bg-[#2A2A2A] px-4 rounded">
          <span className="text-[14px] text-gray-400">FAX</span>
          <input
            type="text"
            value={fax}
            onChange={(e) => onChange('fax', e.target.value)}
            className="bg-transparent text-white text-right focus:outline-none w-[70%]"
            placeholder="FAX"
          />
        </div>

        <div className="flex items-center justify-between h-[54px] bg-[#2A2A2A] px-4 rounded">
          <span className="text-[14px] text-gray-400">회사 웹사이트</span>
          <input
            type="text"
            value={businessWebsite}
            onChange={(e) => onChange('businessWebsite', e.target.value)}
            className="bg-transparent text-white text-right focus:outline-none w-[70%]"
            placeholder="회사 웹사이트"
          />
        </div>

        <div className="flex items-center justify-between h-[54px] bg-[#2A2A2A] px-4 rounded">
          <span className="text-[14px] text-gray-400">회사 주소</span>
          <input
            type="text"
            value={businessAddress}
            onChange={(e) => onChange('businessAddress', e.target.value)}
            className="bg-transparent text-white text-right focus:outline-none w-[70%]"
            placeholder="회사 주소"
          />
        </div>
      </div>
    </div>
  );
};

export default CareerInfoEdit;
