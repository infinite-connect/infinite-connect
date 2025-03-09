// 캐싱할 파일 리스트 (필요시 수정)
const CACHE_NAME = "infinite-connect-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
];

// 서비스 워커 설치 후 캐싱
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// 서비스 워커 활성화
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("✅ [Service Worker] Old cache deleted:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// 푸시 알림 이벤트 핸들러
self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};
  console.log("✅ [Push Received]", data);

  self.registration.showNotification(data.title || "새로운 알림", {
    body: data.body || "알림 내용을 확인하세요!",
    icon: "/icons/icon-192x192.png",
    vibrate: [200, 100, 200],
  });
});
