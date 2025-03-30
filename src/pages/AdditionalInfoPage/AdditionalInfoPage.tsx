import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconButton } from '@components/commons/Button/IconButton';
import { SkipForwardIcon } from 'lucide-react';
import { Header } from '@components/commons/Header/Header';
import { Logo } from '@components/commons/Header/Logo';
import { Button } from '@components/commons/Button/Button';
import { UrlDropdown } from '@components/AdditionalInfoPage/UrlDropdown';
import { SocialIcon } from '@components/AdditionalInfoPage/SocialIcon';
import BottomSheet from '@components/commons/BottomSheet/BottomSheet';
import { Input } from '@components/Input/input';
import { Dropdown } from '@components/AdditionalInfoPage/DropDown';
import { phoneNumSchema } from '@components/SignupPage/signupSchema';

// Zod 스키마 정의
const schema = z
  .object({
    company: z.string().optional(),
    department: z.string().optional(),
    experience_years: z.string().optional(),
    phone: phoneNumSchema.shape.phoneNumber.optional(),
    fax: z.string().optional(),
    address: z.string().optional(),
    nickname: z.string().optional(),
    platformId: z.string().optional(),
    website: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const { platformId, website } = data;

    if (!website || !platformId) return;

    const platform = SocialIcon.find((p) => p.id === platformId);
    if (!platform) return;

    if (platform.type === 'url' && platform.prefix && !website.includes(platform.prefix)) {
      ctx.addIssue({
        path: ['website'],
        code: z.ZodIssueCode.custom,
        message: `${platform.label} 링크가 올바르지 않아요`,
      });
    }

    if (platform.type === 'id') {
      const idRegex = /^[a-zA-Z0-9._-]{1,30}$/;
      const idOnly = platform.prefix ? website.replace(platform.prefix, '') : website;

      if (!idRegex.test(idOnly)) {
        ctx.addIssue({
          path: ['website'],
          code: z.ZodIssueCode.custom,
          message: `${platform.label} 아이디 형식이 올바르지 않아요`,
        });
      }
    }
  });

// 모든 필드를 옵셔널로 정의한 타입
type FormData = z.infer<typeof schema>;

const experienceItems = [
  { id: '0-1년차', label: '0-1년차' },
  { id: '1-3년차', label: '1-3년차' },
  { id: '3-6년차', label: '3-6년차' },
  { id: '6-10년차', label: '6-10년차' },
  { id: '10년차 이상', label: '10년차 이상' },
];

const AdditionalInfoPage = (): React.JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const scannedData = (location.state as Partial<FormData>) || null;
  const isFromScanPage = location.state?.fromScanPage || false;

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    // 최초 입장 시에는 Drawer를 열고, 스캔 페이지에서 돌아온 경우에는 열지 않음
    if (!scannedData && !isFromScanPage) {
      setIsDrawerOpen(true); // 최초 입장 시 Drawer 열기
    } else {
      setIsDrawerOpen(false); // 스캔 페이지에서 돌아온 경우 Drawer 닫기
    }
  }, [scannedData, isFromScanPage]);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      company: '',
      experience_years: '',
      department: '',
      phone: '',
      fax: '',
      address: '',
      website: '',
      nickname: '',
      ...scannedData, // 스캔된 데이터가 있으면 덮어쓰기
    },
  });

  const onSubmit = (values: FormData) => {
    console.log('폼 제출 데이터:', values);
    onClickUserInterestsPage();
    // 제출 로직 추가 가능
  };

  const onClickMovetoRealCardScanPage = () => {
    navigate('/realcardscan');
  };

  const onClickUserInterestsPage = () => {
    navigate('/userinterests');
  };

  const onClickCardPreviewPage = () => {
    navigate('/cardPreview');
  };

  return (
    <div className="w-full bg-[var(--bg-default-black)]">
      <BottomSheet
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        title="추가 정보 입력"
        subtitle="명함만 완성해도, 자연스럽게 대화가 시작돼요"
      >
        <BottomSheet.Actions>
          <BottomSheet.Actions.ButtonGroup
            primaryLabel="실제 명함 촬영하기"
            secondaryLabel="직접 입력"
            onPrimary={onClickMovetoRealCardScanPage}
            onSecondary={() => setIsDrawerOpen(false)}
          />

          <BottomSheet.TextButton onClick={onClickCardPreviewPage}>
            나중에 할래요
          </BottomSheet.TextButton>
        </BottomSheet.Actions>
      </BottomSheet>

      <div className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Header */}
            <Header>
              <Header.Left>
                <Logo />
              </Header.Left>

              <Header.Right>
                <IconButton icon={<SkipForwardIcon className="stroke-white" />} />
              </Header.Right>
            </Header>

            {/* 비즈니스명 필드 */}
            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem className="gap-[6px]">
                  <FormLabel className="text-[var(--text-primary)]">비즈니스명</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="비즈니스명을 입력하세요"
                      className="text-[var(--text-primary)] bg-[var(--fill-quaternary)]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* 업무 폰 필드 */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[var(--text-primary)]">업무용 전화번호</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      inputMode="numeric"
                      placeholder="업무용 전화번호를 입력하세요"
                      className="text-[var(--text-primary)] bg-[var(--fill-quaternary)]"
                      maxLength={11}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* url 필드 */}
            <FormField
              control={form.control}
              name="website"
              render={({ field: websiteField }) => (
                <FormItem>
                  <FormLabel className="text-[var(--text-primary)]">대표 URL</FormLabel>
                  <FormControl>
                    <UrlDropdown
                      value={websiteField.value}
                      onChange={websiteField.onChange}
                      platformId={form.watch('platformId')}
                      onPlatformChange={(id) => form.setValue('platformId', id)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 회사명 필드 */}
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[var(--text-primary)]">회사명</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="현재 소속된 회사명을 입력하세요"
                      className="text-[var(--text-primary)] bg-[var(--fill-quaternary)]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 부서 필드 */}
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[var(--text-primary)]">부서</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="부서를 입력하세요"
                      className="text-[var(--text-primary)] bg-[var(--fill-quaternary)]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* 회사 주소 필드 */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[var(--text-primary)]">회사 주소</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="주소를 입력하세요"
                      className="text-[var(--text-primary)] bg-[var(--fill-quaternary)]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* FAX 필드 */}
            <FormField
              control={form.control}
              name="fax"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[var(--text-primary)]">FAX</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="FAX 번호를 입력하세요"
                      className="text-[var(--text-primary)] bg-[var(--fill-quaternary)]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* 경력 필드 */}
            <FormField
              control={form.control}
              name="experience_years"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[var(--text-primary)]">경력</FormLabel>
                  <FormControl>
                    <Dropdown
                      items={experienceItems}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="자유롭게 경험 기반으로 선택해주세요"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 제출 버튼 */}
            <div className="flex flex-col gap-4">
              <Button btntype="enabled" className=" text-[var(--text-primary)]">
                제출
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AdditionalInfoPage;
