import { Provider } from 'react-redux';
import AppRouter from './routes';
import { store } from '@store/store';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from '@components/ui/sonner';
import useAutoLogin from '@hooks/Login/useAutoLogin';

const AppContent = (): React.JSX.Element => {
  useAutoLogin();
  return (
    <>
      <AppRouter />
      <Toaster />
    </>
  );
};

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
