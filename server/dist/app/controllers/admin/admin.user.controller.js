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
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield db.Account.findAll({
            where: {
                GroupAccountId: {
                    [sequelize_1.Op.notIn]: [3]
                }
            }
        });
        if (users) {
            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: users
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
const getDetailsUserByAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db.Account.findOne({
            where: {
                id: req.params.id
            }
        });
        if (user) {
            const receipts = yield db.Bill.findAll({
                where: {
                    BillStatusId: {
                        [sequelize_1.Op.notIn]: [1]
                    },
                    AccountId: user.id
                },
                include: [
                    { model: db.Product },
                    { model: db.Account },
                    { model: db.DeliveryAddress },
                    { model: db.Checkout },
                    { model: db.BillStatus },
                ]
            });
            if (receipts) {
                return res.status(200).json({
                    EC: 0,
                    EM: 'OK',
                    DT: {
                        user: user,
                        receipts: receipts
                    }
                });
            }
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
    getAllUsers, getDetailsUserByAdmin
};
