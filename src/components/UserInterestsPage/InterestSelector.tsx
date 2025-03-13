import { useState } from 'react';
import { Button } from '@components/ui/button';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

const InterestSelector = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const maxSelection = 5;
  const navigate = useNavigate();

  // 기술 스택과 아이콘 매핑
  const interests = [
    { name: 'React', icon: 'logos:react' },
    { name: 'TypeScript', icon: 'logos:typescript-icon' },
    { name: 'CSS', icon: 'logos:css-3' },
    { name: 'HTML5', icon: 'logos:html-5' },
    { name: 'AWS', icon: 'logos:aws' },
    { name: 'Figma', icon: 'logos:figma' },
    { name: 'Spring', icon: 'logos:spring' },
    { name: 'Chakra UI', icon: 'logos:chakraui' },
    { name: 'Shadcn UI', icon: 'logos:webflow' }, // 대체 아이콘 사용
    { name: 'Python', icon: 'logos:python' },
    { name: 'JAVA', icon: 'logos:java' },
    { name: 'JavaScript', icon: 'logos:javascript' },
    { name: 'C/C++', icon: 'logos:c-plusplus' }, // C++ 아이콘 사용
    { name: 'Kotlin', icon: 'logos:kotlin' },
    { name: 'Node.js', icon: 'logos:nodejs-icon' },
    { name: 'Svelte', icon: 'logos:svelte-icon' },
    { name: 'Vue.js', icon: 'logos:vue' },
    { name: 'AngularJS', icon: 'logos:angular-icon' },
    { name: 'jQuery', icon: 'logos:jquery' },
    { name: 'Django', icon: 'logos:django-icon' },
    { name: 'PHP', icon: 'logos:mysql' },
    { name: 'MySQL', icon: 'logos:mysql-icon' },
    { name: 'Oracle', icon: 'simple-icons:mysql' },
    { name: 'SwiftUI', icon: 'simple-icons:flutter' },
    { name: 'TensorFlow', icon: 'logos:tensorflow' },
    { name: 'Next.js', icon: 'logos:nextjs-icon' },
    { name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon' },
    { name: 'GraphQL', icon: 'logos:graphql' },
    { name: 'Docker', icon: 'logos:docker-icon' },
    { name: 'PostgreSQL', icon: 'logos:postgresql' },
    { name: 'MongoDB', icon: 'logos:mongodb-icon' },
    { name: 'Redis', icon: 'logos:redis' },
    { name: 'Prisma', icon: 'logos:prisma' },
    { name: 'Vite', icon: 'logos:vitejs' },
    { name: 'Jest', icon: 'logos:jest' },
    { name: 'Flutter', icon: 'logos:flutter' },
    { name: 'Rust', icon: 'logos:rust' },
    { name: 'Golang', icon: 'logos:go' },
    { name: 'Ruby on Rails', icon: 'logos:ruby-on-rails' },
    { name: 'Three.js', icon: 'logos:threejs' },
    { name: 'Solidity', icon: 'logos:solidity' },
  ];

  const toggleInterest = (interestName: string) => {
    if (selectedInterests.includes(interestName)) {
      setSelectedInterests(selectedInterests.filter((item) => item !== interestName));
    } else if (selectedInterests.length < maxSelection) {
      setSelectedInterests([...selectedInterests, interestName]);
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
        {interests.map(({ name, icon }) => (
          <Button
            key={name}
            variant="outline"
            onClick={() => toggleInterest(name)}
            className={`px-4 py-2 rounded-full flex items-center gap-2 ${
              selectedInterests.includes(name)
                ? 'border-2 border-green-500'
                : 'border border-gray-600'
            }`}
          >
            <Icon icon={icon} className="w-5 h-5" /> {/* 아이콘 추가 */}
            <span>{name}</span>
          </Button>
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
            selectedInterests.length === 0 ? 'bg-gray-600 cursor-not-allowed' : ''
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
