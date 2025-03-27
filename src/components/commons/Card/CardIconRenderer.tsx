import { ICONS } from '@constants/cardIcon';
import React from 'react';

interface IconProps {
  type: keyof typeof ICONS; // 'github' | 'framer' | 'linkedin' | 'figma' | 'instagram' | 'none'
  size?: string;
  color?: string; // 아이콘 색상 (기본값: currentColor)
}

const IconRenderer: React.FC<IconProps> = ({ type, size = '12px', color = 'currentColor' }) => {
  const IconComponent = ICONS[type] || ICONS['none']; // 매칭되지 않으면 기본값으로 'none'
  return <IconComponent className={`w-[${size}] h-[${size}]`} color={color} />;
};

export default IconRenderer;
