import { registerSW } from "virtual:pwa-register";

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("새 버전이 있습니다. 새로고침할까요?")) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log("PWA가 오프라인에서 실행될 준비가 되었습니다.");
  },
});
