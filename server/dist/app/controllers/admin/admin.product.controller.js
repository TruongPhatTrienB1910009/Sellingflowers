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
const db = require('../../models');
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
        console.log(req.file.path);
        const info = Object.assign({ img: req.file.path }, req.body);
        const product = yield db.Product.create(info);
        yield product.save();
        if (product.id) {
            return res.status(200).json({
                EM: 'Product created',
                EC: 0,
                DT: product
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'Product created failed',
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
            EM: 'Product created failed',
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
            EM: 'Product created failed',
            EC: -1,
            DT: error.message
        });
    }
});
module.exports = {
    createProduct, upload, createSupplier, getAllSuppliers
};
