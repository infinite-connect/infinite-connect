import { Button } from '@components/ui/button';
import { cn } from '@lib/utils';
import { X } from 'lucide-react';

interface CloseButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  className?: string;
}

export function CloseButton({ className, ...props }: CloseButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        'w-6 h-6 rounded-full bg-[rgba(255,255,255,0.22)] hover:bg-[var(--icon-hover)] hover:text-white text-white',
        className,
      )}
      {...props}
    >
      <X />
    </Button>
  );
}
