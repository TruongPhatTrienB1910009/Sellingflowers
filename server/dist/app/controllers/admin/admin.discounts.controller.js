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
function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
const createDiscount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let randomString = '';
        let check = true;
        do {
            const rd = generateRandomString(5);
            const getRandom = yield db.Discount.findOne({
                where: {
                    code: rd
                }
            });
            if (!getRandom) {
                randomString = rd;
                break;
            }
        } while (check);
        const newDiscount = yield db.Discount.create(Object.assign(Object.assign({ code: randomString }, req.body), { applied: 0 }));
        yield newDiscount.save();
        return res.status(200).json({
            EC: 0,
            EM: 'OK',
            DT: {
                newDiscount,
            }
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
const getAllDiscounts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const discounts = yield db.Discount.findAll({});
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
const deleteDiscount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db.Discount.destroy({
            where: {
                id: req.params.id,
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
            EC: -1,
            EM: 'NOT OK',
            DT: error.message
        });
    }
});
module.exports = {
    createDiscount, getAllDiscounts, deleteDiscount
};
