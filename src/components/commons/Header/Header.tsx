// 예: src/components/Header.tsx
import React from 'react';
import { Button } from '@components/ui/button';
import { QrCode, Scan } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-gray-800 text-black">
      <div className="text-lg font-bold">My App</div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => navigate('/qr-scan')}>
          <Scan className="mr-2 h-4 w-4" />
          QR 스캔
        </Button>
        <Button variant="outline" size="sm">
          <QrCode className="mr-2 h-4 w-4" />
          QR 생성
        </Button>
      </div>
    </header>
  );
};

export default Header;
