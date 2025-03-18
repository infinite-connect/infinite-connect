import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from '@components/ui/carousel';
import { Button } from '@components/ui/button';
import Card from '@components/commons/Card/Card';
import { Icon } from '@iconify/react'; // Iconify 아이콘 컴포넌트
import { useGetUserBusinessCardsQuery } from '@features/UserPage/api/userCardListApi';

const MAX_CARDS = 3;

const UserPage = (): React.JSX.Element => {
  const { userId } = useParams<{ userId: string }>();
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const { data: cardIds, isLoading, error } = useGetUserBusinessCardsQuery(userId || '');

  // 현재 선택된 슬라이드 업데이트
  useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => {
      setSelectedIndex(carouselApi.selectedScrollSnap());
    };

    setScrollSnaps(carouselApi.scrollSnapList());
    carouselApi.on('select', onSelect);

    return () => {
      carouselApi.off('select', onSelect);
    };
  }, [carouselApi]);

  useEffect(() => {
    if (cardIds) {
      console.log('Fetched card IDs:', cardIds[0]);
    }
  }, [cardIds]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching card IDs</p>;

  const showAddButton = cardIds!.length < MAX_CARDS;

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="relative w-[300px] h-[400px]">
        {/* Carousel */}
        <Carousel
          className="w-full h-full"
          opts={{
            loop: false, // 단방향으로 설정
            align: 'center',
          }}
          setApi={setCarouselApi}
        >
          <CarouselContent>
            {/* 조회한 명함 개수만큼 Card 컴포넌트 렌더링 */}
            {cardIds?.map((cardId, index) => (
              <CarouselItem key={cardId}>
                <Card
                  isGlossy={true}
                  isMobile={false}
                  isInteractive={false}
                  cardId={cardIds[index]}
                  nickname={userId}
                  cardColor={index % 2 === 0 ? '#1E90FF' : '#FF6347'} // 색상은 임의로 설정
                />
              </CarouselItem>
            ))}

            {/* 추가 버튼 카드 (카드 개수가 MAX_CARDS보다 적을 때만 표시) */}
            {showAddButton && (
              <CarouselItem>
                <Button
                  variant="outline"
                  className="w-full h-full border-dashed border-2 border-gray-400 rounded-md flex items-center justify-center"
                >
                  <span className="text-gray-400 text-5xl font-bold">+</span>
                </Button>
              </CarouselItem>
            )}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Indicators */}
      <div className="flex gap-2 mt-25">
        {scrollSnaps.map(
          (_, index) =>
            index < cardIds!.length + (showAddButton ? 1 : 0) && ( // 인디케이터 개수 제한
              <button
                key={index}
                onClick={() => carouselApi?.scrollTo(index)} // 해당 슬라이드로 이동
                className={`w-3 h-3 rounded-full transition-colors flex items-center justify-center ${
                  selectedIndex === index ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              >
                {/* 추가 버튼 카드의 인디케이터에만 Iconify plus 아이콘 표시 */}
                {showAddButton && index === scrollSnaps.length - 1 ? (
                  <Icon icon="mdi:plus" className="text-white text-xs" />
                ) : null}
              </button>
            ),
        )}
      </div>
    </div>
  );
};

export default UserPage;
