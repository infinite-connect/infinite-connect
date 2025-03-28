type UrlType = 'none' | 'github' | 'figma' | 'instagram' | 'linkedin' | 'framer';

const urlNameMap: Record<UrlType, string> = {
  none: 'URL',
  github: 'Github',
  figma: 'Figma',
  instagram: 'Instagram',
  linkedin: 'Linkedin',
  framer: 'Framer',
};

const isUrlType = (value: string): value is UrlType => {
  return value in urlNameMap;
};

export const getUrlName = (type: string): string => {
  if (isUrlType(type)) {
    return urlNameMap[type];
  }
  return 'Unknown'; // 기본값 처리
};
