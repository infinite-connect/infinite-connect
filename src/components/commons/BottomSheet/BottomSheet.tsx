import { Drawer, DrawerContent } from '@components/ui/drawer';
import { cn } from '@lib/utils';
import { Button } from '../Button/Button';

interface BottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
}

const BottomSheet = ({
  open,
  onOpenChange,
  title,
  subtitle,
  children,
  className,
}: BottomSheetProps) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent
        className={cn(
          'bg-[var(--bg-default-black)] px-6 pt-10 pb-6 rounded-t-2xl w-full [&>div:first-child]:hidden',
          className,
        )}
      >
        <div className="text-center mb-5">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-[var(--text-secondary)]">{subtitle}</p>}
        </div>

        {children}
      </DrawerContent>
    </Drawer>
  );
};

const Content = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn('flex flex-col gap-2', className)}>{children}</div>
);

const Actions = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn('mt-6', className)}>{children}</div>
);

Actions.ButtonGroup = ({
  primaryLabel,
  secondaryLabel,
  onPrimary,
  onSecondary,
}: {
  primaryLabel: string;
  secondaryLabel: string;
  onPrimary: () => void;
  onSecondary: () => void;
}) => (
  <div className="flex flex-col gap-2">
    <Button btntype="enabled" onClick={onPrimary} className="w-full">
      {primaryLabel}
    </Button>
    <Button btntype="secondary" onClick={onSecondary} className="w-full">
      {secondaryLabel}
    </Button>
  </div>
);

const TextButton = ({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}) => (
  <button
    onClick={onClick}
    className={cn(
      'mt-4 text-sm text-[var(--text-primary)] underline w-full text-center',
      className,
    )}
  >
    {children}
  </button>
);

BottomSheet.Content = Content;
BottomSheet.Actions = Actions;
BottomSheet.TextButton = TextButton;

export { BottomSheet };
export default BottomSheet;
