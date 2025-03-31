import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { toast } from 'sonner';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from '@components/commons/Header/Header';
import { ChevronLeft } from 'lucide-react';
import { IconButton } from '@components/commons/Button/IconButton';
import SkipButton from '@components/commons/Button/SkipButton';
import { Pencil1Icon, CameraIcon } from '@radix-ui/react-icons';
import useWindowHeight from '@hooks/useWindowHeight';
import useWindowWidth from '@hooks/useWindowWidth';
import { Dialog, DialogContent } from '@components/ui/dialog';
import { Button } from '@components/commons/Button/Button';
import { FIELD_MAPPINGS } from '@constants/realCardScanConstants';

export interface ParsedData {
  name: string;
  email: string;
  company: string;
  job_title: string;
  jobTitle?: string;
  department: string;
  phone: string;
  fax: string;
  business_address: string;
  business_website: string;
}

const RealCardScanPage = (): React.JSX.Element => {
  const webcamRef = useRef<Webcam>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const businessCardId = location.state?.businessCardId || '';
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [parsedData, setParsedData] = useState<ParsedData>({
    name: '',
    email: '',
    company: '',
    job_title: '',
    department: '',
    phone: '',
    fax: '',
    business_address: '',
    business_website: '',
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
      setIsModalOpen(true); // Drawer 열기
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
                    text: `Extract the following fields from the text:\n\n1. company\n2. job_title\n3. department\n4. fax\n5. business_address\n6. business_website\n6. \n\nText:\n${text}\n\nReturn the result as plain JSON without any code block or formatting. job_title means position. department means team where he or she works in the company`,
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
        company: '회사명 없음',
        jobTitle: '직책 없음',
        department: '부서 없음',
        fax: '팩스 없음',
        business_address: '주소 없음',
        business_website: '홈페이지 없음',
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

  const windowHeight = useWindowHeight();
  const windowWidth = useWindowWidth();

  return (
    <div className="flex flex-col justify-center items-center h-screen box-border bg-[var(--bg-default-black)]">
      <Header className="px-[16px] bg-[var(--bg-default-black)]">
        <Header.Left>
          <IconButton
            icon={<ChevronLeft className="w-7 h-7" />}
            onClick={onClickDirectInputButton}
          />
          <span className="font-semibold text-[20px] text-white leading-[h] tracking-[-0.62px]">
            명함 촬영
          </span>
        </Header.Left>
        <Header.Right>
          <SkipButton to="/cardPreview" state={{ businessCardId: businessCardId }} />
        </Header.Right>
      </Header>
      {/* 카메라 화면 */}
      <div className="flex-grow w-full relative">
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          className="absolute inset-0 w-full h-full object-cover"
          videoConstraints={{
            facingMode: 'environment',
            width: { ideal: windowWidth },
            height: { ideal: windowHeight - 176 },
          }}
        />
      </div>

      {/* 촬영 버튼 */}
      <div className="h-[120px] w-full flex items-center">
        {/* 왼쪽 빈 공간 */}
        <div className="flex-1"></div>

        {/* 중앙 촬영 버튼 */}
        <div className="flex-1 flex justify-center">
          <Button
            onClick={capturePhoto}
            className="w-[80px] h-[80px] border-1 border-[#ffffff] rounded-[50px] p-0 bg-white/20"
          >
            <div className="w-[56px] h-[56px] border-2 rounded-[50px] bg-[#ffffff]" />
          </Button>
        </div>

        {/* 오른쪽 직접 입력 버튼 */}
        <div className="flex-1 h-[58px] flex items-center justify-center">
          <button
            onClick={onClickDirectInputButton}
            className="h-[58px] flex flex-col items-center p-0 gap-[6px] text-white"
          >
            <Pencil1Icon className="w-7 h-7" />
            <span className="text-[12px] leading-[200%]">직접 입력</span>
          </button>
        </div>
      </div>

      {/* Drawer 컴포넌트 */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent
          hideCloseButton
          className="
            !fixed !inset-0 !w-full !h-full !max-w-none !max-h-none 
            !translate-x-0 !translate-y-0 !rounded-none !border-none !shadow-none
            p-0 flex flex-col bg-[var(--bg-default-black)] space-y-0 gap-0
          "
        >
          <Header className="px-[16px] bg-transparent fixed left-0 z-12">
            <Header.Left>
              <IconButton
                icon={<ChevronLeft className="w-7 h-7" />}
                onClick={() => setIsModalOpen(false)}
              />
              <span className="font-semibold text-[20px] text-white leading-[127.3%] tracking-[-0.62px]">
                스캔 정보 확인
              </span>
            </Header.Left>
          </Header>
          <div className="flex flex-col justify-center items-center mt-14 h-[113px] py-7 px-6 gap-[6px]">
            <div className="text-white text-[18px] leading-[150%] tracking-[-0.27px]">
              입력된 정보가 맞는지 확인해주세요!
            </div>
            <div className="text-white/80 text-[14px] leading-[24px]">
              스캔된 명함에서 자동으로 가져왔어요
            </div>
          </div>

          {/* 스크롤 가능한 컨테이너 */}
          <div className="flex-1 overflow-y-auto pb-48">
            {!loading && !geminiLoading && capturedImage && (
              <div className="flex flex-col items-center px-4">
                {/* 캡처된 이미지 */}
                <img
                  src={capturedImage}
                  alt="Captured Business Card"
                  className="w-full max-w-sm h-auto mb-10"
                />
              </div>
            )}
            {!loading && !geminiLoading && capturedImage && (
              <div className="flex flex-col items-center py-[16px] bg-white/5">
                {/* 데이터 매핑 결과 */}
                <div className="w-full space-y-4 text-sm mt-4 px-5 text-[14px]">
                  {FIELD_MAPPINGS.map((field) => (
                    <p
                      key={field.key}
                      className="h-[57px] flex justify-between text-left text-white border-b border-[#292929] last:border-b-0"
                    >
                      <span className="text-[14px] leading-[150%]">{field.label}</span>
                      <span className="text-[14px] leading-[150%] font-semibold">
                        {field.fallbackKey
                          ? parsedData[field.key] || parsedData[field.fallbackKey] || '없음'
                          : parsedData[field.key] || '없음'}
                      </span>
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer - 고정 위치 */}
          <div className="fixed h-[140px] bottom-0 left-0 right-0 bg-[var(--bg-default-black)] p-4">
            <div className="flex flex-col justify-end gap-2">
              <Button
                btntype="enabled"
                className="flex justify-center items-center gap-[6px]"
                onClick={() => setIsModalOpen(false)}
              >
                <CameraIcon />
                다시 촬영하기
              </Button>
              <Button
                btntype="enabled"
                className="flex justify-center items-center gap-[6px]"
                onClick={onClickMovetoAdditionalInfoPageWithData}
              >
                <Pencil1Icon />
                확인 후 추가 입력하기
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RealCardScanPage;
