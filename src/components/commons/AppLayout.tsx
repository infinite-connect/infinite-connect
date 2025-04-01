// AppLayout.tsx
import React from 'react';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }): React.JSX.Element => {
  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[400px]">{children}</div>
    </div>
  );
};

export default AppLayout;
