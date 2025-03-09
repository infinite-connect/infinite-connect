import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { registerSW } from "virtual:pwa-register";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(() => {
      console.log("✅ [Service Worker] Registered");
    })
    .catch((error) => {
      console.error("❌ [Service Worker] Registration Failed:", error);
    });
}

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("새로운 업데이트가 있습니다. 새로고침할까요?")) {
      updateSW(true);
    }
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
