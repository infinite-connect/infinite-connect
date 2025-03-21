import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { subscribeUserToPush } from '@utils/pushNotfication.ts';

// ✅ 서비스 워커 등록
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(() => {
      console.log('✅ [Service Worker] Registered');
    })
    .catch((error) => {
      console.error('❌ [Service Worker] Registration Failed:', error);
    });
}

subscribeUserToPush();

createRoot(document.getElementById('root')!).render(<App />);
