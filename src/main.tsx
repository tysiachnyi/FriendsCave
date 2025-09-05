import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Use contextBridge
window.ipcRenderer.on("main-process-message", (_event, message) => {
  console.log(message);
});

// Demo: set an initial run timestamp if not present
(async () => {
  const has = await window.store.has("firstRunAt");
  console.log("has", has);
  if (!has) {
    await window.store.set("firstRunAt", new Date().toISOString());
  }
  const ts = await window.store.get<string>("firstRunAt");
  console.log("First run at:", ts);
})();
