/* eslint-disable react-refresh/only-export-components */
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive  text-[var(--color-text-primary)]",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        // sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        // lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        // icon: 'size-9',
      },
      type: {
        enabled: '',
        disabled: '',
      },
      state: {
        default: '',
        hover: '',
      },
    },

    compoundVariants: [
      {
        type: 'enabled',
        state: 'default',
        className: 'bg-[var(--color-btn-primary)]',
      },

      {
        type: 'enabled',
        state: 'hover',
        className: 'hover:bg-[var(--btn-primary-hover)]',
      },

      {
        type: 'disabled',
        state: 'default',
        className: 'bg-[var(--color-btn-disabled)]',
      },

      {
        type: 'disabled',
        state: 'hover',
        className: 'hover:bg-[var(--btn-disabled-hover)]',
      },
    ],

    defaultVariants: {
      variant: 'default',
      size: 'default',
      type: 'enabled',
      state: 'default',
    },
  },
);

function Button({
  className,
  variant,
  size,
  type,
  state,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, type, state, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
