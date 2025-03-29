import React from 'react';
import IconRenderer from '@components/commons/Card/CardIconRenderer';
import { getUrlName } from '@utils/formatURLName';
import { ICONS } from '@constants/cardIcon';

interface ContactInfoProps {
  isTwoWayExchanged?: boolean;
  phone?: string;
  email?: string;
  primaryUrl?: Record<string, string>;
  subFirstUrl?: Record<string, string>;
  subSecondUrl?: Record<string, string>;
}

const ContactInfo: React.FC<ContactInfoProps> = ({
  isTwoWayExchanged = true,
  phone,
  email,
  primaryUrl,
  subFirstUrl,
  subSecondUrl,
}) => {
  const renderUrlItem = (url: Record<string, string> | undefined) => {
    if (!url) return null;
    const urlType = Object.keys(url)[0] as keyof typeof ICONS;
    const urlValue = url[urlType];
    if (!urlValue) return null;

    return (
      <div className="w-full h-[57px] flex flex-row items-center justify-between border-b border-[#292929] last:border-b-0">
        <div className="text-[14px] leading-[150%]">
          <div className="flex flex-row w-full items-center gap-[4px]">
            <IconRenderer type={urlType} size="16px" />
            {getUrlName(urlType)}
          </div>
        </div>
        <div>{urlValue}</div>
      </div>
    );
  };

  return (
    <div className="relative flex flex-col px-5 py-4 items-center  bg-[#1E1E1E]">
      <div className="w-full h-[33px] flex items-start justify-start text-[14px] font-bold leading-[150%]">
        연락처
      </div>

      {phone && isTwoWayExchanged && (
        <div className="w-full h-[57px] flex flex-row items-center justify-between border-b border-[#292929] last:border-b-0">
          <div className="text-[14px] leading-[150%]">PHONE</div>
          <div>{phone}</div>
        </div>
      )}

      {email && (
        <div className="w-full h-[57px] flex flex-row items-center justify-between border-b border-[#292929] last:border-b-0">
          <div className="text-[14px] leading-[150%]">EMAIL</div>
          <div>{email}</div>
        </div>
      )}

      {renderUrlItem(primaryUrl)}
      {renderUrlItem(subFirstUrl)}
      {renderUrlItem(subSecondUrl)}
    </div>
  );
};

export default ContactInfo;
