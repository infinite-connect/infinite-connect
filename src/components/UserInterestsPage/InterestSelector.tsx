import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@components/commons/Header/Header';
import { Logo } from '@components/commons/Header/Logo';
import { Button } from '@components/commons/Button/Button';

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
    <div className="flex flex-col bg-[var(--bg-default-black)] items-center text-center">
      <Header className="px-[20px] bg-[var(--bg-default-black)] top-0 left-0 ">
        <Header.Left>
          <Logo />
        </Header.Left>
        <Header.Right>
          <div>skip</div>
        </Header.Right>
      </Header>

      <div className=" flex flex-col items-center justify-center min-h-screen flex-1  px-4">
        <div className="px-6 py-7 space-y-3">
          <h1 className="text-[22px] font-bold text-[var(--text-primary)]">
            관심사를 등록하면
            <br />
            명함 교환율이 올라가요!
          </h1>
          <p className="text-[14px] text-[var(--text-secondary)] mb-6">
            더 풍부한 네트워킹을 경험하세요✨
          </p>
        </div>

        {/* 관심사 그룹 */}
        <section className="flex flex-col items-center">
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-4">
            {interests.map(({ name }) => {
              const isSelected = selectedInterests.includes(name);
              const isDisabled = !isSelected && selectedInterests.length >= maxSelection;

              return (
                <div
                  key={name}
                  onClick={() => !isDisabled && toggleInterest(name)}
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
          </div>
        </section>

        {/* 하단 버튼 */}
        <div className="mt-8 w-full">
          <Button
            btntype={selectedInterests.length === 0 ? 'disabled' : 'enabled'}
            disabled={selectedInterests.length === 0}
            onClick={onClickCardPreviewPage}
          >
            완료 ({selectedInterests.length}/{maxSelection})
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterestSelector;
