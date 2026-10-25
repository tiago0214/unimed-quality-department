import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";

const createWindow = () => {
  const rawPath = import.meta.dirname.lastIndexOf("/");
  const sanatizePath = import.meta.dirname.substring(0, rawPath);

  const win = new BrowserWindow({
    width: 1600,
    height: 1400,
    backgroundColor: "#0a0a0a",
    titleBarOverlay: {
      color: "#0a0a0a",
      symbolColor: "#a3a3a3",
      height: 36,
    },
    webPreferences: {
      preload: path.join(sanatizePath, "/preload/preload.cjs"),
    },
  });

  win.menuBarVisible = false;
  win.loadFile("./src/renderer/index.html");
};

app.whenReady().then(() => {
  ipcMain.handle("ping", () => "pong");

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
