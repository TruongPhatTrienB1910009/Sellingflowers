import { NextFunction, Request, Response } from "express";
import { Op } from "sequelize";
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
        const {name, width, height, description, price, characteristic, use, takecare} = req.body;

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
            width: width,
            height: height,
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
                    DT: product
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            EM: 'NOT OK',
            EC: -1,
            DT: (error as Error).message
        });
    }
}

const updateProduct = async (req: fileRequest, res: Response, next: NextFunction) => {
    try {
        console.log(req.body.name);
        const product = await db.Product.update ({...req.body}, {
            where: {
                id: req.params.id
            }
        })

        if(product) {
            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: product
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

const createImportBillMultipleProducts = async (req: fileRequest, res: Response, next: NextFunction) => {
    try {
        console.log(req.body);
        const {listItems, listTotalItems, listPriceItem, supplierId} = req.body;

        console.log(listItems);
        // lấy danh sách sản phẩm
        const products = await db.Product.findAll({
            where: {
                id: {
                    [Op.in]: listItems
                }
            }
        })

        // tạo importbill
        const importbill = await db.ImportBill.create({
            SupplierId: supplierId
        })

        await importbill.save();

        if(importbill) {
            let i = 0;
            let total = 0;
            for(i; i < products.length; i++) {
                const detailImportBill = await db.DetailImportBill.create({
                    totalItems: listTotalItems[i],
                    priceItem: listPriceItem[i],
                    totalPrice: listTotalItems[i] * listPriceItem[i],
                    ImportBillId: importbill.id,
                    ProductId: products[i].id
                })
                await detailImportBill.save();
                await products[i].update({ inventory: listTotalItems[i] +  products[i].inventory});
                total += listTotalItems[i] * listPriceItem[i];
            }

            if(total > 0) {
                await importbill.update({total: total});
            }

            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: importbill
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


const deleteProduct = async (req: fileRequest, res: Response, next: NextFunction) => {
    try {
        const result = await db.Product.destroy({
            where: {
                id: req.params.id
            }
        })

        return res.status(200).json({
            EC: 0,
            EM: 'OK',
            DT: result
        })
    } catch (error) {
        return res.status(500).json({
            EM: 'NOT OK',
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
            EM: 'NOT OK',
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
            EM: 'NOT OK',
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

const updateSupplier = async (req: fileRequest, res: Response, next: NextFunction) => {
    try {
        console.log({...req.body})
        const result = await db.Supplier.update({...req.body}, {
            where: {
                id: req.params.id
            }
        });

        if(result) {
            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: result
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
    createProduct, upload, createSupplier, getAllSuppliers, getSupplierById, createImportBillMultipleProducts, deleteProduct,
    updateProduct, updateSupplier
}