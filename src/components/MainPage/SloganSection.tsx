import React from 'react';
import sloganBgx2 from '@assets/Main/sloganBgx2.jpg';

import ArrowUpLight from './ArrowUpRight';
const SloganSection = (): React.JSX.Element => {
  return (
    <div
      className="flex justify-between px-8 py-4 w-full h-auto bg-cover bg-center "
      style={{ backgroundImage: `url(${sloganBgx2})` }}
    >
      <div className="w-full">
        <span className="text-[32px] font-light leading-[150%]">
          우리는
          <br />
          연결될수록
          <br />
          강해진다
        </span>
      </div>
      <div className="flex flex-col flex-1/6">
        <ArrowUpLight />
        <span className="flex text-[12px] font-light whitespace-nowrap">
          컨퍼런스
          <br />
          바로가기
        </span>
      </div>
    </div>
  );
};

export default SloganSection;
