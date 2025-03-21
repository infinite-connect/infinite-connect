import React from 'react';
import { Icon } from '@iconify/react';
import { Button } from '@components/commons/Button/Button';

const SocialLogin = (): React.JSX.Element => {
  return (
    <div className="flex justify-center gap-x-4">
      {/* GitHub 로그인 */}
      <Button
        variant="icon"
        size="icon"
        className="w-[50px] h-[50px] rounded-md bg-[var(--color-btn-secondary)] flex items-center justify-center shadow-md hover:shadow-lg"
      >
        <Icon icon="mdi:github" color="#ffffff" />
      </Button>

      {/* Google 로그인 */}
      <Button
        variant="icon"
        size="icon"
        className="w-[50px] h-[50px] rounded-md bg-[var(--color-btn-secondary)] flex items-center justify-center shadow-md hover:shadow-lg"
      >
        <Icon icon="logos:google-icon" />
      </Button>
    </div>
  );
};

export default SocialLogin;
