import fs from 'fs/promises';
import path from 'path';
import * as dotenv from "dotenv";

dotenv.config();

const sliceIntoChunks = <T>(arr: T[], chunkSize: number) => Array.from({ length: Math.ceil(arr.length / chunkSize) }, (_, i) =>
  arr.slice(i * chunkSize, (i + 1) * chunkSize)
);

async function listFiles(dir: string): Promise<string[]> {
  const files = await fs.readdir(dir);
  const filePaths: string[] = [];
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = await fs.stat(filePath);
    if (stats.isFile()) {
      filePaths.push(filePath);
    }
  }
  return filePaths;
}

export {
  listFiles,
  sliceIntoChunks,
};
