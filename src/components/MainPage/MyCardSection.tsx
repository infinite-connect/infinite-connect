import React from 'react';
import Slider from 'react-slick';
import VerticalCardPreview from '@components/commons/Card/VerticalCardPreview';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import CircleProgress from './CircleProgres';
import { Button } from '@components/commons/Button/Button';
import { useUpdateBusinessCardVisibilityMutation } from '@features/Networking/networkingApi';

const MyCardSection = (): React.JSX.Element => {
  const primaryCard = useSelector((state: RootState) => state.userBusinessCard.primaryCard);

  //  명함 공개 여부 업데이트
  const [updateBusinessCardVisibility] = useUpdateBusinessCardVisibilityMutation();

  if (!primaryCard) {
    return <div>로딩 중...</div>;
  }

  // 명함 공개 처리
  const handleConsentAgree = async () => {
    if (!primaryCard?.is_public) {
      try {
        await updateBusinessCardVisibility({
          business_card_id: primaryCard.business_card_id,
          is_public: true, // 공개 처리
        }).unwrap();
      } catch (error) {
        console.error('명함 공개 실패:', error);
      }
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <div className="mx-4 px-4 py-4 flex flex-col bg-[#1E1E1E] rounded-md">
      <h2 className="text-center text-[16px] font-[NanumGothicOTF] font-semibold">
        즐거운 저녁의 커넥터
      </h2>
      <h3 className="text-center text-[12px] font-[NanumGothicOTF] font-normal text-[var(--text-secondary)]">
        추가 정보를 작성하면 사람들과 더 쉽게 연결돼요
      </h3>
      <div className="">
        <Slider {...settings}>
          <div className="flex flex-col">
            <div className="flex flex-row gap-4">
              <VerticalCardPreview cardId={primaryCard?.business_card_id || ''} />
              <div className="w-full flex flex-col justify-between ali">
                <CircleProgress />
                <div className="bg-[rgba(255,255,255,0.05)] px-2 py-3 gap-2 flex flex-col">
                  <div className="flex justify-between text-[12px] font-normal font-[NanumGothicOTF]">
                    <p className="text-[var(--text-secondary)] ">저장된 내 명함</p>
                    <p className="">568</p>
                  </div>
                  <div className="flex justify-between text-[12px] font-normal font-[NanumGothicOTF]">
                    <p className="text-[var(--text-secondary)] ">받은 명함</p>
                    <p className="">568</p>
                  </div>
                  <div className="flex justify-between text-[12px] font-normal font-[NanumGothicOTF]">
                    <p className="text-[var(--text-secondary)] ">조회수</p>
                    <p className="">568</p>
                  </div>
                </div>
              </div>
            </div>
            {!primaryCard.is_public && (
              <Button onClick={handleConsentAgree} className="w-full mt-5">
                명함 공개하기
              </Button>
            )}
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default MyCardSection;
