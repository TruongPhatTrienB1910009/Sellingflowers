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
const sequelize_1 = require("sequelize");
const db = require("../../models");
const multer = require('multer');
const path = require('path');
const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../client/public/images/upload');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({
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
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // lấy Nguồn gốc
        const { country, area } = req.body;
        // lấy thông tin sản phẩm
        const img = req.file.path;
        const { name, size, description, price, characteristic, use, takecare } = req.body;
        // Details ImportBill
        const { totalItems, priceItem } = req.body;
        // lấy subblier
        const { SupplierId } = req.body;
        // lấy danh mục
        const { CategoryId } = req.body;
        // Tạo nguồn gốc
        const root = yield db.Root.create({ country: country, area: area });
        yield root.save();
        // Tạo sản phẩm
        const product = yield db.Product.create({
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
        });
        yield product.save();
        // Tạo phiếu nhập sản phẩm
        const importBill = yield db.ImportBill.create({
            SupplierId: SupplierId,
            total: totalItems * priceItem
        });
        yield importBill.save();
        if (importBill) {
            // Tạo detailImportBill
            const details = yield db.DetailImportBill.create({
                ImportBillId: importBill.id,
                ProductId: product.id,
                priceItem: priceItem,
                totalItems: totalItems,
                totalPrice: totalItems * priceItem
            });
            yield details.save();
            if (details) {
                return res.status(200).json({
                    EM: 'Product created',
                    EC: 0,
                    DT: importBill
                });
            }
        }
    }
    catch (error) {
        return res.status(500).json({
            EM: 'NOT OK',
            EC: -1,
            DT: error.message
        });
    }
});
const createImportBillMultipleProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const { listItems, listTotalItems, listPriceItem, supplierId } = req.body;
        console.log(listItems);
        // lấy danh sách sản phẩm
        const products = yield db.Product.findAll({
            where: {
                id: {
                    [sequelize_1.Op.in]: listItems
                }
            }
        });
        // tạo importbill
        const importbill = yield db.ImportBill.create({
            SupplierId: supplierId
        });
        yield importbill.save();
        if (importbill) {
            let i = 0;
            let total = 0;
            for (i; i < products.length; i++) {
                const detailImportBill = yield db.DetailImportBill.create({
                    totalItems: listTotalItems[i],
                    priceItem: listPriceItem[i],
                    totalPrice: listTotalItems[i] * listPriceItem[i],
                    ImportBillId: importbill.id,
                    ProductId: products[i].id
                });
                yield detailImportBill.save();
                yield products[i].update({ inventory: listTotalItems[i] + products[i].inventory });
                total += listTotalItems[i] * listPriceItem[i];
            }
            if (total > 0) {
                yield importbill.update({ total: total });
            }
            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: importbill
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            EM: 'NOT OK',
            EC: -1,
            DT: error.message
        });
    }
});
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db.Product.destroy({
            where: {
                id: req.params.id
            }
        });
        return res.status(200).json({
            EC: 0,
            EM: 'OK',
            DT: result
        });
    }
    catch (error) {
        return res.status(500).json({
            EM: 'NOT OK',
            EC: -1,
            DT: error.message
        });
    }
});
// Supplier
const getAllSuppliers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const suppliers = yield db.Supplier.findAll();
        if (suppliers) {
            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: suppliers
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            EM: 'NOT OK',
            EC: -1,
            DT: error.message
        });
    }
});
const createSupplier = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const supplier = yield db.Supplier.create(req.body);
        if (supplier) {
            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: supplier
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            EM: 'NOT OK',
            EC: -1,
            DT: error.message
        });
    }
});
const getSupplierById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const supplier = yield db.Supplier.findOne({
            where: {
                id: req.params.id,
            }
        });
        if (supplier) {
            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: supplier
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            EM: 'NOT OK',
            EC: -1,
            DT: error.message
        });
    }
});
module.exports = {
    createProduct, upload, createSupplier, getAllSuppliers, getSupplierById, createImportBillMultipleProducts, deleteProduct
};
