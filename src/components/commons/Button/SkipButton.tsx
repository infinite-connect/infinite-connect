import { useNavigate } from 'react-router-dom';

interface SkipButtonProps {
  to: string; // 이동할 경로
}

export default function SkipButton({ to }: SkipButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className="text-[20px] font-semibold text-[var(--text-primary)] px-4 py-2"
    >
      Skip
    </button>
  );
}
