export const formatPhoneNumber = (phoneNumber: string): string => {
  return phoneNumber.replace(/-/g, '').replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3');
};
