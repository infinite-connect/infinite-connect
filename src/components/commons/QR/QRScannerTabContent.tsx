import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';
import useWindowHeight from '@hooks/useWindowHeight';
import useWindowWidth from '@hooks/useWindowWidth';

interface QRScannerTabContentProps {
  isActive: boolean;
}

const QRScannerTabContent: React.FC<QRScannerTabContentProps> = ({ isActive }) => {
  const scannerRef = useRef<HTMLDivElement>(null);
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null); // QR 코드 스캐너 인스턴스
  const [isTransitioning, setIsTransitioning] = useState(false); // 상태 전환 중인지 여부
  const navigate = useNavigate();
  const windowWidth = useWindowWidth();
  const windowHeight = useWindowHeight();

  useEffect(() => {
    const startScanner = async () => {
      if (scannerRef.current && !html5QrCodeRef.current) {
        html5QrCodeRef.current = new Html5Qrcode('qr-scanner');
      }

      if (html5QrCodeRef.current) {
        setIsTransitioning(true); // 상태 전환 시작
        try {
          const aspectRatio = windowWidth / windowHeight;
          await html5QrCodeRef.current.start(
            { facingMode: 'environment' }, // 후면 카메라 설정
            {
              fps: 10,
              qrbox: 275, // QR 스캔 영역 설정
              aspectRatio, // �����라 ��면 비�� 설정
            },
            (decodedText) => {
              console.log('Decoded text:', decodedText);
              navigate(`/${decodedText}`);
            },
            (errorMessage) => {
              console.warn('QR Code Scan Error:', errorMessage);
            },
          );
        } catch (err) {
          console.error('QR 코드 스캐너 시작 실패:', err);
        } finally {
          setIsTransitioning(false); // 상태 전환 완료
        }
      }
    };

    const stopScanner = async () => {
      if (html5QrCodeRef.current) {
        setIsTransitioning(true); // 상태 전환 시작
        try {
          await html5QrCodeRef.current.stop();
        } catch (err) {
          console.error('QR 코드 스캐너 중지 실패:', err);
        } finally {
          html5QrCodeRef.current = null; // 인스턴스 초기화
          setIsTransitioning(false); // 상태 전환 완료
        }
      }
    };

    if (isActive && !isTransitioning) {
      startScanner();
    } else if (!isActive && !isTransitioning) {
      stopScanner();
    }

    return () => {
      stopScanner(); // 컴포넌트 언마운트 시 스캐너 중지
    };
    // eslint-disable-next-line
  }, [isActive, navigate]);

  return (
    <div className="relative w-full h-full bg-white">
      {/* 카메라 화면 */}
      <div id="qr-scanner" ref={scannerRef} className="absolute inset-0 w-full h-full" />
      <div
        className="
          absolute w-[240px] h-[20px] text-[22px] font-bold bottom-[170px] left-1/2 transform -translate-x-1/2 z-50 
          text-center text-white
        "
      >
        QR 코드를 스캔하세요
      </div>
    </div>
  );
};

export default QRScannerTabContent;
