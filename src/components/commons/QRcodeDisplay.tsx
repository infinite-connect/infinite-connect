import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

interface QRCodeDisplayProps {
  url: string;
  size?: number;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ url, size = 256 }) => {
  return (
    <div className="flex flex-col items-center">
      <QRCodeCanvas value={url} size={size} level="H" includeMargin={true} />
      <p className="mt-4 text-sm text-gray-600 break-words text-center">
        ~~님의 네트워킹 카드 QR 코드입니다.
      </p>
    </div>
  );
};

export default QRCodeDisplay;
