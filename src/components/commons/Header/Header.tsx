import { HeaderLeft } from './HeaderLeft';
import { HeaderRight } from './HeaderRight';

const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <header className="relative flex items-center justify-between w-full h-14 py-3">
      {children}
    </header>
  );
};

// Slot 구성 연결
Header.Left = HeaderLeft;
Header.Right = HeaderRight;

export { Header };
