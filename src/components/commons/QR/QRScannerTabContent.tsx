import React, { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';

const QRScannerTabContent: React.FC = () => {
  const scannerRef = useRef<HTMLDivElement>(null);
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null); // QR 코드 스캐너 인스턴스
  const navigate = useNavigate();

  useEffect(() => {
    // QR 코드 스캐너 초기화 및 시작
    if (scannerRef.current) {
      html5QrCodeRef.current = new Html5Qrcode('qr-scanner');

      html5QrCodeRef.current
        .start(
          { facingMode: 'environment' }, // 후면 카메라 설정
          {
            fps: 10,
            qrbox: { width: 250, height: 250 }, // QR 스캔 영역을 고정된 정사각형으로 설정
            aspectRatio: 1.0, // 카메라 화면 비율을 1:1로 설정
          },
          (decodedText) => {
            console.log('Decoded text:', decodedText);
            navigate(`/${decodedText}`);
          },
          (errorMessage) => {
            console.warn('QR Code Scan Error:', errorMessage);
          },
        )
        .catch((err) => {
          console.error('QR 코드 스캐너 시작 실패:', err);
        });
    }

    return () => {
      if (html5QrCodeRef.current) {
        html5QrCodeRef.current.stop().catch((error) => {
          console.error('Failed to stop the QR code scanner:', error);
        });
      }
    };
  }, [navigate]);

  return (
    <div className="relative w-full h-auto bg-white">
      {/* 카메라 화면 */}
      <div
        id="qr-scanner"
        ref={scannerRef}
        className="absolute inset-0 w-full h-[100vw] max-h-[100vh] object-cover"
      />
    </div>
  );
};

export default QRScannerTabContent;
