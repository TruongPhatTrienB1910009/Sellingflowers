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
const db = require('../models');
const getBillById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bill = yield db.Bill.findOne({
            where: {
                id: req.params.id
            },
            include: [
                { model: db.Product },
                { model: db.Account },
                { model: db.DeliveryAddress },
                { model: db.Checkout },
                { model: db.BillStatus },
            ]
        });
        if (bill) {
            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: bill
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
const cancelBill = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const billstatus = yield db.BillStatus.findOne({
            where: {
                statuscode: 3
            }
        });
        yield db.Bill.update({ BillStatusId: billstatus.id }, {
            where: {
                id: req.params.id
            }
        });
        return res.status(200).json({
            EC: 0,
            EM: 'OK',
            DT: ""
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
    getBillById, cancelBill
};
