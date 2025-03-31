export const generateQRCodeUrl = (nickname: string, businessCardId: string): string => {
  return `https://infinite-connect.site/${nickname}/${businessCardId}`;
};

export const generateShareUrl = (nickname: string, businessCardId: string): string => {
  return `infinite-connect.site/${nickname}/${businessCardId}`;
};
