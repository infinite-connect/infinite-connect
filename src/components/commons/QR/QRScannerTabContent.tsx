import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';
import useWindowHeight from '@hooks/useWindowHeight';
import useWindowWidth from '@hooks/useWindowWidth';
import './styles.css';
import { Button } from '../Button/Button';

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
  const qrMessageYLocation = windowHeight / 2 - 172;
  console.log(qrMessageYLocation);

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
    <div className="relative w-full h-full bg-transparent">
      {/* 카메라 화면 */}
      <div id="qr-scanner" ref={scannerRef} className="absolute inset-0 w-full h-full p-0" />
      <div
        className={`
          absolute w-[240px] h-[20px] text-[22px] font-bold top-[250px] left-1/2 transform -translate-x-1/2
          text-center text-white z-50
        `}
      >
        QR 코드를 스캔하세요
      </div>

      <div className="absolute flex flex-row w-[335px] h-[82px] px-[16px] py-[22px] bg-[#2a2a2a] bottom-[60px] left-1/2 transform -translate-x-1/2 z-50 rounded-[4px]">
        <div className="w-full h-full">
          <Button
            btntype="enabled"
            className="absolute top-[22px] right-[16px] w-[58px] h-[38px] py-[7px] rounded-[6px]"
          >
            <div className="text-[12px] leading-[24px]">변경</div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QRScannerTabContent;
