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
const createNewTypeCategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db.TypeCategories.create(req.body);
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
const getTypeCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db.TypeCategories.findOne({
            where: {
                id: req.params.id
            }
        });
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
const updateTypeCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db.TypeCategories.update(req.body, {
            where: {
                id: req.params.id
            }
        });
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
const deleteTypeCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db.TypeCategories.destroy({
            where: {
                id: req.params.id
            }
        });
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
const deleteCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db.Categories.destroy({
            where: {
                id: req.params.id
            }
        });
        if (result) {
            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: result
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
module.exports = {
    createNewTypeCategories, createNewCategory, deleteCategory, updateTypeCategory, deleteTypeCategory, getTypeCategory
};
