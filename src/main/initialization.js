import { readFile, open } from "node:fs/promises";
import path from "node:path";

export async function verifyETLpath() {
  const currentDir = import.meta.dirname;
  const filePath = path.join(currentDir, "etlDir.txt");

  try {
    const data = await readFile(filePath, "utf-8");
    return data;
  } catch (e) {
    if (e.code === "ENOENT") {
      const fileHandle = await open(filePath, "w");
      await fileHandle.close();

      return "";
    } else {
      console.log("An unexpected error occurred:", e);
    }
  }
}
