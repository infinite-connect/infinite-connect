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
        icon: '',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        // sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        // lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'pl-3 pr-3 size-9',
      },
      btntype: {
        enabled: '',
        disabled: '',
        secondary: '',
      },
      state: {
        default: '',
        hover: '',
      },
    },

    compoundVariants: [
      {
        btntype: 'enabled',
        state: 'default',
        className: 'bg-[var(--color-btn-primary)]',
      },

      {
        btntype: 'enabled',
        state: 'hover',
        className: 'hover:bg-[var(--btn-primary-hover)]',
      },

      {
        btntype: 'secondary',
        state: 'default',
        className: 'bg-[var(--color-btn-secondary)]',
      },

      {
        btntype: 'disabled',
        state: 'default',
        className: 'bg-[var(--color-btn-disabled)]',
      },

      {
        btntype: 'disabled',
        state: 'hover',
        className: 'hover:bg-[var(--btn-disabled-hover)]',
      },
    ],

    defaultVariants: {
      variant: 'default',
      size: 'default',
      btntype: 'enabled',
      state: 'default',
    },
  },
);

interface ButtonProps extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  btntype?: 'enabled' | 'disabled' | 'secondary';
  state?: 'default' | 'hover';
  asChild?: boolean;
}

function Button({
  className,
  variant,
  size,
  btntype = 'enabled',
  state = 'default',
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, btntype, state, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
