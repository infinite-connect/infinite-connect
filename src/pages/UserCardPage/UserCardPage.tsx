// UserCardPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useIncrementViewCountMutation } from '@features/User/api/viewCountApi';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { useGetBusinessCardByIdQuery } from '@features/BusinessCard/api/businessCardApi';
import HorizontalCard from '@components/commons/Card/HorizontalCard';
import { Header } from '@components/commons/Header/Header';
import { IconButton } from '@components/commons/Button/IconButton';
import QrIcon from '@components/NetworkingListPage/UI/QrIcon';
import AlarmIcon from '@components/NetworkingListPage/UI/AlarmIcon';
import QRScanDisplayModal from '@components/commons/QR/QRScanDisplayModal';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Button } from '@components/commons/Button/Button';
import { ICONS } from '@constants/cardIcon';
import { getUrlName } from '@utils/formatURLName';
import IconRenderer from '@components/commons/Card/CardIconRenderer';
import { ChevronLeft } from 'lucide-react';

const UserCardPage: React.FC = (): React.JSX.Element => {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  // URL 파라미터: 상대방 명함 ID
  const { nickname, businessCardId } = useParams<{ nickname: string; businessCardId: string }>();

  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  // 명함 상세 데이터 API 호출
  const { data: businessCard, isLoading, error } = useGetBusinessCardByIdQuery(businessCardId!);

  const [incrementViewCount] = useIncrementViewCountMutation();

  console.log(businessCard?.interests);

  useEffect(() => {
    if (nickname && userInfo?.nickname && nickname !== userInfo.nickname) {
      // URL의 nickname이 현재 로그인한 유저의 nickname과 다를 경우에만 조회수 증가
      incrementViewCount({
        nickname: userInfo.nickname, // 조회하는 사람의 닉네임 (현재 로그인한 사용자)
        businessCardId: businessCardId!, // 대상 명함 ID
      }).catch((err) => console.error('조회수 증가 실패:', err));
    }
    // eslint-disable-next-line
  }, [nickname, userInfo?.nickname, businessCardId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">로딩 중...</div>
    );
  }
  if (error || !businessCard) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        명함 데이터를 불러오는데 실패했습니다.
      </div>
    );
  }

  const primaryUrlType = Object.keys(businessCard?.primaryUrl || {})[0] as keyof typeof ICONS;
  const subFirstUrlType = Object.keys(businessCard?.subFirstUrl || {})[0] as keyof typeof ICONS;
  const subSecondUrlType = Object.keys(businessCard?.subSecondUrl || {})[0] as keyof typeof ICONS;

  return (
    <div
      className="min-h-screen text-white flex flex-col justify-start flex-grow overflow-y-auto"
      style={{
        background: 'linear-gradient(0deg, #121212 86.3%, #606171 100%)',
      }}
    >
      <div className=" h-[44px]"></div>
      {/* 헤더 */}
      <Header className="px-[16px] z-12 ">
        <Header.Left>
          <ChevronLeft className="w-7 h-7" />
        </Header.Left>
        <Header.Right>
          <IconButton icon={<QrIcon />} onClick={() => setIsQRModalOpen(true)} />
          <IconButton icon={<AlarmIcon />} />
        </Header.Right>
      </Header>

      <div className="relative flex flex-col pt-8 pb-10 items-center justify-start overflow-x-hidden">
        {/* 이름 * 명함 이미지 */}
        <div className="w-full px-4 gap-4">
          <div className="h-[48px] text-[32px] text-[var(--text-accent)] font-bold leading-[150%]">
            {businessCard?.businessName ? businessCard?.businessName : businessCard.name}
          </div>
          <div className="flex py-0 justify-center">
            <HorizontalCard cardId={businessCardId!} />
          </div>
          {/* 관심사 스크롤 */}
        </div>
        <ScrollArea className="w-full pl-4 overflow-x-auto scrollbar-hide mb-4">
          <div className="flex space-x-[6px]">
            {businessCard.interests?.map((interest, index) => (
              <div
                key={index}
                className="px-[10px] py-[8px] bg-gray-800 rounded-[4px] text-[12px] leading-[150%] text-white text-center whitespace-nowrap"
              >
                {interest}
              </div>
            ))}
            <div className="px-[10px] py-[8px] bg-gray-800 rounded-[4px] text-[12px] leading-[150%] text-white text-center whitespace-nowrap">
              관심사12222
            </div>
            <div className="px-[10px] py-[8px] bg-gray-800 rounded-[4px] text-[12px] leading-[150%] text-white text-center whitespace-nowrap">
              관심사2
            </div>
          </div>
        </ScrollArea>

        <div className="w-full px-4">
          <Button btntype="enabled" className="w-full py-2 font-medium">
            <div className="text-[14px] leading-[24px]">카드 선택</div>
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-[10px]">
        <div className="flex flex-col gap-[10px]">
          <div className="relative flex flex-col px-5 py-4 items-center bg-[#1E1E1E]">
            <div className="w-full h-[33px] flex items-start justify-start text-[14px] font-bold leading-[150%]">
              경력 정보
            </div>

            {/* 회사 */}
            {businessCard.company && (
              <div className="w-full h-[57px] flex flex-row items-center justify-between border-b border-[#292929] last:border-b-0">
                <div className="text-[14px] leading-[150%]">회사</div>
                <div>{businessCard.company}</div>
              </div>
            )}

            {/* 직책 */}
            {businessCard.jobTitle && (
              <div className="w-full h-[57px] flex flex-row items-center justify-between border-b border-[#292929] last:border-b-0">
                <div className="text-[14px] leading-[150%]">직책</div>
                <div>{businessCard.jobTitle}</div>
              </div>
            )}

            {/* 연차 */}
            {businessCard.experienceYears && (
              <div className="w-full h-[57px] flex flex-row items-center justify-between border-b border-[#292929] last:border-b-0">
                <div className="text-[14px] leading-[150%]">연차</div>
                <div>{businessCard.experienceYears}</div>
              </div>
            )}

            {/* 직무 */}
            {(businessCard.fieldsOfExpertise || businessCard.subExpertise) && (
              <div className="w-full h-[57px] flex flex-row items-center justify-between border-b border-[#292929] last:border-b-0">
                <div className="text-[14px] leading-[150%]">직무</div>
                <div>
                  {businessCard.fieldsOfExpertise}
                  {businessCard.fieldsOfExpertise && businessCard.subExpertise && ' | '}
                  {businessCard.subExpertise}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="relative flex flex-col px-5 py-4 items-center bg-[#1E1E1E]">
          <div className="w-full h-[33px] flex items-start justify-start text-[14px] font-bold leading-[150%]">
            연락처
          </div>

          {/* PHONE */}
          {businessCard.phone && (
            <div className="w-full h-[57px] flex flex-row items-center justify-between border-b border-[#292929] last:border-b-0">
              <div className="text-[14px] leading-[150%]">PHONE</div>
              <div>{businessCard.phone}</div>
            </div>
          )}

          {/* EMAIL */}
          {businessCard.email && (
            <div className="w-full h-[57px] flex flex-row items-center justify-between border-b border-[#292929] last:border-b-0">
              <div className="text-[14px] leading-[150%]">EMAIL</div>
              <div>{businessCard.email}</div>
            </div>
          )}

          {/* PRIMARY URL */}
          {businessCard.primaryUrl?.[primaryUrlType] && (
            <div className="w-full h-[57px] flex flex-row items-center justify-between border-b border-[#292929] last:border-b-0">
              <div className="text-[14px] leading-[150%]">
                <div className="flex flex-row w-full items-center gap-[4px]">
                  <IconRenderer type={primaryUrlType} size="16px" />
                  {getUrlName(Object.keys(businessCard?.primaryUrl || {})[0])}
                </div>
              </div>
              <div>{businessCard.primaryUrl?.[primaryUrlType]}</div>
            </div>
          )}

          {/* SUB FIRST URL */}
          {businessCard.subFirstUrl?.[subFirstUrlType] && (
            <div className="w-full h-[57px] flex flex-row items-center justify-between border-b border-[#292929] last:border-b-0">
              <div className="text-[14px] leading-[150%]">
                <div className="flex flex-row w-full items-center gap-[4px]">
                  <IconRenderer type={subFirstUrlType} size="16px" />
                  {getUrlName(Object.keys(businessCard?.subFirstUrl || {})[0])}
                </div>
              </div>
              <div>{businessCard.subFirstUrl?.[subFirstUrlType]}</div>
            </div>
          )}

          {/* SUB SECOND URL */}
          {businessCard.subSecondUrl?.[subSecondUrlType] && (
            <div className="w-full h-[57px] flex flex-row items-center justify-between border-[#292929] last:border-b-0">
              <div className="text-[14px] leading-[150%]">
                <div className="flex flex-row w-full items-center gap-[4px]">
                  <IconRenderer type={subSecondUrlType} size="16px" />
                  {getUrlName(Object.keys(businessCard?.subSecondUrl || {})[0])}
                </div>
              </div>
              <div>{businessCard.subSecondUrl?.[subSecondUrlType]}</div>
            </div>
          )}
        </div>
      </div>

      <QRScanDisplayModal isOpen={isQRModalOpen} onClose={() => setIsQRModalOpen(false)} />
    </div>
  );
};

export default UserCardPage;
