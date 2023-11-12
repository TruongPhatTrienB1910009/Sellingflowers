import { embedder } from "@/embedding/embeddings";
import { embedAndUpsert } from "@/embedding/indexImages";
import { queryImages } from "@/embedding/query";
import { Pinecone } from "@pinecone-database/pinecone";
import { deleteImageInFolder } from "./manageImages";

type Metadata = {
    imagePath: string;
}

const indexName = process.env.NEXT_PUBLIC_PINECONE_INDEX;
const pinecone = new Pinecone({
    apiKey: process.env.NEXT_PUBLIC_PINECONE_API_KEY as string,
    environment: process.env.NEXT_PUBLIC_PINECONE_ENVIRONMENT as string,
});
const index = pinecone.Index(indexName as string);

export const embedingImage = async (imagePath: any) => {
    try {
        const imagePaths = [imagePath];
        await embedder.init("Xenova/clip-vit-base-patch32");
        await embedAndUpsert({ imagePaths, chunkSize: 100 });
    } catch (error) {
        console.log(error);
    }
}


export const searchImage = async (imagePath: any) => {
    try {
        const matchingImages = await queryImages(imagePath);
        return matchingImages;
    } catch (error) {
        console.log(error);
    }
}

export const deleteImage = async (imagePath: any) => {
    try {
        await embedder.init("Xenova/clip-vit-base-patch32");
        const queryEmbedding = await embedder.embed(imagePath);
        const queryResult = await index.query({
            vector: queryEmbedding.values,
            filter: {
                imagePath: imagePath
            },
            includeMetadata: true,
            includeValues: true,
            topK: 1
        });
        const img = queryResult.matches[0].metadata?.imagePath;
        const id = queryResult.matches[0].id;
        await index.deleteOne(`${id}`);
        await deleteImageInFolder(img);
    } catch (error) {
        console.log(error);
    }
}