import CardSettingsPage from '@components/UserSettingPage/UserSetting';
import React from 'react';
import { useLocation } from 'react-router-dom';

const UserSettingPage = (): React.JSX.Element => {
  const location = useLocation();
  const cardId = location.state?.cardId || '';
  console.log(cardId);

  return (
    <div>
      <CardSettingsPage />
    </div>
  );
};

export default UserSettingPage;
