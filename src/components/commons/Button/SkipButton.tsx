import { useNavigate } from 'react-router-dom';

interface SkipButtonProps {
  to: string; // 이동할 경로
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state?: Record<string, any>;
}

export default function SkipButton({ to, state }: SkipButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to, state ? { state } : undefined)}
      className="text-[20px] font-semibold text-[var(--text-primary)] px-4 py-2"
    >
      Skip
    </button>
  );
}
