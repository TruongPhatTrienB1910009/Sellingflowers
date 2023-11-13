
import { queryImages } from "@/embedding/query";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        try {
            const { imagePath } = await req.json();
            const matchingImages = await queryImages(imagePath);
            if(matchingImages) {
                return NextResponse.json({
                    EC: 0,
                    EM: 'OK',
                    DT: matchingImages
                });
            }
        } catch (error) {
            return NextResponse.json({
                EC: -1,
                EM: 'NOT OK',
                DT: error
            });
        }
    } catch (error) {
        return NextResponse.json({
            EC: -1,
            EM: 'NOT OK',
            DT: error
        });
    }
}