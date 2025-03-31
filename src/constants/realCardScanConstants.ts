import { ParsedData } from '@pages/RealCardScanPage/RealCardScanPage';

export const FIELD_MAPPINGS: Array<{
  key: keyof ParsedData;
  label: string;
  fallbackKey?: keyof ParsedData;
}> = [
  { key: 'company', label: '회사' },
  { key: 'job_title', label: '직책', fallbackKey: 'jobTitle' },
  { key: 'department', label: '부서' },
  { key: 'fax', label: '팩스' },
  { key: 'business_address', label: '회사 주소' },
  { key: 'business_website', label: '회사 웹사이트' },
];
