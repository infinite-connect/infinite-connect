import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from '@components/ui/drawer';
import { Button } from '@components/ui/button';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Separator } from '@components/ui/separator';

const RealCardScanPage = (): React.JSX.Element => {
  const webcamRef = useRef<Webcam>(null);
  const navigate = useNavigate();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [parsedData, setParsedData] = useState({
    name: '',
    email: '',
    company: '',
    jobTitle: '',
    department: '',
    phone: '',
    fax: '',
    address: '',
    website: '',
  });

  const [loading, setLoading] = useState(false); // 로딩 상태
  const [geminiLoading, setGeminiLoading] = useState(false);

  const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const googleVisionApiKey = import.meta.env.VITE_GOOGLE_VISION_API_KEY;

  // 사진 촬영 함수
  const capturePhoto = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc); // 캡처된 이미지를 상태에 저장
      if (imageSrc) {
        await processOCR(imageSrc); // OCR 및 데이터 매핑 실행
      }
    }
  };

  const processOCR = async (imageSrc: string) => {
    setLoading(true);
    try {
      const base64Image = imageSrc.split(',')[1]; // 캡처된 이미지에서 Base64 데이터 추출

      // Google Vision API 호출
      const visionResponse = await callGoogleVisionAPI(base64Image);
      const text = visionResponse.responses[0]?.fullTextAnnotation?.text || '텍스트 없음';

      if (text === '텍스트 없음') {
        toast.error('명함이 인식되지 않았습니다. 다시 촬영해주세요.'); // Sonner 토스트 메시지 띄우기
        return;
      }

      // Gemini API를 사용한 데이터 매핑 실행
      const parsedResult = await parseBusinessCardDataWithGemini(text);

      const isAllFieldsMissing = Object.values(parsedResult as Record<string, string>).every(
        (value) => value.includes('없음'),
      );

      if (isAllFieldsMissing) {
        toast.error('명함이 인식되지 않았습니다. 다시 촬영해주세요.'); // Sonner 토스트 메시지 띄우기
        return;
      }

      setParsedData(parsedResult); // 상태 업데이트
      setIsDrawerOpen(true); // Drawer 열기
    } catch (error) {
      console.error('OCR 또는 데이터 매핑 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const parseBusinessCardDataWithGemini = async (text: string) => {
    setGeminiLoading(true); // Gemini 작업 시작
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Extract the following fields from the text:\n\n1. name\n2. company\n3. jobTitle\n4. department\n5. email\n6. phone\n7. fax\n8. address\n9. website\n10.  \n\nText:\n${text}\n\nReturn the result as plain JSON without any code block or formatting.`,
                  },
                ],
              },
            ],
          }),
        },
      );

      if (!response.ok) throw new Error(`Gemini API 요청 실패: ${response.status}`);

      const data = await response.json();
      console.log('Gemini 응답:', data);

      let rawText = data.candidates[0]?.content?.parts[0]?.text || '';
      rawText = rawText.trim().replace(/^"|"$/g, '');

      const parsedData = JSON.parse(rawText);
      console.log('Gemini로 추출된 데이터:', parsedData);

      return parsedData;
    } catch (error) {
      console.error('Gemini API 데이터 매핑 실패:', error);
      return {
        name: '이름 없음',
        company: '회사명 없음',
        jobTitle: '직책 없음',
        department: '부서 없음',
        email: '이메일 없음',
        phone: '전화번호 없음',
        fax: '팩스 없음',
        address: '주소 없음',
        website: '홈페이지 없음',
      };
    } finally {
      setGeminiLoading(false); // Gemini 작업 완료
    }
  };

  const callGoogleVisionAPI = async (base64Image: string) => {
    try {
      const response = await fetch(
        `https://vision.googleapis.com/v1/images:annotate?key=${googleVisionApiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            requests: [
              {
                image: { content: base64Image },
                features: [{ type: 'TEXT_DETECTION' }],
              },
            ],
          }),
        },
      );

      if (!response.ok) throw new Error(`Vision API 요청 실패: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Google Vision API 호출 실패:');
      throw error;
    }
  };

  const onClickMovetoAdditionalInfoPageWithData = () => {
    navigate('/additionalinfo', { state: parsedData }); // parsedData를 전달
  };

  const onClickDirectInputButton = () => {
    navigate('/additionalinfo', { state: { fromScanPage: true } });
  };

  return (
    <div className="relative w-full h-screen">
      {/* 카메라 화면 */}
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        className="absolute top-0 left-0 w-full h-full"
        videoConstraints={{ facingMode: 'environment' }}
      />

      {/* 명함 바운더리 */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div
          className="border-2 border-red-500 relative"
          style={{ aspectRatio: '16 / 10', width: '80%' }}
        >
          <p className="text-white text-center absolute bottom-2 w-full">
            명함을 이 영역에 맞춰주세요
          </p>
        </div>
      </div>

      {/* 촬영 버튼 */}
      <div className="absolute bottom-10 w-full flex justify-center gap-2">
        <Button onClick={capturePhoto} className="bg-blue-500 text-white">
          촬영하기
        </Button>
        {/* 직접 입력 버튼 */}
        <Button variant="outline" onClick={onClickDirectInputButton}>
          직접 입력
        </Button>
      </div>

      {/* Drawer 컴포넌트 */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="min-h-screen">
          <DrawerHeader>
            <DrawerTitle>촬영된 이미지</DrawerTitle>
            <Separator />
          </DrawerHeader>

          {/* 캡처된 이미지 및 데이터 표시 */}
          {!loading && !geminiLoading && capturedImage && (
            <div className="flex flex-col items-center mt-2 overflow-y-auto max-h-[70vh] px-4">
              {/* 캡처된 이미지 */}
              <img
                src={capturedImage}
                alt="Captured Business Card"
                className="w-full max-w-sm h-auto mb-4 rounded-md shadow-md"
              />

              {/* 데이터 매핑 결과 */}
              <div className="w-full space-y-2 text-sm">
                {Object.entries(parsedData).map(([key, value]) => (
                  <p key={key} className="text-left">
                    <span className="font-medium capitalize">{key}:</span> {value || '없음'}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <DrawerFooter className="flex justify-end gap-2 mt-4 px-4">
            <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>
              재촬영
            </Button>
            <Button variant="default" onClick={onClickMovetoAdditionalInfoPageWithData}>
              완료
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default RealCardScanPage;
