import { readFile, open } from "node:fs/promises";
import { DatabaseSync } from "node:sqlite";
import path from "node:path";

export async function verifyETLdir() {
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

export async function initializeOperationDB() {
  const db = new DatabaseSync("./operational.db");

  db.exec(`
    CREATE TABLE IF NOT EXISTS etl_process(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      file_hash TEXT,
      status CHECK(status IN ('running', 'cancelled', 'pending','completed')),
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.close();
}
