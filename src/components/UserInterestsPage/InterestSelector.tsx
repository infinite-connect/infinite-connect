import { useState } from 'react';
import { Button } from '@components/ui/button';
import { useNavigate } from 'react-router-dom';

const InterestSelector = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const maxSelection = 5;
  const navigate = useNavigate();

  const interests = [
    'React',
    'TypeScript',
    'CSS',
    'HTML5',
    'AWS',
    'Figma',
    'Spring',
    'Chakra UI',
    'Shadcn UI',
    'Python',
    'JAVA',
    'JavaScript',
    'C/C++',
    'Kotlin',
    'Tailwind CSS',
  ];

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((item) => item !== interest));
    } else if (selectedInterests.length < maxSelection) {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const onClickCardPreviewPage = () => {
    navigate('/cardPreview');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-black p-4">
      <h1 className="text-lg font-bold mb-2">관심사는 무엇인가요?</h1>
      <p className="text-sm text-gray-400 mb-2">나를 나타내는 관심사, 이제 명함에 공유해 보세요.</p>
      <p className="text-sm text-gray-400 mb-6">최대 5개까지 선택할 수 있습니다.</p>

      {/* 버튼 그룹 */}
      <div className="flex flex-wrap gap-2 justify-center">
        {interests.map((interest) => (
          <button
            key={interest}
            onClick={() => toggleInterest(interest)}
            className={`px-4 py-2 rounded-full border ${
              selectedInterests.includes(interest) ? 'border-green-500' : 'border-gray-600'
            } text-sm whitespace-nowrap bg-white-800 hover:bg-gray-700`}
          >
            {interest}
          </button>
        ))}
      </div>

      {/* 하단 버튼 */}
      <div className="mt-8 w-full max-w-md">
        <Button
          variant="default"
          disabled={selectedInterests.length === 0}
          className={`w-full py-3 rounded-lg ${
            selectedInterests.length === 0
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-green-500'
          }`}
          onClick={onClickCardPreviewPage}
        >
          완료 ({selectedInterests.length}/{maxSelection})
        </Button>
      </div>
      <div className="mt-2 w-full max-w-md">
        <Button
          variant="default"
          className={`w-full py-3 rounded-lg ${
            selectedInterests.length === 0 ? 'bg-gray-600 cursor-not-allowed' : 'bg-gray-600'
          }`}
          onClick={onClickCardPreviewPage}
        >
          건너뛰기
        </Button>
      </div>
    </div>
  );
};

export default InterestSelector;
