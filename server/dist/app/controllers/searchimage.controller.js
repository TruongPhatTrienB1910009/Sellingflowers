"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../client/public/images/search');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const uploadSearch = multer({
    storage: Storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const mimeType = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname));
        if (mimeType && extname) {
            return cb(null, true);
        }
        cb('Give proper files formate to upload');
    }
}).single('img');
const getPathImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const img = req.file.path;
        return res.status(200).json({
            EC: 0,
            EM: 'OK',
            DT: img
        });
    }
    catch (error) {
        return res.status(500).json({
            EC: -1,
            EM: 'NOT OK',
            DT: error.message
        });
    }
});
const deleteAllFiles = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const directoryPath = '../client/public/images/search'; // Change this to the path of the directory you want to clear
        // Read the directory
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                console.error('Error reading directory:', err);
                return;
            }
            console.log(files);
            // Loop through each file and delete it
            files.forEach((file) => {
                const filePath = path.join(directoryPath, file);
                console.log(filePath);
                // Delete the file
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error('Error deleting file:', filePath, err);
                    }
                    else {
                        console.log('File deleted:', filePath);
                    }
                });
            });
        });
        return res.status(200).json({
            EC: 0,
            EM: 'OK',
            DT: "Success"
        });
    }
    catch (error) {
        return res.status(500).json({
            EC: -1,
            EM: 'NOT OK',
            DT: error.message
        });
    }
});
module.exports = {
    uploadSearch, getPathImage, deleteAllFiles
};
