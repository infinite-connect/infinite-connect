import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';

export type DropdownItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
};

type DropdownProps = {
  items: DropdownItem[];
  value: string | undefined;
  onChange: (id: string) => void;
  placeholder?: string;
};

export const Dropdown = ({ items, value, onChange, placeholder }: DropdownProps) => {
  const [selected, setSelected] = useState<DropdownItem | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [triggerWidth, setTriggerWidth] = useState<number | undefined>(undefined);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const found = items.find((item) => item.id === value);
    setSelected(found ?? null);
  }, [value, items]);

  useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, []);

  const handleSelect = (item: DropdownItem) => {
    setSelected(item);
    onChange(item.id);
  };

  return (
    <div className="relative" ref={triggerRef}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            className={clsx(
              'w-full h-14 px-4 flex items-center justify-between rounded-md cursor-pointer transition-colors duration-200',
              'bg-[var(--fill-quaternary)]',
              'border border-[var(--border-default)]',
              'hover:border-[var(--fill-primary)]',
              'data-[state=open]:border-[var(--fill-primary)]',
            )}
          >
            <div className="flex items-center gap-2 text-sm">
              {selected?.icon}
              <span
                className={clsx(
                  selected ? 'text-[var(--text-primary)]' : 'text-[var(--text-tertiary)]',
                  'truncate',
                  'text-[14px]',
                )}
              >
                {selected?.label || placeholder}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-[var(--text-primary)]" />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="p-2 mt-1 rounded-md shadow-md z-50 text-[var(--text-primary)]"
          sideOffset={4}
          style={{ width: triggerWidth, backgroundColor: '#252525' }}
          align="start"
        >
          {items.map((item) => (
            <DropdownMenuItem
              key={item.id}
              onClick={() => handleSelect(item)}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={clsx(
                'flex items-center gap-2 px-3 py-2 rounded-md transition-colors',
                'outline-none focus:outline-none ring-0 focus:ring-0 border-none',
                (hoveredId === item.id || (!hoveredId && selected?.id === item.id)) &&
                  'bg-[#7253FF33]',
                'text-[14px]',
              )}
            >
              {item.icon}
              <span>{item.label}</span>
              {selected?.id === item.id && <Check className="ml-auto w-4 h-4 text-primary" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
