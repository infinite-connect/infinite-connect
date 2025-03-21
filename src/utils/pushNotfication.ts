// push-notifications.ts
export async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker 등록 성공:', registration);
      return registration;
    } catch (error) {
      console.error('Service Worker 등록 실패:', error);
    }
  }
}

const publicVapidKey = import.meta.env.VITE_VAPID_PUBLIC_KEY; // 발급받은 VAPID 공개키

export async function subscribeUserToPush() {
  const registration = await registerServiceWorker();
  if (!registration) return null;

  if (!('pushManager' in registration)) {
    console.error('Push Manager를 지원하지 않습니다.');
    return null;
  }

  try {
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });
    console.log('Push 구독 성공:', subscription);
    // subscription 정보를 Supabase DB(또는 별도 API)를 통해 백엔드에 저장하세요.
    return subscription;
  } catch (error) {
    console.error('Push 구독 실패:', error);
  }
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
