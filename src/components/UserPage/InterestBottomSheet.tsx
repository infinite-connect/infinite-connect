import { useEffect, useState } from 'react';
import { interests } from '@components/NetworkingListPage/FilterOptions';
import { BottomSheet } from '@components/commons/BottomSheet/BottomSheet';

interface InterestBottomSheetProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSave?: (selected: string[]) => void;
  max?: number;
  initialSelected: string[];
}

const InterestBottomSheet = ({
  open,
  setOpen,
  onSave,
  max = 5,
  initialSelected,
}: InterestBottomSheetProps) => {
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    if (open) {
      setSelected(initialSelected);
    }
  }, [open, initialSelected]);

  const toggle = (name: string) => {
    if (selected.includes(name)) {
      setSelected(selected.filter((item) => item !== name));
    } else if (selected.length < max) {
      setSelected([...selected, name]);
    }
  };

  return (
    <BottomSheet
      open={open}
      onOpenChange={setOpen}
      title="관심사"
      subtitle={`관심사는 최대 ${max}개까지 선택할 수 있어요`}
    >
      <BottomSheet.Content>
        <section className="flex flex-wrap justify-center gap-x-3 gap-y-4 mb-5">
          {interests.map((name) => {
            const isSelected = selected.includes(name);
            const isDisabled = !isSelected && selected.length >= max;

            return (
              <div
                key={name}
                onClick={() => !isDisabled && toggle(name)}
                className={`px-3 py-1 text-sm font-medium rounded-[6px] cursor-pointer transition-colors
                  ${
                    isSelected
                      ? 'border border-[#7253FF] bg-[rgba(114,83,255,0.25)] text-[var(--text-primary)]'
                      : 'border border-white/20 text-white/70'
                  }
                  ${isDisabled ? 'opacity-50 pointer-events-none' : ''}
                `}
              >
                {name}
              </div>
            );
          })}
        </section>
      </BottomSheet.Content>

      <BottomSheet.Actions.ButtonGroup
        primaryLabel={`저장하기 (${selected.length}/${max})`}
        onPrimary={() => {
          onSave?.(selected);
          setOpen(false);
        }}
      />
    </BottomSheet>
  );
};

export default InterestBottomSheet;
