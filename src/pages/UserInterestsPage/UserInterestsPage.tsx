import InterestSelector from '@components/UserInterestsPage/InterestSelector';
import React from 'react';
import { useLocation } from 'react-router-dom';

const UserInterestsPage = (): React.JSX.Element => {
  const location = useLocation();
  const businessCardId = location.state?.businessCardId || '';

  return (
    <div>
      <InterestSelector cardId={businessCardId} />
    </div>
  );
};

export default UserInterestsPage;
