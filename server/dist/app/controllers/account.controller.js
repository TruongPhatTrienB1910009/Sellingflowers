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
const getAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const account = yield db.Account.findOne({
            where: {
                email: req.user.email
            }
        });
        if (account) {
            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: account
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
const updateAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db.Account.update(Object.assign({}, req.body), {
            where: {
                email: req.user.email
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
const createDeliveryAddress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
    }
});
module.exports = {
    getAccount, updateAccount
};
