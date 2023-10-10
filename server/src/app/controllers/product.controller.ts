import { NextFunction, Request, Response } from "express";
const db = require('../models');
const multer = require('multer');
const path = require('path');

interface fileRequest extends Request {
    file: any
}

const Storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, '../client/public/images/upload');
    },
    filename: (req: any, file: any, cb: any) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage: Storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req: any, file: any, cb: any) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }

        cb('Give proper files formate to upload')
    }
}).single('img')

const createProduct = async (req: fileRequest, res: Response, next: NextFunction) => {
    try {
        const info = {
            img: req.file.path,
            ...req.body
        }
        const product = await db.Product.create(info);
        await product.save();
        if(product.id) {
            return res.status(200).json({
                EM: 'Product created',
                EC: 0,
                DT: product
            })
        }
    } catch (error) {
        return res.status(500).json({
            EM: 'Product created failed',
            EC: -1,
            DT: (error as Error).message
        });
    }
}

const getAllProducts = async (req: fileRequest, res: Response, next: NextFunction) => {
    try {
        const products = await db.Product.findAll({
            include: [
                {
                    model: db.Root
                },
                {
                    model: db.Categories
                }
            ]
        })

        if(products[0]) {
            return res.status(200).json({
                EM: 'OK',
                EC: 0,
                DT: products
            });
        }
    } catch (error) {
        return res.status(500).json({
            EM: 'NOT OK',
            EC: -1,
            DT: (error as Error).message
        });
    }
}

const getProductById = async (req: fileRequest, res: Response, next: NextFunction) => {
    try {
        const data = await db.Product.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: db.Root
                },
                {
                    model: db.Categories
                }
            ]
        })
        return res.status(200).json({
            EM: 'OK',
            EC: 0,
            DT: data
        });
    } catch (error) {
        return res.status(500).json({
            EM: 'NOT OK',
            EC: -1,
            DT: (error as Error).message
        });
    }
}



module.exports = {
    createProduct, upload, getAllProducts, getProductById
}