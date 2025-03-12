import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from '@components/ui/drawer';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import { useForm } from 'react-hook-form';

// Zod 스키마 정의
const schema = z.object({
  email: z.string().optional(),
  companyName: z.string().optional(),
  jobTitle: z.string().optional(),
  department: z.string().optional(),
  phone: z.string().optional(),
  fax: z.string().optional(),
  address: z.string().optional(),
  website: z.string().optional(),
  url1: z.string().optional(),
  url2: z.string().optional(),
  url3: z.string().optional(),
});

// 모든 필드를 옵셔널로 정의한 타입
type FormData = z.infer<typeof schema>;

const AdditionalInfoPage = (): React.JSX.Element => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true); // Drawer 초기 상태: 열림

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      companyName: '',
      jobTitle: '',
      department: '',
      phone: '',
      fax: '',
      address: '',
      website: '',
      url1: '',
      url2: '',
      url3: '',
    },
  });

  const onSubmit = (values: FormData) => {
    console.log('폼 제출 데이터:', values);
    // 제출 로직 추가 가능
  };

  return (
    <div>
      {/* Drawer 컴포넌트 */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="bg-white p-6">
          {/* Header */}
          <DrawerHeader>
            <DrawerTitle className="text-xl font-bold">추가 정보 입력</DrawerTitle>
          </DrawerHeader>

          {/* 버튼 그룹 */}
          <div className="flex flex-col gap-4 mt-6">
            <Button variant="outline" className="w-full">
              실제 명함 촬영하기
            </Button>
            <Button variant="outline" className="w-full">
              직접 입력
            </Button>
          </div>

          {/* Footer */}
          <DrawerFooter className="mt-6">
            <button
              className="text-sm text-gray-500 underline"
              onClick={() => setIsDrawerOpen(false)}
            >
              나중에 할래요
            </button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <div className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* 이메일 필드 */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input placeholder="example@example.com" {...field} />
                  </FormControl>
                  <FormDescription>회사 이메일 주소를 입력하세요.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 회사명 필드 */}
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>회사명</FormLabel>
                  <FormControl>
                    <Input placeholder="회사명을 입력하세요" {...field} />
                  </FormControl>
                  <FormDescription>현재 소속된 회사명을 입력하세요.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 직무/직책 필드 */}
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>직무/직책</FormLabel>
                  <FormControl>
                    <Input placeholder="직무/직책을 입력하세요" {...field} />
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
                  <FormLabel>부서</FormLabel>
                  <FormControl>
                    <Input placeholder="부서를 입력하세요" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 유선전화 필드 */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>유선전화</FormLabel>
                  <FormControl>
                    <Input placeholder="전화번호를 입력하세요" {...field} />
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
                  <FormLabel>FAX</FormLabel>
                  <FormControl>
                    <Input placeholder="FAX 번호를 입력하세요" {...field} />
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
                  <FormLabel>회사 주소</FormLabel>
                  <FormControl>
                    <Input placeholder="주소를 입력하세요" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 회사 홈페이지 필드 */}
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>회사 홈페이지</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 회사 홈페이지 필드 */}
            <FormField
              control={form.control}
              name="url1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>url1</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 회사 홈페이지 필드 */}
            <FormField
              control={form.control}
              name="url2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>url2</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 회사 홈페이지 필드 */}
            <FormField
              control={form.control}
              name="url3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>url3</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 제출 버튼 */}
            <Button type="submit">제출</Button>
          </form>
        </Form>
      </div>
      ;
    </div>
  );
};

export default AdditionalInfoPage;
