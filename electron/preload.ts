import { ipcRenderer, contextBridge } from "electron";

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld("ipcRenderer", {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args;
    return ipcRenderer.on(channel, (event, ...args) =>
      listener(event, ...args)
    );
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args;
    return ipcRenderer.off(channel, ...omit);
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args;
    return ipcRenderer.send(channel, ...omit);
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args;
    return ipcRenderer.invoke(channel, ...omit);
  },

  // You can expose other APTs you need here.
  // ...
});

// Convenience wrapper for the persistent store
contextBridge.exposeInMainWorld("store", {
  get: (key: string) => ipcRenderer.invoke("store:get", key),
  set: (key: string, value: unknown) =>
    ipcRenderer.invoke("store:set", key, value),
  has: (key: string) => ipcRenderer.invoke("store:has", key),
  delete: (key: string) => ipcRenderer.invoke("store:delete", key),
  clear: () => ipcRenderer.invoke("store:clear"),
  keys: () => ipcRenderer.invoke("store:keys"),
});
