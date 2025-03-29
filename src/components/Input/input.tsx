import * as React from 'react';
import { cn } from '@lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // 텍스트 & 배경
        'text-sm text-[var(--text-primary)]',
        'bg-[var(--fill-quaternary)]',

        // 패딩
        'pl-3 py-[17px]',

        // 레이아웃 & 모양
        'flex w-full min-w-0 h-14 rounded-[4px]',
        'shadow-xs transition-[color,box-shadow] outline-none',

        // border
        'border border-transparent focus:border-[var(--fill-primary)]',

        // placeholder & selection
        'placeholder:text-[var(--text-tertiary)] selection:bg-primary selection:text-primary-foreground',

        // 파일 인풋
        'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',

        // disabled & aria 상태
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:border-destructive dark:aria-invalid:ring-destructive/40 aria-invalid:ring-destructive/20',

        // 커스텀 클래스
        className,
      )}
      {...props}
    />
  );
}

export { Input };
