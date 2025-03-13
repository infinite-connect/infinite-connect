// FullScreenPopup.tsx
import React from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent } from '@components/ui/dialog';

interface FullScreenPopupProps {
  open: boolean;
  onClose: () => void; // X 버튼용: 단순 닫기
  onDontShowAgain: () => void; // "다시 보지 않기"- 닫고 로컬스토리지 저장
}
const FullScreenPopup: React.FC<FullScreenPopupProps> = ({
  open,
  onClose,
  onDontShowAgain,
}): React.JSX.Element => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        hideCloseButton
        className="
          !fixed !inset-0 !w-full !h-full !max-w-none !max-h-none 
          !translate-x-0 !translate-y-0 !rounded-none !border-none !shadow-none
          p-0 flex flex-col
        "
      >
        {/* X 버튼: 단순 닫기 (팝업이 다음에 다시 뜰 수 있음) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white opacity-80 hover:opacity-100"
        >
          <X size={24} />
        </button>

        {/* 전체 화면 영역 중앙 정렬 */}
        <div className="flex-1 flex flex-col justify-center items-center bg-gray-900 text-white">
          <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg text-center">
            <p className="text-lg font-semibold mb-4">
              네트워킹 리스트 페이지는 이런 페이지입니다.
            </p>
            <p className="text-gray-400 mb-6">안내 문구</p>
            {/* "다시 보지 않기" 버튼: 닫고 로컬스토리지에 기록 */}
            <button className="w-full bg-gray-700 py-3 rounded-lg" onClick={onDontShowAgain}>
              다시 보지 않기
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FullScreenPopup;
