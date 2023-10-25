import { NextFunction, Request, Response } from "express";
const db = require("../../models");
const multer = require('multer');
const path = require('path');

interface fileRequest extends Request {
    file: any,
    user: any
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
        // lấy Nguồn gốc
        const {country, area} = req.body;

        // lấy thông tin sản phẩm
        const img = req.file.path;
        const {name, size, description, price, characteristic, use, takecare} = req.body;

        // Details ImportBill
        const {totalItems, priceItem} = req.body;

        // lấy subblier
        const {SupplierId} = req.body;

        // lấy danh mục
        const {CategoryId} = req.body;

        // Tạo nguồn gốc
        const root = await db.Root.create({country: country, area: area});
        await root.save();

        // Tạo sản phẩm
        const product = await db.Product.create({
            name: name,
            size: size,
            description: description,
            price: price,
            characteristic: characteristic,
            use: use,
            takecare: takecare,
            img: img,
            inventory: totalItems,
            CategoryId: CategoryId,
            RootId: root.id
        })
        await product.save();

        // Tạo phiếu nhập sản phẩm
        const importBill = await db.ImportBill.create({
            SupplierId: SupplierId,
            total: totalItems * priceItem
        })
        await importBill.save();

        if(importBill) {
            // Tạo detailImportBill
            const details = await db.DetailImportBill.create({
                ImportBillId: importBill.id,
                ProductId: product.id,
                priceItem: priceItem,
                totalItems: totalItems,
                totalPrice: totalItems * priceItem
            })
            await details.save();

            if(details) {
                return res.status(200).json({
                    EM: 'Product created',
                    EC: 0,
                    DT: importBill
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            EM: 'Product created failed',
            EC: -1,
            DT: (error as Error).message
        });
    }
}


// Supplier

const getAllSuppliers = async (req: fileRequest, res: Response, next: NextFunction) => {
    try {
        const suppliers = await db.Supplier.findAll();

        if(suppliers) {
            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: suppliers
            });
        }
    } catch (error) {
        return res.status(500).json({
            EM: 'Product created failed',
            EC: -1,
            DT: (error as Error).message
        });
    }
}

const createSupplier = async (req: fileRequest, res: Response, next: NextFunction) => {
    try {
        const supplier = await db.Supplier.create(req.body);
        if (supplier) {
            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: supplier
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

const getSupplierById = async (req: fileRequest, res: Response, next: NextFunction) => {
    try {
        const supplier = await db.Supplier.findOne({
            where: {
                id: req.params.id,
            }
        })

        if(supplier) {
            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: supplier
            })
        }
    } catch (error) {
        return res.status(500).json({
            EM: 'NOT OK',
            EC: -1,
            DT: (error as Error).message
        });
    }
}

module.exports = {
    createProduct, upload, createSupplier, getAllSuppliers, getSupplierById
}