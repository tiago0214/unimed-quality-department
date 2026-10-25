import { dialog } from "electron";
import { writeFile } from "node:fs/promises";
import path from "node:path";

export async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });

  if (!canceled) {
    const currentPath = import.meta.dirname;
    const combinedPath = path.join(currentPath, "etlDir.txt");

    try {
      await writeFile(combinedPath, filePaths, "utf-8");
    } catch (e) {
      console.error("Error writing file:", err);
    }

    return filePaths[0];
  }
}
