/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import { Button } from '@components/commons/Button/Button';
import { Header } from '@components/commons/Header/Header';
import { HeaderLeft } from '@components/commons/Header/HeaderLeft';
import { HeaderRight } from '@components/commons/Header/HeaderRight';
import { Switch } from '@components/ui/switch';
import { Trash2, ChevronLeft, Info } from 'lucide-react';
import Modal from '@components/commons/Modal/Modal';
import { SocialIcon } from '@components/AdditionalInfoPage/SocialIcon';
import BottomSheet from '@components/commons/BottomSheet/BottomSheet';
import { PinIcon } from '@components/commons/BottomSheet/Icon/Icons';

const github = SocialIcon.find((item) => item.id === 'github');
const linkedin = SocialIcon.find((item) => item.id === 'linkedin');
const none = SocialIcon.find((item) => item.id === 'none');

export default function CardSettingsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  return (
    <div className="font-[NanumGothic] p-4 bg-[var(--bg-default-black)] text-white min-h-screen ">
      {/* Header */}
      <Header className="flex items-center justify-between mb-6 pl-[4px]">
        <HeaderLeft>
          <button onClick={() => -1} className="p-2">
            <ChevronLeft className="w-6 h-6 text-[var(--fill-white)]" />
          </button>
        </HeaderLeft>
        <Header.Center>
          <h1 className="text-lg font-bold">설정</h1>
        </Header.Center>
        <HeaderRight>
          <button onClick={() => setIsInfoOpen(true)}>
            <Info className="w-6 h-6" />
          </button>
        </HeaderRight>
      </Header>

      {/* 대표 명함 설정 */}
      <div className="bg-[#FFFFFF0D] p-4 rounded-[4px] mb-[10px] flex items-center space-x-2">
        <PinIcon className="w-5 h-5 text-white" />
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
        {none && <SettingRow label={none.label} icon={none.icon} defaultChecked />}
        {linkedin && <SettingRow label={linkedin.label} icon={linkedin.icon} defaultChecked />}
        {github && <SettingRow label={github.label} icon={github.icon} defaultChecked />}
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

      {/* info 바텀시트 */}
      <BottomSheet
        open={isInfoOpen}
        onOpenChange={setIsInfoOpen}
        title="명함 정보 공개 설정 안내"
        subtitle={
          <>
            네트워킹에서 보여지는 정보를 선택할 수 있어요.
            <br />
            공개된 정보는 추천 명함, 검색, QR 공유 등에서 사용돼요.
          </>
        }
      >
        {/* 컨텐츠 영역 */}
        <BottomSheet.Content className="gap-[10px]">
          <div className="bg-[#FFFFFF0D] rounded-[4px] space-y-[10px] p-4">
            <div className="flex items-center gap-1 text-[var(--text-primary)] text-[14px]">
              <PinIcon className="w-5 h-5 text-white" />
              대표 명함으로 설정하기
            </div>
            <div className="text-[var(--text-secondary)]  text-[12px]">
              대표 명함은 온라인 공개용으로 1개만 설정돼요.
              <br />
              대표 명함이 아니어도 QR 스캔과 공유는 자유롭게 가능해요
            </div>
          </div>

          <div className="bg-[#FFFFFF0D] rounded-[4px] space-y-[10px] p-4">
            <div className="text-[var(--text-primary)] text-[14px]">기본 정보</div>
            <div className="text-[var(--text-secondary)] text-[12px]">
              이름, 직무, 세부 직무는 네트워킹을 위한 기본 정보예요.
              <br />
              항상 공개되며 추천 명함과 검색에 활용돼요.
            </div>
          </div>
          <div className="bg-[#FFFFFF0D] rounded-[4px] space-y-[10px] p-4">
            <div className="text-[var(--text-primary)] text-[14px]">온라인 네트워킹</div>
            <div className="text-[var(--text-secondary)] text-[12px]">
              온라인 리스트 노출 여부와 연결 상태를 자유롭게 조절할 수 있어요.언제든 변경 가능하며,
              연결은 QR이나 링크로도 이루어질 수 있어요!
            </div>
          </div>
        </BottomSheet.Content>

        {/* 버튼 영역 */}
        <BottomSheet.Actions>
          <BottomSheet.Actions.ButtonGroup
            primaryLabel="확인했어요"
            onPrimary={() => setIsInfoOpen(false)}
          />
        </BottomSheet.Actions>
      </BottomSheet>

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
  icon,
}: {
  label: string;
  defaultChecked?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <div className="py-[18px] font-regular flex items-center justify-between">
      <div className="flex items-center space-x-2">
        {icon && <div className="w-5 h-5 flex items-center justify-center">{icon}</div>}
        <span>{label}</span>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}
