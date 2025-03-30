import { ChevronRight } from 'lucide-react';
import React from 'react';

interface SettingRowProps {
  label: string;
  nameCount: string;
  imageUrl?: string;
}

const SettingRow: React.FC<SettingRowProps> = ({ label, nameCount, imageUrl }) => {
  return (
    <div className=" flex items-center justify-between">
      <div className="flex items-center gap-[10px]">
        {/* 명함 이미지 */}
        <div className="w-[50px] h-[50px]">
          {imageUrl && (
            <img src={imageUrl} alt="명함" className="w-full h-full object-cover rounded-[4px]" />
          )}
        </div>

        {/* 텍스트 (메인 텍스트 + 서브 텍스트) */}
        <div className="flex flex-col text-xs  leading-[1.5]">
          <span className="text-[var(--text-primary)] font-normal">{label}</span>
          <span className="text-[var(--text-tertiary)] font-medium">{nameCount}</span>
        </div>
      </div>

      {/* chevron */}
      <ChevronRight className="w-5 h-5" style={{ stroke: 'var(--text-secondary)' }} />
    </div>
  );
};

export default SettingRow;
