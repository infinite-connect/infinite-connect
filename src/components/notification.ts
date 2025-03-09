export async function requestNotificationPermission() {
  if (!("Notification" in window)) {
    console.warn("이 브라우저는 알림을 지원하지 않습니다.");
    return;
  }

  const permission = await Notification.requestPermission();

  if (permission !== "granted") {
    console.warn("알림 권한이 거부되었습니다.");
    return;
  }

  console.log("알림 권한이 허용되었습니다.");
}
