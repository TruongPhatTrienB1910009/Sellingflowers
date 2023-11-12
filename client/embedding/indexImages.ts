import * as dotenv from "dotenv";
import { Pinecone } from '@pinecone-database/pinecone';
import type { PineconeRecord } from '@pinecone-database/pinecone';
import { embedder } from "./embeddings";
import { listFiles } from "./utils/util";
import { chunkedUpsert } from "./utils/chunkedUpsert";

dotenv.config();

// Index setup
const indexName = process.env.NEXT_PUBLIC_PINECONE_INDEX;
const pinecone = new Pinecone({
  apiKey: process.env.NEXT_PUBLIC_PINECONE_API_KEY as string,
  environment: process.env.NEXT_PUBLIC_PINECONE_ENVIRONMENT as string,
});


function* chunkArray<T>(array: T[], chunkSize: number): Generator<T[]> {
  for (let i = 0; i < array.length; i += chunkSize) {
    yield array.slice(i, i + chunkSize);
  }
}


export async function embedAndUpsert({ imagePaths, chunkSize }: { imagePaths: string[], chunkSize: number }) {
  // Chunk the image paths into batches of size chunkSize
  const chunkGenerator = chunkArray(imagePaths, chunkSize);
  // Get the index
  const index = pinecone.index(indexName as string);

  // Embed each batch and upsert the embeddings into the index
  for await (const imagePaths of chunkGenerator) {
    await embedder.embedBatch(imagePaths, chunkSize, async (embeddings: PineconeRecord[]) => {
      await chunkedUpsert(index, embeddings);
    });
  }
}

export const indexImages = async () => {
  try {
    // Create the index if it doesn't already exist
    // const indexList = await pinecone.listIndexes();
    // if (indexList.indexOf({ name: indexName as string }) === -1) {
    //   await pinecone.createIndex({ name: indexName as string, dimension: 512, waitUntilReady: true })
    // }

    await embedder.init("Xenova/clip-vit-base-patch32");
    const imagePaths = await listFiles("./data");
    await embedAndUpsert({ imagePaths, chunkSize: 100 });
    return;

  } catch (error) {
    console.error(error);
    throw error;
  }
};

