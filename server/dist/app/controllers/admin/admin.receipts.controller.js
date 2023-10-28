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
const db = require('../../models');
const getAllReceipts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const receipts = yield db.Bill.findAll({
            include: [
                { model: db.Product },
                { model: db.Account },
                { model: db.DeliveryAddress },
                { model: db.Checkout },
                { model: db.BillStatus },
            ],
            where: {
                BillStatusId: {
                    [sequelize_1.Op.notIn]: [1]
                }
            }
        });
        if (receipts) {
            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: receipts
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
const updateStatusReceipt = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body.BillStatusId);
        console.log(req.params.id);
        const receipt = yield db.Bill.update({ BillStatusId: req.body.BillStatusId }, {
            where: {
                id: req.params.id,
            }
        });
        if (receipt) {
            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: receipt
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
    getAllReceipts, updateStatusReceipt
};