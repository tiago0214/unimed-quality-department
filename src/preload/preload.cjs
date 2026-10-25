const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("mainProcess", {
  etlDir: () => ipcRenderer.invoke("etl-dir"),
});
