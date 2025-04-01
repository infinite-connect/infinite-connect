/* eslint-disable react-refresh/only-export-components */
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@lib/utils';

const buttonVariants = cva(
  "w-full inline-flex items-center justify-center gap-[10px] whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive height-12 text-[var(--text-primary)]",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground  hover:bg-blue-500 ',
        icon: '',
      },
      size: {
        default: 'h-12 p-3 has-[>svg]:px-3',
        // sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        // lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'pl-3 pr-3 size-9 h-11 w-11 [&_svg]:size-5',
      },
      btntype: {
        enabled: '',
        disabled: '',
        secondary: '',
        modalDefault: '',
        modalError: '',
        delete: '',
        modalSecondary: '',
      },
    },

    compoundVariants: [
      {
        btntype: 'enabled',
        className: 'font-normal  bg-[var(--fill-primary)] hover:bg-[var(--fill-primary-hover)]',
      },

      {
        btntype: 'secondary',
        className: 'font-normal  bg-[var(--fill-secondary)] hover:bg-[var(--fill-secondary-hover)]',
      },

      {
        btntype: 'disabled',
        className: 'font-normal  bg-[var(--fill-disabled)] hover:bg-[var(--fill-disabled-hover)]',
      },
      {
        btntype: 'delete',
        className:
          'rounded-[4px] font-normal  justify-start gap-1 p-4 text-[var(--error)] bg-[#FFFFFF0D] hover:bg-[var(--fill-secondary-hover)] hover:text-[#FC5555E5]',
      },
      {
        btntype: 'modalDefault',
        className:
          'font-normal  text-[16px] bg-[var(--fill-primary)] hover:bg-[var(--fill-primary-hover)]',
      },
      {
        btntype: 'modalSecondary',
        className:
          'font-normal text-[16px] bg-[var(--fill-secondary)] hover:bg-[var(--fill-secondary-hover)]',
      },

      {
        btntype: 'modalError',
        className:
          'font-normal  text-[16px] text-[var(--error)] bg-[rgba(252,85,85,0.1)] hover:bg-[#FEA7A733] hover:text-[#FC5555E5]',
      },
    ],

    defaultVariants: {
      variant: 'default',
      size: 'default',
      btntype: 'enabled',
    },
  },
);

interface ButtonProps extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  btntype?:
    | 'enabled'
    | 'disabled'
    | 'secondary'
    | 'modalDefault'
    | 'modalError'
    | 'delete'
    | 'modalSecondary';
  asChild?: boolean;
}

function Button({
  className,
  variant,
  size,
  btntype = 'enabled',
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, btntype, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
