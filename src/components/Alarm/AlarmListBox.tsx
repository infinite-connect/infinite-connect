import cardBg from '@assets/Alarm/CardBg.jpg';
import { getRelativeTime } from '@utils/getRelativeTime';
import { useNavigate } from 'react-router-dom';

interface AlarmListBoxProps {
  cardId: string;
  nickname: string;
  userName: string;
  createdAt: string;
}

const AlarmListBox = ({
  cardId,
  nickname,
  userName,
  createdAt,
}: AlarmListBoxProps): React.JSX.Element => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/${nickname}/${cardId}`);
      }}
      className="w-full flex items-center gap-4 p-2 bg-neutral-900 rounded"
    >
      {/* 프로필 이미지 자리 (임시) */}
      <img src={cardBg} />
      <div className="flex flex-col gap-1 w-full">
        <span className="text-sm font-bold">{nickname}</span>
        <div className="w-full flex justify-between">
          <span className="flex-1 text-xs text-gray-400">
            누군가 {userName}님과 연결되고 싶어 해요. <br />
            지금 확인해보세요!
          </span>
          <span className=" text-xs text-gray-500">{getRelativeTime(createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default AlarmListBox;
