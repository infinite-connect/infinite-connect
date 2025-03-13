import Header from '@components/commons/Header/Header';
import QRCodeDisplay from '@components/commons/QRcodeDisplay';
import { Button } from '@components/ui/button';
import React from 'react';

const MainPage = (): React.JSX.Element => {
  console.log('hello');
  return (
    <div>
      <Header />
      <Button>dfd</Button>
      <QRCodeDisplay url="101/1" />
      <p>sddsf</p>
    </div>
  );
};

export default MainPage;
