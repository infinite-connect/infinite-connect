import { ReactNode } from 'react';

type IconButtonProps = {
  icon: ReactNode;
  onClick?: () => void;
};

export const IconButton = ({ icon, onClick }: IconButtonProps) => (
  <button onClick={onClick} className="p-2">
    {icon}
  </button>
);
