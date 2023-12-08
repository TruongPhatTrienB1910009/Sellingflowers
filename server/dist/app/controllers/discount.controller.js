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
const db = require('../models');
const getExisDiscounts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentDate = new Date();
        const discounts = yield db.Discount.findAll({
            where: {
                end: {
                    [sequelize_1.Op.gte]: currentDate
                }
            }
        });
        return res.status(200).json({
            EC: 0,
            EM: 'OK',
            DT: discounts
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
const getDiscountById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const discount = yield db.Discount.findOne({
            where: {
                id: req.params.id,
            }
        });
        return res.status(200).json({
            EC: 0,
            EM: 'OK',
            DT: discount
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
const deleteDiscountById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const discount = yield db.Discount.destroy({
            where: {
                id: req.params.id,
            }
        });
        return res.status(200).json({
            EC: 0,
            EM: 'OK',
            DT: discount
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
    getExisDiscounts, getDiscountById, deleteDiscountById
};
