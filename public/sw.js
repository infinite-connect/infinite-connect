self.addEventListener("install", (event) => {
  console.log("✅ [Service Worker] Installed");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("✅ [Service Worker] Activated");
  event.waitUntil(self.clients.claim());
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

// 백그라운드 푸시 클릭 이벤트 핸들러
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((windowClients) => {
        if (windowClients.length > 0) {
          windowClients[0].focus();
        } else {
          clients.openWindow("/");
        }
      })
  );
});

// API 요청 캐싱
self.addEventListener("fetch", (event) => {
  console.log("✅ [Fetching]:", event.request.url);
});
