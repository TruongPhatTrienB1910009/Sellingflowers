
import { queryImages } from "@/embedding/query";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        try {
            const { query } = await req.json();
            const matchingImages = await queryImages(query.imagePath);
            if(query) {
                return NextResponse.json(matchingImages);
            }
        } catch (error) {
            return NextResponse.json({ error: 'Error fetching images' });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error fetching images' });
    }
}