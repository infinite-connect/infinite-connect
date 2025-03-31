import { ReactNode } from 'react';
import { Icon } from '@iconify/react';
import { LinkIcon } from 'lucide-react';

export type SocialPlatform = {
  id: string;
  label: string;
  icon: ReactNode;
  prefix?: string;
  type: 'url' | 'id';
  placeholder?: string;
};

export const SocialIcon: SocialPlatform[] = [
  {
    id: 'none',
    label: '직접 입력',
    icon: <LinkIcon className="w-4 h-4" />,
    prefix: 'https://',
    type: 'url',
    placeholder: '링크',
  },
  // {
  //   id: 'linkedin',
  //   label: 'Linkedin',
  //   icon: <Icon icon="mdi:linkedin" className="w-4 h-4" />,
  //   prefix: 'linkedin',
  //   type: 'url',
  //   placeholder: '링크드인 링크',
  // },
  {
    id: 'github',
    label: 'Github',
    icon: <Icon icon="mdi:github" className="w-4 h-4" />,
    prefix: 'https://github.com/',
    type: 'id',
    placeholder: '깃허브 아이디',
  },
  {
    id: 'notion',
    label: 'Notion',
    icon: <Icon icon="simple-icons:notion" className="w-4 h-4" />,
    prefix: 'notion',
    type: 'url',
    placeholder: '노션 링크',
  },
  {
    id: 'framer',
    label: 'Framer',
    icon: <Icon icon="tdesign:logo-framer-filled" className="w-4 h-4" />,
    prefix: 'framer',
    type: 'url',
    placeholder: '프레이머 링크',
  },
  {
    id: 'figma',
    label: 'Figma',
    icon: <Icon icon="simple-icons:figma" className="w-4 h-4" />,
    prefix: 'figma',
    placeholder: '피그마 링크',

    type: 'url',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    icon: <Icon icon="mdi:instagram" className="w-4 h-4" />,
    prefix: 'https://instagram.com/',
    placeholder: '인스타그램 아이디',

    type: 'id',
  },
];
