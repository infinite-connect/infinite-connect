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
      <p className="mt-4 text-sm text-gray-600 break-words text-center">{url}</p>
    </div>
  );
};

export default QRCodeDisplay;
