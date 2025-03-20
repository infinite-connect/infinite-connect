import { Provider } from 'react-redux';
import AppRouter from './routes';
import { store } from '@store/store';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from '@components/ui/sonner';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
        <Toaster />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
