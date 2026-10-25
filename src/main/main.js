import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import { verifyETLdir, initializeOperationDB } from "./initialization.js";
import { handleFileOpen } from "./os-actions.js";
import { handleForceSync } from "./etl.js";

const createWindow = () => {
  const rawPath = import.meta.dirname.lastIndexOf("/");
  const sanatizePath = import.meta.dirname.substring(0, rawPath);

  const win = new BrowserWindow({
    width: 1400,
    height: 950,
    webPreferences: {
      preload: path.join(sanatizePath, "/preload/preload.cjs"),
    },
  });

  win.menuBarVisible = false;
  win.loadFile("./src/renderer/pages/data.html");
};

app.whenReady().then(() => {
  initializeOperationDB();
  ipcMain.handle("etlDir", verifyETLdir);
  ipcMain.handle("dialog:openFile", handleFileOpen);
  ipcMain.handle("action:forceSync", handleForceSync);

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
