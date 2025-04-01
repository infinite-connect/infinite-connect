import { useState } from 'react';
import { Button } from '@components/commons/Button/Button';
import { Header } from '@components/commons/Header/Header';
import { HeaderLeft } from '@components/commons/Header/HeaderLeft';
import { HeaderRight } from '@components/commons/Header/HeaderRight';
import { Switch } from '@components/ui/switch';
import { Trash2, Pin, ChevronLeft } from 'lucide-react';
import Modal from '@components/commons/Modal/Modal';

export default function CardSettingsPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4 bg-[var(--bg-default-black)] text-white min-h-screen ">
      {/* Header */}
      <Header className="flex items-center justify-between mb-6 pl-[4px]">
        <HeaderLeft>
          <button onClick={() => -1} className="p-2">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
        </HeaderLeft>
        <Header.Center>
          <h1 className="text-lg font-bold">설정</h1>
        </Header.Center>
        <HeaderRight>
          <button>
            <Pin className="text-white" />
          </button>
        </HeaderRight>
      </Header>

      {/* 대표 명함 설정 */}
      <div className="bg-[#FFFFFF0D] p-4 rounded-[4px] mb-[10px] flex items-center space-x-2">
        <Pin size={16} />
        <span>대표 명함으로 설정하기</span>
      </div>

      {/* 경력 정보 */}
      <Section title="경력 정보">
        <SettingRow label="회사" defaultChecked />
        <SettingRow label="연차" defaultChecked />
      </Section>

      {/* 연락처 */}
      <Section title="연락처">
        <SettingRow label="PHONE" />
        <SettingRow label="EMAIL" defaultChecked />
        <SettingRow label="URL" defaultChecked />
        <SettingRow label="Linkedin" />
        <SettingRow label="Github" />
      </Section>

      {/* 온라인 네트워킹 */}
      <Section title="온라인 네트워킹">
        <SettingRow label="리스트에 공개" defaultChecked />
        <SettingRow label="네트워킹 모드" defaultChecked />
        <SettingRow label="명함 교환 알림" defaultChecked />
      </Section>

      {/* 기타 */}
      <Section title="기타">
        <SettingRow label="관심사" />
      </Section>

      {/* 삭제 버튼 */}
      <Button btntype="delete" className="text-red-500 w-full mt-6" onClick={() => setIsOpen(true)}>
        <Trash2 className="mr-2 h-4 w-4" />내 명함 삭제하기
      </Button>

      {/* 삭제 확인 모달 */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="이 명함을 정말 삭제하시겠어요?"
        description={`삭제하면 되돌릴 수 없어요\n공유했던 링크와 QR도 모두 사용할 수 없어요`}
        primaryButton={{
          label: '삭제하기',
          onClick: () => {
            console.log('삭제 처리 실행');
            setIsOpen(false);
          },
          btntype: 'modalError',
        }}
        secondaryButton={{
          label: '돌아가기',
          btntype: 'modalSecondary',
          onClick: () => setIsOpen(false),
        }}
      />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="text-[14px] bg-[#FFFFFF0D] p-4 rounded-[4px] mb-[10px]">
      <h2 className=" font-bold pb-3">{title}</h2>
      <div className="[&>*]:py-[18px] [&>*]:border-b [&>*]:border-white/10 [&>*]:last:border-b-0">
        {children}
      </div>
    </div>
  );
}

function SettingRow({
  label,
  defaultChecked = false,
}: {
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <div className="py-[18px] font-regular flex items-center justify-between">
      <span>{label}</span>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}
