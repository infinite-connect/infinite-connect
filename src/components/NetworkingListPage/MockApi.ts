export const mockGetUserData = async () => {
  return new Promise<{ userId: string }>((resolve) => {
    setTimeout(() => {
      resolve({ userId: '1234-5678-9101' }); // 예제 userId
    }, 500); // API 응답 딜레이 (0.5초)
  });
};

// 명함 공개 여부 확인
export const mockGetUserCheckPrimaryPublicBusinessCards = async (userId: string) => {
  return new Promise<{
    business_card_id: string;
    user_id: string;
    is_primary: boolean;
    is_public: boolean;
  }>((resolve) => {
    setTimeout(() => {
      resolve(
        { business_card_id: 'card-456', user_id: userId, is_primary: true, is_public: false }, // 대표 명함
      );
    }, 500);
  });
};

// 명함 공개 여부 업데이트 (예제)
export const mockUpdateBusinessCardVisibility = async (userId: string) => {
  return new Promise<{ is_public: boolean }>((resolve) => {
    setTimeout(() => {
      console.log(`✅ ${userId} 사용자의 대표 명함이 공개되었습니다.`);
      resolve({ is_public: true });
    }, 500);
  });
};
