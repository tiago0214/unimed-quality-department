import { readFile } from "node:fs/promises";
import path from "node:path";

export async function verifyETLpath() {
  const currentPath = import.meta.dirname;

  try {
    const combinedPath = path.join(currentPath, "etlDir.txt");
    const data = await readFile(combinedPath, "utf-8");
    return data;
  } catch (e) {
    console.error("Error reading the file", e);
  }
}
