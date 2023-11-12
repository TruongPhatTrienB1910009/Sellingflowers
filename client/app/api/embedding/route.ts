
import { embedder } from "@/embedding/embeddings";
import { embedAndUpsert, indexImages } from "@/embedding/indexImages";
import { chunkedUpsert } from "@/embedding/utils/chunkedUpsert";
import { Pinecone, PineconeRecord } from "@pinecone-database/pinecone";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        await indexImages();
        return NextResponse.json({ message: 'Indexing complete' });
    } catch (error) {
        return NextResponse.json({ error: 'Error indexing images' });
    }
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { imagePath } = await req.json();
        const imagePaths = [imagePath]; 
        await embedder.init("Xenova/clip-vit-base-patch32");
        await embedAndUpsert({ imagePaths, chunkSize: 100 }); 
        return NextResponse.json("success");
    } catch (error) {
        return NextResponse.json({ error: 'Error when upload images to pinecone' });
    }
}