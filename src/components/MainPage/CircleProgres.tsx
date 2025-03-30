import { RootState } from '@store/store';
import { useSelector } from 'react-redux';

export default function CircleProgress() {
  const primaryCard = useSelector((state: RootState) => state.userBusinessCard.primaryCard);
  // interests가 존재하고 길이가 0보다 크면 true
  const hasInterests = primaryCard?.interests && primaryCard.interests.length > 0;

  // progress: 1이면 100%, 아니면 75%
  const progress = hasInterests ? 1 : 0.75;
  const displayText = hasInterests ? '5/5' : '4/5';

  return (
    <div className="flex items-center h-full">
      <div className="relative w-[58px] h-[58px]">
        <svg
          className="absolute top-0 left-0 w-full h-full transform -rotate-90"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke="rgba(255, 255, 255, 0.20)"
            strokeWidth="4"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke="url(#progress-gradient)"
            strokeWidth="4"
            strokeDasharray="251.2"
            strokeDashoffset={251.2 * (1 - progress)}
          />
          <defs>
            <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7B61FF" />
              <stop offset="100%" stopColor="#7B61FF" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[12px] text-[var(--text-tertiary)] font-medium">
          {displayText}
        </div>
      </div>
    </div>
  );
}
