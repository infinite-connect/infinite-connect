import { useEffect, useRef, useState } from 'react';

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
import clsx from 'clsx';

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

  const [triggerWidth, setTriggerWidth] = useState<number | undefined>(undefined);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, []);

  const handleSelect = (platform: SocialPlatform) => {
    setSelected(platform);
    onPlatformChange(platform.id);
    onChange('');
  };

  useEffect(() => {
    if (!platformId) return;
    const found = SocialIcon.find((item) => item.id === platformId);
    if (found) setSelected(found);
  }, [platformId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    if (selected.type === 'id' && selected.prefix) {
      const noPrefix = input.replace(selected.prefix, '');
      onChange(selected.prefix + noPrefix);
    } else {
      onChange(input);
    }
  };

  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const displayValue =
    selected.type === 'id' && selected.prefix
      ? (value ?? '').replace(selected.prefix, '')
      : (value ?? '');

  return (
    <div className="flex w-full items-center gap-2 relative" ref={triggerRef}>
      {/* 드롭다운 버튼 */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div>
            <Button className="gap-2 pl-[12px] h-14 pr-[56px] py-[17px] rounded-md bg-[var(--fill-secondary)] hover:bg-[var(--fill-secondary-hover)]">
              {selected.icon} <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="p-2 rounded-md shadow-md bg-popover border border-border z-50 text-[var(--text-primary)]"
          sideOffset={8}
          style={{ width: triggerWidth, backgroundColor: '#252525' }}
          align="start"
        >
          {SocialIcon.map((item) => (
            <DropdownMenuItem
              key={item.id}
              onClick={() => handleSelect(item)}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={clsx(
                'flex items-center gap-2 px-3 py-2 rounded-md transition-colors',
                'outline-none focus:outline-none ring-0 focus:ring-0 border-none',
                (hoveredId === item.id || (!hoveredId && selected.id === item.id)) &&
                  'bg-[#7253FF33]',
              )}
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
        className="flex-1 text-[var(--text-primary)] bg-[var(--fill-quaternary)] "
      />
    </div>
  );
};
