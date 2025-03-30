import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '@lib/utils';

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  );
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn('inline-flex h-11 w-fit items-center justify-center rounded-lg', className)}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        // 기본 폰트 사이즈 및 레이아웃
        'text-[14px] inline-flex flex-1 items-center justify-center gap-1.5 p-3 whitespace-nowrap transition-colors',
        // 선택 상태
        'data-[state=active]:text-[var(--text-primary)]',
        'data-[state=active]:border-b data-[state=active]:border-[var(--text-primary)]',
        // 비활성 상태
        'text-[var(--text-secondary)]',
        // border와 focus 관련 스타일 제거
        'border-b border-transparent',
        className,
      )}
      style={{ textDecoration: 'none' }}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn('flex-1 outline-none', className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
