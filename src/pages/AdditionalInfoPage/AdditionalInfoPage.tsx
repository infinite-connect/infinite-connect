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
import { Header } from '@components/commons/Header/Header';
import { Logo } from '@components/commons/Header/Logo';
import { Button } from '@components/commons/Button/Button';
import { UrlDropdown } from '@components/AdditionalInfoPage/UrlDropdown';
import BottomSheet from '@components/commons/BottomSheet/BottomSheet';
import { Input } from '@components/Input/input';
import { Dropdown } from '@components/AdditionalInfoPage/DropDown';
import SkipButton from '@components/commons/Button/SkipButton';
import { experienceItems } from '@constants/additionalInfoConstants';
import { schema } from '@constants/additionalInfoSchema';
import { useUpdateBusinessCardMutation } from '@features/BusinessCard/api/businessCardApi';

type FormData = z.infer<typeof schema>;

const AdditionalInfoPage = (): React.JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const scannedData = (location.state as Partial<FormData>) || null;
  const isFromScanPage = location.state?.fromScanPage || false;

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [updateBusinessCard] = useUpdateBusinessCardMutation();
  const businessCardId = location.state?.businessCardId || 'ca8f485b-2817-4b63-9ccc-14689416beb5';

  useEffect(() => {
    // 최초 입장 시에는 Drawer를 열고, 스캔 페이지에서 돌아온 경우에는 열지 않음
    if (!scannedData && !isFromScanPage) {
      setIsDrawerOpen(false); // 최초 입장 시 Drawer 열기
    } else {
      setIsDrawerOpen(false); // 스캔 페이지에서 돌아온 경우 Drawer 닫기
    }
  }, [scannedData, isFromScanPage]);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      business_name: '',
      company: '',
      department: '',
      job_title: '',
      fax: '',
      business_website: '',
      experience_years: '',
      business_address: '',
      ...scannedData,
    },
  });

  const hstoreFormat = (obj: Record<string, string>) => {
    return Object.entries(obj)
      .map(([key, value]) => `"${key}"=>"${value}"`)
      .join(',');
  };

  const onSubmit = async (values: FormData) => {
    if (!businessCardId) return;

    try {
      const updateData = {
        business_name: values.business_name,
        company: values.company,
        department: values.department,
        job_title: values.job_title,
        fax: values.fax,
        business_website: values.business_website,
        experience_years: values.experience_years,
        business_address: values.business_address,
        primary_url:
          values.primaryUrlPlatform && values.primaryUrlValue
            ? hstoreFormat({ [values.primaryUrlPlatform]: values.primaryUrlValue })
            : null,
        sub_url_01:
          values.subUrl01Platform && values.subUrl01Value
            ? hstoreFormat({ [values.subUrl01Platform]: values.subUrl01Value })
            : null,
        sub_url_02:
          values.subUrl02Platform && values.subUrl02Value
            ? hstoreFormat({ [values.subUrl02Platform]: values.subUrl02Value })
            : null,
      };

      // 타입 정의
      type UpdateDataKey = keyof typeof updateData;

      // 타입 안전한 방식으로 처리
      (Object.keys(updateData) as UpdateDataKey[]).forEach((key) => {
        if (updateData[key] === undefined) {
          delete updateData[key];
        }
      });

      console.log(updateData);

      await updateBusinessCard({
        businessCardId,
        businessCard: updateData,
      }).unwrap();

      onClickUserInterestsPage();
    } catch (error) {
      console.error('업데이트 실패:', error);
    }
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

      <div className="px-5 pb-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <Header>
              <Header.Left>
                <Logo />
              </Header.Left>
              <Header.Right>
                <SkipButton to="/userinterests" />
              </Header.Right>
            </Header>

            <FormField
              control={form.control}
              name="business_name"
              render={({ field }) => (
                <FormItem>
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

            <FormField
              control={form.control}
              name="job_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[var(--text-primary)]">직책</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="직책을 입력하세요"
                      className="text-[var(--text-primary)] bg-[var(--fill-quaternary)]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="business_address"
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

            <FormField
              control={form.control}
              name="business_website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[var(--text-primary)]">회사 웹사이트</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="회사 웹사이트 URL을 입력하세요"
                      className="text-[var(--text-primary)] bg-[var(--fill-quaternary)]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            <div className="space-y-5">
              <div>
                <h3 className="text-[var(--text-primary)] font-medium mb-2">대표 URL</h3>
                <UrlDropdown
                  value={form.watch('primaryUrlValue')}
                  onChange={(value) => form.setValue('primaryUrlValue', value)}
                  platformId={form.watch('primaryUrlPlatform')}
                  onPlatformChange={(id) => form.setValue('primaryUrlPlatform', id)}
                />
              </div>

              <div>
                <h3 className="text-[var(--text-primary)] font-medium mb-2">보조 URL 1</h3>
                <UrlDropdown
                  value={form.watch('subUrl01Value')}
                  onChange={(value) => form.setValue('subUrl01Value', value)}
                  platformId={form.watch('subUrl01Platform')}
                  onPlatformChange={(id) => form.setValue('subUrl01Platform', id)}
                />
              </div>

              <div>
                <h3 className="text-[var(--text-primary)] font-medium mb-2">보조 URL 2</h3>
                <UrlDropdown
                  value={form.watch('subUrl02Value')}
                  onChange={(value) => form.setValue('subUrl02Value', value)}
                  platformId={form.watch('subUrl02Platform')}
                  onPlatformChange={(id) => form.setValue('subUrl02Platform', id)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-8">
              <Button btntype="enabled" className="text-[var(--text-primary)]" type="submit">
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
