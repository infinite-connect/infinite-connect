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
      <div className="w-full py-4 flex flex-col items-start justify-between border-b border-[#292929] last:border-b-0">
        <div className="text-[14px] leading-[150%] mb-2">URL {fieldName.replace('Url', '')}</div>
        <UrlDropdown
          value={urlValue}
          onChange={(value) => onUrlChange(fieldName, urlType, value)}
          platformId={urlType}
          onPlatformChange={(id) => onUrlChange(fieldName, id, '')}
        />
      </div>
    );
  };

  return (
    <div className="relative flex flex-col px-5 py-4 items-center bg-[#1E1E1E]">
      <div className="w-full h-[33px] flex items-start justify-start text-[14px] font-bold leading-[150%]">
        연락처
      </div>

      <div className="w-full py-4 flex flex-col items-start justify-between border-b border-[#292929]">
        <div className="text-[14px] leading-[150%] mb-2">PHONE</div>
        <div>{phone}</div>
      </div>

      <div className="w-full py-4 flex flex-col items-start justify-between border-b border-[#292929]">
        <div className="text-[14px] leading-[150%] mb-2">EMAIL</div>
        <div>{email}</div>
      </div>

      {renderUrlInput(primaryUrl, 'primaryUrl')}
      {renderUrlInput(subFirstUrl, 'subFirstUrl')}
      {renderUrlInput(subSecondUrl, 'subSecondUrl')}
    </div>
  );
};

export default ContactInfoEdit;
