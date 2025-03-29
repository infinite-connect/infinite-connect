import React from 'react';
import { RefreshCcw, X } from 'lucide-react';
import { Badge } from '@components/ui/badge';
import { cn } from '@lib/utils';
import { Button } from '@components/commons/Button/Button';
import { Header } from '@components/commons/Header/Header';
import { IconButton } from '@components/commons/Button/IconButton';
import { Logo } from '@components/commons/Header/Logo';

export type FilterValues = {
  year: string;
  job: string;
  subJob: string;
  interests: string[];
};

type FilterOptions = {
  years: string[];
  jobs: string[];
  subJobsMap: Record<string, string[]>;
  interests: string[];
};

type FullScreenFilterProps = {
  values: FilterValues;
  onChange: (values: FilterValues) => void;
  onApply: (values: FilterValues) => void;
  onClose: () => void;
  options: FilterOptions;
};

export const FullScreenFilter: React.FC<FullScreenFilterProps> = ({
  values,
  onChange,
  onApply,
  onClose,
  options,
}) => {
  const handleSingleSelect = (key: keyof FilterValues, value: string) => {
    onChange({ ...values, [key]: values[key] === value ? '' : value });
  };

  const handleInterestToggle = (interest: string) => {
    const alreadySelected = values.interests.includes(interest);
    if (alreadySelected) {
      onChange({
        ...values,
        interests: values.interests.filter((i) => i !== interest),
      });
    } else if (values.interests.length < 5) {
      onChange({
        ...values,
        interests: [...values.interests, interest],
      });
    }
  };

  const handleReset = () => {
    onChange({ year: '', job: '', subJob: '', interests: [] });
  };

  const subJobs = values.job ? options.subJobsMap[values.job] || [] : [];

  return (
    <div className="fixed inset-0 z-50 bg-[var(--bg-default-black)] flex flex-col p-5 ">
      {/* Header */}
      <Header>
        <Header.Left>
          <Logo />
        </Header.Left>

        <Header.Right>
          <IconButton icon={<X className="stroke-white" />} onClick={onClose} />
        </Header.Right>
      </Header>

      {/*  body */}
      <div className="flex-1 overflow-y-auto space-y-8 mt-6 pb-[100px] scrollbar-hide">
        {/* 연차 */}
        <section className="flex flex-col gap-[14px]">
          <h2 className="font-medium text-[var(--text-primary)] ">연차</h2>
          <div className="flex flex-wrap gap-[14px]">
            {options.years.map((year) => {
              const isSelected = values.year === year;

              return (
                <Badge
                  key={year}
                  onClick={() => handleSingleSelect('year', year)}
                  className={cn(
                    'px-3 py-1 text-sm font-medium rounded-[6px] cursor-pointer transition-colors',
                    isSelected
                      ? 'border border-[#7253FF] bg-[rgba(114,83,255,0.25)] text-[var(--text-primary)]'
                      : 'border border-white/20 text-white/70',
                  )}
                >
                  {year}
                </Badge>
              );
            })}
          </div>
        </section>

        {/* 직무 */}
        <section className="flex flex-col gap-[14px]">
          <h2 className="font-medium text-[var(--text-primary)] ">직무</h2>
          <div className="flex flex-wrap gap-[14px]">
            {options.jobs.map((job) => {
              const isSelected = values.job === job;

              return (
                <Badge
                  key={job}
                  onClick={() => handleSingleSelect('job', job)}
                  className={cn(
                    'px-3 py-1 text-sm font-medium rounded-[6px] cursor-pointer transition-colors',
                    isSelected
                      ? 'border border-[#7253FF] bg-[rgba(114,83,255,0.25)] text-[var(--text-primary)]'
                      : 'border border-white/20 text-white/70',
                  )}
                >
                  {job}
                </Badge>
              );
            })}
          </div>
        </section>

        {/* 세부 직무 */}
        {values.job && subJobs.length > 0 && (
          <section className="flex flex-col gap-[14px]">
            <h2 className="font-medium text-[var(--text-primary)]">세부 직무</h2>
            <div className="flex flex-wrap gap-[14px]">
              {subJobs.map((sub) => {
                const isSelected = values.subJob === sub;

                return (
                  <Badge
                    key={sub}
                    onClick={() => handleSingleSelect('subJob', sub)}
                    className={cn(
                      'px-3 py-1 text-sm font-medium rounded-[6px] cursor-pointer transition-colors',
                      isSelected
                        ? 'border border-[#7253FF] bg-[rgba(114,83,255,0.25)] text-[var(--text-primary)]'
                        : 'border border-white/20 text-white/70',
                    )}
                  >
                    {sub}
                  </Badge>
                );
              })}
            </div>
          </section>
        )}

        {/* 관심사 */}
        <section className="flex flex-col gap-[14px]">
          <h2 className="font-medium text-[var(--text-primary)] ">
            관심사 ({values.interests.length}/5)
          </h2>
          <p className="text-sm text-[var(--text-tertiary)]">
            * 관심사는 다중 선택이 가능하며 최대 5개까지 선택할 수 있어요
          </p>
          <div className="flex flex-wrap gap-[12px]">
            {options.interests.map((interest) => {
              const isSelected = values.interests.includes(interest);
              const isDisabled = !isSelected && values.interests.length >= 5;

              return (
                <Badge
                  key={interest}
                  onClick={() => handleInterestToggle(interest)}
                  className={cn(
                    'px-3 py-1 text-sm font-medium rounded-[6px] cursor-pointer transition-colors',
                    isSelected
                      ? 'border border-[#7253FF] bg-[rgba(114,83,255,0.25)] text-[var(--text-primary)]'
                      : 'border border-white/20 text-white/70',
                    isDisabled && 'opacity-50 pointer-events-none',
                  )}
                >
                  {interest}
                </Badge>
              );
            })}
          </div>
        </section>
      </div>

      {/* Footer (fixed) */}
      <div className="fixed bottom-0 left-0 w-full z-50 px-6 pb-10 pt-4 bg-[var(--bg-default-black)]">
        <div className="flex items-center gap-[10px] ">
          <Button
            size="icon"
            className="bg-[var(--fill-secondary)] hover:bg-[var(--fill-secondary-hover)] "
          >
            <RefreshCcw onClick={handleReset}></RefreshCcw>
          </Button>
          <Button
            className="flex-1 text-base font-semibold py-4 rounded-[6px]"
            onClick={() => onApply(values)}
          >
            적용하기
          </Button>
        </div>
      </div>
    </div>
  );
};
