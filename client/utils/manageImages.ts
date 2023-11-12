import path from "path";
import fs from "fs";

export const deleteImageInFolder = async (imagePath: any) => {
    try {
        // Read the directory
        fs.unlink(imagePath, (err: any) => {
            if (err) {
                console.error('Error deleting file:', imagePath, err);
            } else {
                console.log('File deleted:', imagePath);
            }
        });
    } catch (error) {
        console.log(error);
    }
}