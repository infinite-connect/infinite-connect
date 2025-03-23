export const generateQRCodeUrl = (nickname: string, businessCardId: string): string => {
  return `https://infinite-connect.site/user/${nickname}/${businessCardId}`;
};
