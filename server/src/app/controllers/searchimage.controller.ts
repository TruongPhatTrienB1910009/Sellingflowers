import { NextFunction, Request, Response } from "express";
const multer = require('multer');
const path = require('path');
const fs = require('fs');

interface fileRequest extends Request {
    file: any
}

const Storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, '../client/public/images/search');
    },
    filename: (req: any, file: any, cb: any) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const uploadSearch = multer({
    storage: Storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req: any, file: any, cb: any) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))

        if (mimeType && extname) {
            return cb(null, true)
        }

        cb('Give proper files formate to upload')
    }
}).single('img')


const getPathImage = async (req: fileRequest, res: Response, next: NextFunction) => {
    try {
        const img = req.file.path;

        return res.status(200).json({
            EC: 0,
            EM: 'OK',
            DT: img
        })
    } catch (error) {
        return res.status(500).json({
            EC: -1,
            EM: 'NOT OK',
            DT: (error as Error).message
        })
    }
}

const deleteAllFiles = async (req: fileRequest, res: Response, next: NextFunction) => {
    try {
        const directoryPath = '../client/public/images/search'; // Change this to the path of the directory you want to clear

        // Read the directory
        fs.readdir(directoryPath, (err: any, files: any) => {
            if (err) {
                console.error('Error reading directory:', err);
                return;
            }

            console.log(files);
            // Loop through each file and delete it
            files.forEach((file: any) => {
                const filePath = path.join(directoryPath, file);
                console.log(filePath);
                // Delete the file
                fs.unlink(filePath, (err: any) => {
                    if (err) {
                        console.error('Error deleting file:', filePath, err);
                    } else {
                        console.log('File deleted:', filePath);
                    }
                });
            });
        });

        return res.status(200).json({
            EC: 0,
            EM: 'OK',
            DT: "Success"
        })
    } catch (error) {
        return res.status(500).json({
            EC: -1,
            EM: 'NOT OK',
            DT: (error as Error).message
        })
    }
}

module.exports = {
    uploadSearch, getPathImage, deleteAllFiles
}