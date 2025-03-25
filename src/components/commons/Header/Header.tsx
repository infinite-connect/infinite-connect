import { cn } from '@lib/utils';
import { HeaderLeft } from './HeaderLeft';
import { HeaderRight } from './HeaderRight';

type HeaderProps = {
  children: React.ReactNode;
  className?: string;
};

const Header = ({ children, className }: HeaderProps) => {
  const defaultStyle = 'relative flex items-center justify-between w-full h-14 py-3';

  return <header className={cn(defaultStyle, className)}>{children}</header>;
};

Header.Left = HeaderLeft;
Header.Right = HeaderRight;

export { Header };
