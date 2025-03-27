import { cn } from '@lib/utils';
import { HeaderLeft } from './HeaderLeft';
import { HeaderRight } from './HeaderRight';
import { HeaderCenter } from './HeaderCenter';

type HeaderProps = {
  children: React.ReactNode;
  className?: string;
};

const Header = ({ children, className }: HeaderProps) => {
  const defaultStyle =
    'font-[NanumGothic]  text-[var(--text-primary)] text-[20px] font-semibold relative flex items-center justify-between w-full h-14 py-3';

  return <header className={cn(defaultStyle, className)}>{children}</header>;
};

Header.Left = HeaderLeft;
Header.Right = HeaderRight;
Header.Center = HeaderCenter;

export { Header };
