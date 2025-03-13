import { Routes, Route } from 'react-router-dom';
import RoutePaths from './RoutePath';
import AdditionalInfoPage from '@pages/AdditionalInfoPage/AdditionalInfoPage';
import LoginPage from '@pages/LoginPage/LoginPage';
import SignupPage from '@pages/SignupPage/SignupPage';
import MainPage from '@pages/MainPage/MainPage';
import SelectCardDesignPage from '@pages/SelectCardDesignPage/SelectCardDesignPage';
import UserPage from '@pages/UserPage/UserPage';
import UserCardPage from '@pages/UserCardPage/UserCardPage';
import InfoPage from '@pages/InfoPage/InfoPage';
import MembershipPage from '@pages/MembershipPage/MembershipPage';
import UserSettingPage from '@pages/UserSettingPage/UserSettingPage';
import EventPage from '@pages/EventPage/EventPage';
import PremiumEventPage from '@pages/PremiumEventPage/PremiumEventPage';
import NetworkingClubPage from '@pages/NetworkingClubPage/NetworkingClub';
import NetworkingListPage from '@pages/NetworkingListPage/NetworkingListPage';
import NotFoundPage from '@pages/NotFoundPage/NotFoundPage';
import RealCardScanPage from '@pages/RealCardScanPage/RealCardScanPage';
import UserInterestsPage from '@pages/UserInterestsPage/UserInterestsPage';
import CardPreviewPage from '@pages/CardPreviewPage/CardPreviewPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path={RoutePaths.MAIN} element={<MainPage />} />
      <Route path={RoutePaths.LOGIN} element={<LoginPage />} />
      <Route path={RoutePaths.SIGNUP} element={<SignupPage />} />
      <Route path={RoutePaths.SELECTCARDDESIGN} element={<SelectCardDesignPage />} />
      <Route path={RoutePaths.ADDITIONALINFO} element={<AdditionalInfoPage />} />
      <Route path={RoutePaths.USER} element={<UserPage />} />
      <Route path={`${RoutePaths.USER}${RoutePaths.CARD}/:cardId?`} element={<UserCardPage />} />
      <Route path={`${RoutePaths.USER}${RoutePaths.SETTING}`} element={<UserSettingPage />} />
      <Route path={RoutePaths.INFO} element={<InfoPage />} />
      <Route path={RoutePaths.MEMBERSHIP} element={<MembershipPage />} />
      <Route path={RoutePaths.EVENTS} element={<EventPage />} />
      <Route path={`${RoutePaths.EVENTS}${RoutePaths.PREMIUM}`} element={<PremiumEventPage />} />
      <Route path={RoutePaths.NETWORKINGCLUBS} element={<NetworkingClubPage />} />
      <Route path={RoutePaths.NETWORKINGLIST} element={<NetworkingListPage />} />
      <Route path={RoutePaths.REALCARDSCAN} element={<RealCardScanPage />} />
      <Route path={RoutePaths.USERINTERESTS} element={<UserInterestsPage />} />
      <Route path={RoutePaths.CARDPREVIEW} element={<CardPreviewPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
