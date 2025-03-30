// 이름을 마스킹하는 헬퍼
export const maskName = (name: string): string => {
  if (!name) return '';
  const firstChar = name[0];
  const maskedPart = '*'.repeat(name.length - 1);
  return firstChar + maskedPart;
};
