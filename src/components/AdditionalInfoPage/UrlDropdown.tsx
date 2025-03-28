import { useEffect, useState } from 'react';

import { Check, ChevronDown } from 'lucide-react';
import { SocialIcon, SocialPlatform } from './SocialIcon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { Button } from '@components/commons/Button/Button';
import { Input } from '@components/Input/input';

type UrlDropdownProps = {
  value: string | undefined;
  onChange: (value: string) => void;
  platformId: string | undefined;
  onPlatformChange: (id: string) => void;
};

export const UrlDropdown = ({
  value,
  onChange,
  platformId,
  onPlatformChange,
}: UrlDropdownProps) => {
  const [selected, setSelected] = useState(SocialIcon[0]);

  const handleSelect = (platform: SocialPlatform) => {
    setSelected(platform);
    onPlatformChange(platform.id); // platformId를 form에 반영
    onChange(''); // 기존 인풋 초기화
  };

  useEffect(() => {
    if (!platformId) return;
    const found = SocialIcon.find((item) => item.id === platformId);
    if (found) setSelected(found);
  }, [platformId]);

  // 인풋 값 변경 시 선택한 prefix가 있으면 prefix를 붙여줌
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    if (selected.type === 'id' && selected.prefix) {
      // ID 기반은 조립
      const noPrefix = input.replace(selected.prefix, '');
      onChange(selected.prefix + noPrefix);
    } else {
      // URL 기반은 사용자가 쓴 그대로
      onChange(input);
    }
  };

  const displayValue =
    selected.type === 'id' && selected.prefix
      ? (value ?? '').replace(selected.prefix, '')
      : (value ?? '');

  return (
    <div className="flex w-full items-center gap-2">
      {/* 드롭다운 버튼 */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="flex items-center gap-2 pl-[12px] h-10 pr-[56px] py-[17px] rounded-md">
            {selected.icon} <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-64 p-2 rounded-md shadow-md bg-popover border border-border z-50"
          sideOffset={8} // 버튼 간격
        >
          {SocialIcon.map((item) => (
            <DropdownMenuItem
              key={item.id}
              onClick={() => handleSelect(item)}
              className="flex items-center gap-2 px-3 py-2"
            >
              {item.icon}
              <span>{item.label}</span>
              {selected.id === item.id && <Check className="ml-auto w-4 h-4 text-primary" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* 인풋 필드 */}
      <Input
        placeholder={selected.placeholder + '를 입력해 주세요'}
        value={displayValue}
        onChange={handleChange}
        className="flex-1 h-10 border-0 text-[var(--text-primary)] text-[var(--text-primary)] bg-[var(--fill-quaternary)] "
      />
    </div>
  );
};
