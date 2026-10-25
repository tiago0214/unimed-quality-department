const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  etlDir: () => ipcRenderer.invoke("etlDir"),
  openFile: () => ipcRenderer.invoke("dialog:openFile"),
  forceSync: () => ipcRenderer.send("action:forceSync"),
});
