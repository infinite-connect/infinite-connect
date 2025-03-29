export const maskName = (name: string): string => {
  if (!name) return '';

  const firstName = name.charAt(0); // 첫 글자(성)
  const restName = '*'.repeat(name.length - 1); // 나머지 글자 마스킹

  return firstName + restName;
};
