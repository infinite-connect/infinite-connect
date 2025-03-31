import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@components/commons/Header/Header';
import { Logo } from '@components/commons/Header/Logo';
import { Button } from '@components/commons/Button/Button';
import SkipButton from '@components/commons/Button/SkipButton';
import { interests } from '@components/NetworkingListPage/FilterOptions';
import { useUpdateBusinessCardInterestsMutation } from '@features/BusinessCard/api/businessCardApi';

interface InterestSelectorProps {
  cardId: string;
}

const InterestSelector = ({ cardId }: InterestSelectorProps): React.JSX.Element => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const maxSelection = 5;
  const navigate = useNavigate();

  const [updateInterests] = useUpdateBusinessCardInterestsMutation();

  console.log(selectedInterests);

  const toggleInterest = (interestName: string) => {
    if (selectedInterests.includes(interestName)) {
      setSelectedInterests(selectedInterests.filter((item) => item !== interestName));
    } else if (selectedInterests.length < maxSelection) {
      setSelectedInterests([...selectedInterests, interestName]);
    }
  };

  const onClickCardPreviewPage = async () => {
    try {
      // 관심사 업데이트 API 호출
      await updateInterests({
        businessCardId: cardId,
        interests: selectedInterests,
      }).unwrap();

      navigate('/cardPreview', { state: { businessCardId: cardId } });
    } catch (error) {
      console.error('관심사 업데이트 실패:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-default-black)] px-4">
      {/* Header */}
      <Header className="px-[4px] bg-[var(--bg-default-black)]">
        <Header.Left>
          <Logo />
        </Header.Left>
        <Header.Right>
          <SkipButton to="/cardPreview" />
        </Header.Right>
      </Header>

      {/* 콘텐츠 영역: 텍스트 + 관심사 선택 */}
      <main className="flex flex-col flex-1 justify-center items-center text-center gap-2">
        {/* 텍스트 묶음 */}
        <div className="px-7 py-6 space-y-3">
          <h1 className="text-[22px] font-ExtraBold text-[var(--text-primary)] leading-snug">
            관심사를 등록하면
            <br />
            명함 교환율이 올라가요!
          </h1>
          <p className="text-[14px] text-[var(--text-secondary)]">
            더 풍부한 네트워킹을 경험하세요✨
          </p>
        </div>

        {/* 관심사 선택 그룹 */}
        <section className="flex flex-wrap justify-center gap-x-3 gap-y-4">
          {interests.map((name) => {
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
        </section>
      </main>

      {/* 하단 버튼 */}
      <div className="w-full mt-auto mb-[40px]">
        <Button
          btntype={selectedInterests.length === 0 ? 'disabled' : 'enabled'}
          disabled={selectedInterests.length === 0}
          onClick={onClickCardPreviewPage}
        >
          완료 ({selectedInterests.length}/{maxSelection})
        </Button>
      </div>
    </div>
  );
};

export default InterestSelector;
