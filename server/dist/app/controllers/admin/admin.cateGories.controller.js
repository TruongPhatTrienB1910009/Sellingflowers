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
const getAllCategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield db.Categories.findAll({});
        if (categories) {
            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: categories
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            EC: -1,
            EM: 'NOT OK',
            DT: error.message
        });
    }
});
const createNewCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCategory = yield db.Categories.create(req.body);
        if (newCategory) {
            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: newCategory
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            EC: -1,
            EM: 'NOT OK',
            DT: error.message
        });
    }
});
const getAllTypeProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const typeProducts = yield db.TypeProduct.findAll({});
        if (typeProducts) {
            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: typeProducts
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            EC: -1,
            EM: 'NOT OK',
            DT: error.message
        });
    }
});
const createNewTypeProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db.TypeProduct.create(req.body);
        if (result) {
            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: result
            });
        }
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
    getAllCategories, getAllTypeProducts, createNewTypeProducts, createNewCategory
};
