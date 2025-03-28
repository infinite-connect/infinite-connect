import React from 'react';
import Slider from 'react-slick';
import moringCard from '@assets/NetWorkTypeCard/morningCard.png';
const MyCardSection = (): React.JSX.Element => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <div className="mx-4 px-8 py-4 flex flex-col bg-[#1E1E1E] rounded-md">
      <h2 className="text-center text-[16px] font-[NanumGothicOTF] font-semibold">
        즐거운 저녁의 커넥터
      </h2>
      <h3 className="text-center text-[12px] font-[NanumGothicOTF] font-normal text-[var(--text-secondary)] mb-4">
        추가 정보를 작성하면 사람들과 더 쉽게 연결돼요
      </h3>
      <div className="">
        <Slider {...settings}>
          <div className="flex flex-col">
            <div className="flex flex-row gap-4">
              <img className="w-[175px]" src={moringCard} />
              <div className="w-full flex flex-col justify-between">
                <div>동그라미</div>
                <div className="bg-[rgba(255,255,255,0.05)] px-2 py-3 gap-2 flex flex-col">
                  <div className="flex justify-between">
                    <p className="text-[12px] text-[var(--text-secondary)] ">저장된 내 명함</p>
                    <p>568</p>
                  </div>
                  <div className="flex justify-between">
                    <p>받은 명함</p>
                    <p>568</p>
                  </div>
                  <div className="flex justify-between">
                    <p>조회수</p>
                    <p>568</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default MyCardSection;
