import { app, BrowserWindow, ipcMain } from "electron";
import Store from "electron-store";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, "..");

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

let win: BrowserWindow | null;

// -------------------- Persistent Store (electron-store) --------------------
// Define a schema (optional but helps with autocompletion & validation)
type AppStoreSchema = {
  username?: string;
  lastScreen?: string; // tracks last visited UI screen
  rooms?: string[]; // example: cached list of joined room codes
};

// Create the store instance. The file will be saved inside userData folder.
const store = new Store<AppStoreSchema>({ name: "friendscave" });

// IPC handlers to access the store from the renderer via `ipcRenderer.invoke`
ipcMain.handle("store:get", (_e, key: keyof AppStoreSchema | string) => {
  return store.get(key as keyof AppStoreSchema);
});

ipcMain.handle(
  "store:set",
  (
    _e,
    key: keyof AppStoreSchema | string,
    value: AppStoreSchema[keyof AppStoreSchema]
  ) => {
    store.set(key as keyof AppStoreSchema, value);
    return value;
  }
);

ipcMain.handle("store:has", (_e, key: keyof AppStoreSchema | string) => {
  return store.has(key as keyof AppStoreSchema);
});

ipcMain.handle("store:delete", (_e, key: keyof AppStoreSchema | string) => {
  store.delete(key as keyof AppStoreSchema);
});

ipcMain.handle("store:clear", () => {
  store.clear();
});

ipcMain.handle("store:keys", () => {
  return Object.keys(store.store);
});

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
    },
  });

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(createWindow);
