import { ReactNode } from 'react';
import { Icon } from '@iconify/react';
import { LinkIcon } from 'lucide-react';

export type SocialPlatform = {
  id: string;
  label: string;
  icon: ReactNode;
  prefix?: string;
};

export const SocialIcon: SocialPlatform[] = [
  {
    id: 'custom',
    label: '직접 입력',
    icon: <LinkIcon className="w-4 h-4" />,
  },
  {
    id: 'linkedin',
    label: 'Linkedin',
    icon: <Icon icon="mdi:linkedin" className="w-4 h-4" />,
    prefix: 'https://www.linkedin.com/in/',
  },
  {
    id: 'github',
    label: 'Github',
    icon: <Icon icon="mdi:github" className="w-4 h-4" />,
    prefix: 'https://github.com/',
  },
  {
    id: 'notion',
    label: 'Notion',
    icon: <Icon icon="simple-icons:notion" className="w-4 h-4" />,
    prefix: 'https://notion.so/',
  },
  {
    id: 'framer',
    label: 'Framer',
    icon: <Icon icon="tdesign:logo-framer-filled" className="w-4 h-4" />,
    prefix: 'https://framer.com/',
  },
  {
    id: 'figma',
    label: 'Figma',
    icon: <Icon icon="simple-icons:figma" className="w-4 h-4" />,
    prefix: 'https://figma.com/',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    icon: <Icon icon="mdi:instagram" className="w-4 h-4" />,
    prefix: 'https://instagram.com/',
  },
];
