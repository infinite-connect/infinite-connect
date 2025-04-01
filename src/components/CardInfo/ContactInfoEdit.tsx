import { UrlDropdown } from '@components/AdditionalInfoPage/UrlDropdown';
import React from 'react';

interface ContactInfoEditProps {
  phone?: string;
  email?: string;
  primaryUrl?: Record<string, string> | null;
  subFirstUrl?: Record<string, string> | null;
  subSecondUrl?: Record<string, string> | null;
  onUrlChange: (field: string, urlType: string, value: string) => void;
}

const ContactInfoEdit: React.FC<ContactInfoEditProps> = ({
  phone = '',
  email = '',
  primaryUrl,
  subFirstUrl,
  subSecondUrl,
  onUrlChange,
}) => {
  const renderUrlInput = (url: Record<string, string> | null | undefined, fieldName: string) => {
    const urlObject = url || {};
    const urlType = Object.keys(urlObject)[0] || 'none';
    const urlValue = urlObject[urlType] || '';

    return (
      <div className="w-full h-[54px] flex items-center justify-between bg-[#2A2A2A] rounded mb-4 items-e">
        <div className="w-full">
          <UrlDropdown
            value={urlValue}
            onChange={(value) => onUrlChange(fieldName, urlType, value)}
            platformId={urlType}
            onPlatformChange={(id) => onUrlChange(fieldName, id, '')}
            className="bg-[#1E1E1E]"
            inputClassName="text-right px-4 text-[16px]"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="relative flex flex-col px-5 py-4 items-center bg-[#1E1E1E]">
      <div className="w-full h-[33px] flex items-start justify-start text-[14px] font-bold leading-[150%]">
        연락처
      </div>

      <div className="w-full space-y-4 mt-2">
        <div className="flex items-center justify-between h-[54px] bg-[#2A2A2A] px-4 rounded">
          <span className="text-[14px] text-gray-400">PHONE</span>
          <div className="text-white text-right w-[70%]">{phone}</div>
        </div>

        <div className="flex items-center justify-between h-[54px] bg-[#2A2A2A] px-4 rounded">
          <span className="text-[14px] text-gray-400">EMAIL</span>
          <div className="text-white text-right w-[70%]">{email}</div>
        </div>

        {renderUrlInput(primaryUrl, 'primaryUrl')}
        {renderUrlInput(subFirstUrl, 'subFirstUrl')}
        {renderUrlInput(subSecondUrl, 'subSecondUrl')}
      </div>
    </div>
  );
};

export default ContactInfoEdit;
