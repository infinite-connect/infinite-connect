import React from 'react';
import { Button } from '@components/ui/button';
import { Icon } from '@iconify/react';

const SocialLogin = (): React.JSX.Element => {
  return (
    <div className="flex justify-center gap-x-4">
      {/* Google 로그인 */}
      <Button
        variant="outline"
        size="sm"
        className="w-[50px] h-[50px] rounded-md bg-white flex items-center justify-center shadow-md hover:shadow-lg"
      >
        <Icon icon="logos:google-icon" width={24} height={24} />
      </Button>

      {/* GitHub 로그인 */}
      <Button
        variant="outline"
        size="sm"
        className="w-[50px] h-[50px] rounded-md bg-black flex items-center justify-center shadow-md hover:shadow-lg"
      >
        <Icon icon="mdi:github" color="#ffffff" width={24} height={24} />
      </Button>
    </div>
  );
};

export default SocialLogin;
