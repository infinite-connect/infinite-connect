import React, { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from '@components/ui/carousel';
import { Button } from '@components/ui/button';
import Card from '@components/commons/Card/Card';
import { Icon } from '@iconify/react'; // Iconify 아이콘 컴포넌트

const UserPage = (): React.JSX.Element => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

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
            {/* 첫 번째 카드 */}
            <CarouselItem>
              <Card isGlossy={true} isMobile={false} isInteractive={false} cardColor="#1E90FF" />
            </CarouselItem>

            {/* 두 번째 카드 */}
            <CarouselItem>
              <Card isGlossy={true} isMobile={false} isInteractive={false} cardColor="#FF6347" />
            </CarouselItem>

            {/* 세 번째 카드 */}
            <CarouselItem>
              <Card isGlossy={true} isMobile={false} isInteractive={false} cardColor="#32CD32" />
            </CarouselItem>

            {/* 추가 버튼 카드 */}
            <CarouselItem>
              <Button
                variant="outline"
                className="w-full h-full border-dashed border-2 border-gray-400 rounded-md flex items-center justify-center"
              >
                <span className="text-gray-400 text-5xl font-bold">+</span>
              </Button>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>

      {/* Indicators */}
      <div className="flex gap-2 mt-25">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => carouselApi?.scrollTo(index)} // 해당 슬라이드로 이동
            className={`w-3 h-3 rounded-full transition-colors flex items-center justify-center ${
              selectedIndex === index ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          >
            {/* 추가 버튼 카드의 인디케이터에만 Iconify plus 아이콘 표시 */}
            {index === scrollSnaps.length - 1 ? (
              <Icon icon="mdi:plus" className="text-white text-xs" />
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserPage;
