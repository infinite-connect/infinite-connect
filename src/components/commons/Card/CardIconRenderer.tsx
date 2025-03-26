import { ICONS } from '@constants/cardIcon';
import React from 'react';

interface IconProps {
  type: keyof typeof ICONS; // 'github' | 'framer' | 'linkedin' | 'figma' | 'instagram' | 'none'
  size?: number; // 아이콘 크기 (기본값: 24)
  color?: string; // 아이콘 색상 (기본값: currentColor)
}

const IconRenderer: React.FC<IconProps> = ({ type, size = 12, color = 'currentColor' }) => {
  const IconComponent = ICONS[type] || ICONS['none']; // 매칭되지 않으면 기본값으로 'none'
  return <IconComponent width={size} height={size} color={color} />;
};

export default IconRenderer;
