// 캐싱할 파일 리스트 (필요시 수정)
const CACHE_NAME = 'infinite-connect-cache-v1';
const urlsToCache = ['/', '/index.html', '/icons/icon-192x192.png', '/icons/icon-512x512.png'];

// 서비스 워커 설치 후 캐싱
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    }),
  );
});

// 서비스 워커 활성화
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('✅ [Service Worker] Old cache deleted:', cache);
            return caches.delete(cache);
          }
        }),
      );
    }),
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }),
  );
});

self.addEventListener('push', (event) => {
  // 이벤트에서 데이터를 꺼냅니다.
  const data = event.data ? event.data.json() : {};
  const title = data.title || '알림';
  const options = {
    body: data.body || '새로운 알림이 도착했습니다.',
    icon: '/icons/icon-192x192.png', // 앱 아이콘 등
    data: {
      url: data.url || '/', // 알림 클릭 시 이동할 URL
    },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data.url;
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    }),
  );
});
