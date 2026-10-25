import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import { verifyETLpath } from "./initialization.js";
import { handleFileOpen } from "./os-actions.js";

const createWindow = () => {
  const rawPath = import.meta.dirname.lastIndexOf("/");
  const sanatizePath = import.meta.dirname.substring(0, rawPath);

  const win = new BrowserWindow({
    width: 1600,
    height: 1400,
    webPreferences: {
      preload: path.join(sanatizePath, "/preload/preload.cjs"),
    },
  });

  win.menuBarVisible = false;
  win.loadFile("./src/renderer/index.html");
};

app.whenReady().then(() => {
  ipcMain.handle("etlDir", verifyETLpath);
  ipcMain.handle("dialog:openFile", handleFileOpen);

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
