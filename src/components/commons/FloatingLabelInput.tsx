import * as React from 'react';

import { cn } from '@lib/utils';
import { Input } from '@components/Input/input';
import { Label } from '@components/ui/label';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const FloatingInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return <Input placeholder=" " className={cn('peer', className)} ref={ref} {...props} />;
  },
);
FloatingInput.displayName = 'FloatingInput';

const FloatingLabel = React.forwardRef<
  React.ComponentRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
  return (
    <Label
      className={cn(
        // 기본 상태: 라벨의 초기 스타일
        'absolute start-2 top-2 z-10 origin-[0] scale-75 transform bg-transparent px-2 text-sm text-gray-500 duration-300 cursor-text transition-all',

        // 상태 1: blur 상태 & 내용물이 없을 때 (placeholder 위치)
        'peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500',

        // 상태 2: focus 상태 (border 근처로 이동)
        'peer-focus:top-[2px] peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-3 bg-gray-800',

        // 상태 3: blur 상태 & 내용물이 있을 때 (input 위에 위치)
        'peer-not-placeholder-shown:top-[-5px] peer-not-placeholder-shown:-translate-y-4 peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:text-gray-500',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
FloatingLabel.displayName = 'FloatingLabel';

type FloatingLabelInputProps = InputProps & { label?: string };

const FloatingLabelInput = React.forwardRef<
  React.ComponentRef<typeof FloatingInput>,
  React.PropsWithoutRef<FloatingLabelInputProps>
>(({ id, label, ...props }, ref) => {
  return (
    <div className="relative">
      <FloatingInput ref={ref} id={id} {...props} />
      <FloatingLabel htmlFor={id}>{label}</FloatingLabel>
    </div>
  );
});
FloatingLabelInput.displayName = 'FloatingLabelInput';

export { FloatingInput, FloatingLabel, FloatingLabelInput };
