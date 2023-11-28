import { embedder } from "./embeddings";
import { Pinecone } from '@pinecone-database/pinecone';

type Metadata = {
  imagePath: string;
}

const indexName = process.env.NEXT_PUBLIC_PINECONE_INDEX;
const pinecone = new Pinecone({
  apiKey: process.env.NEXT_PUBLIC_PINECONE_API_KEY as string,
  environment: process.env.NEXT_PUBLIC_PINECONE_ENVIRONMENT as string,
});
const index = pinecone.index<Metadata>(indexName as string);

export const queryImages = async (imagePath: string) => {
  await embedder.init("Xenova/clip-vit-base-patch32");
  const queryEmbedding = await embedder.embed(imagePath);
  console.log("queryEmbedding", queryEmbedding)
  const queryResult = await index.query({
      vector: queryEmbedding.values,
      includeMetadata: true,
      includeValues: true,
      topK: 6
  });
  return queryResult.matches?.map(match => {
    const metadata = match.metadata;
    return {
      src: metadata ? metadata.imagePath : '',
      score: match.score
    };  
  });
};