import React from 'react';
import { X } from 'lucide-react';
import { Badge } from '@components/ui/badge';
import { cn } from '@lib/utils';
import { Button } from '@components/commons/Button/Button';

type FilterValues = {
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
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div className="text-lg font-semibold">서비스명</div>
        <button onClick={onClose}>
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        {/* 연차 */}
        <section>
          <h2 className="text-sm font-medium mb-2">연차</h2>
          <div className="flex flex-wrap gap-2">
            {options.years.map((year) => (
              <Badge
                key={year}
                variant={values.year === year ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => handleSingleSelect('year', year)}
              >
                {year}
              </Badge>
            ))}
          </div>
        </section>

        {/* 직무 */}
        <section>
          <h2 className="text-sm font-medium mb-2">직무</h2>
          <div className="flex flex-wrap gap-2">
            {options.jobs.map((job) => (
              <Badge
                key={job}
                variant={values.job === job ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => handleSingleSelect('job', job)}
              >
                {job}
              </Badge>
            ))}
          </div>
        </section>

        {/* 세부 직무 */}
        {values.job && subJobs.length > 0 && (
          <section>
            <h2 className="text-sm font-medium mb-2">세부 직무</h2>
            <div className="flex flex-wrap gap-2">
              {subJobs.map((sub) => (
                <Badge
                  key={sub}
                  variant={values.subJob === sub ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => handleSingleSelect('subJob', sub)}
                >
                  {sub}
                </Badge>
              ))}
            </div>
          </section>
        )}

        {/* 관심사 */}
        <section>
          <h2 className="text-sm font-medium mb-2">관심사 ({values.interests.length}/5)</h2>
          <div className="flex flex-wrap gap-2">
            {options.interests.map((interest) => {
              const isSelected = values.interests.includes(interest);
              const isDisabled = !isSelected && values.interests.length >= 5;

              return (
                <Badge
                  key={interest}
                  variant={isSelected ? 'default' : 'outline'}
                  className={cn('cursor-pointer', isDisabled && 'opacity-50 pointer-events-none')}
                  onClick={() => handleInterestToggle(interest)}
                >
                  {interest}
                </Badge>
              );
            })}
          </div>
        </section>
      </div>

      {/* Footer (fixed) */}
      <div className="fixed bottom-0 left-0 w-full z-50 border-t px-4 py-3 bg-white flex justify-between items-center">
        <Button onClick={handleReset}>초기화</Button>
        <Button onClick={() => onApply(values)}>적용하기</Button>
      </div>
    </div>
  );
};
