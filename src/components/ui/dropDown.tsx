import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';

interface DropDownProps {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  placeholder?: string;
  className?: string; // 커스텀 스타일링을 위한 className 추가
  menuClassName?: string; // 메뉴 스타일링을 위한 className 추가
  disabled?: boolean; // 비활성화 여부
}

const DropDown: React.FC<DropDownProps> = ({
  options,
  selected,
  onSelect,
  placeholder = '선택',
  className = '',
  menuClassName = '',
  disabled = false,
}) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        className={clsx(
          'flex items-center justify-between px-4 py-2 bg-gray-700 text-white rounded-lg cursor-pointer w-40',
          className,
          { 'cursor-not-allowed': disabled },
        )}
        disabled={disabled}
      >
        <span>{disabled ? '-' : selected || placeholder}</span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </DropdownMenu.Trigger>

      {!disabled && (
        <DropdownMenu.Content
          className={clsx(
            'bg-gray-800 text-white rounded-lg mt-2 shadow-lg p-2 w-40',
            menuClassName,
          )}
        >
          {options.map((option) => (
            <DropdownMenu.Item
              key={option}
              onSelect={() => onSelect(option)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-700 rounded-md"
            >
              {option}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      )}
    </DropdownMenu.Root>
  );
};

export default DropDown;
