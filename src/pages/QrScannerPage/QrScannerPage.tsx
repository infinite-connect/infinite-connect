import React, { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';

const QrScannerPage: React.FC = () => {
  const scannerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let html5QrCodeScanner: Html5QrcodeScanner | null = null;

    if (scannerRef.current) {
      html5QrCodeScanner = new Html5QrcodeScanner(
        'qr-scanner',
        {
          fps: 10,
          // qrbox를 함수로 지정: 뷰파인더 크기에 맞춰 자동 정사각형
          qrbox: (viewfinderWidth, viewfinderHeight) => {
            const minEdge = Math.min(viewfinderWidth, viewfinderHeight);
            const boxSize = Math.floor(minEdge * 0.6); // 60% 사용 예시
            return { width: boxSize, height: boxSize };
          },
          aspectRatio: 1.0, // 선택적으로 1:1 비율을 우선 시도
        },
        false,
      );

      html5QrCodeScanner.render(
        (decodedText) => {
          // 스캔 성공 시 decodedText에 QR 코드의 텍스트가 들어옵니다.
          console.log('Decoded text:', decodedText);
          // 예를 들어, decodedText를 business-card id로 사용해 상세 페이지로 이동
          navigate(`/${decodedText}`);
        },
        (errorMessage) => {
          // 스캔 중 에러가 발생하면 호출 (계속 스캔하므로 주로 로그로 확인)
          console.warn('QR Code Scan Error:', errorMessage);
        },
      );
    }

    return () => {
      // 컴포넌트 언마운트 시 스캐너를 정리
      if (html5QrCodeScanner) {
        html5QrCodeScanner.clear().catch((error) => {
          console.error('Failed to clear html5QrcodeScanner.', error);
        });
      }
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="p-4 bg-gray-800 text-center text-lg font-semibold">QR 스캔 페이지</header>
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* 원하는 높이·너비로 스타일 지정 */}
        <div id="qr-scanner" ref={scannerRef} className="w-3/4 h-4/3  bg-gray-700" />
      </div>
    </div>
  );
};

export default QrScannerPage;
