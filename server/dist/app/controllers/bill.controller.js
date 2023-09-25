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
const ApiError = require('../../api-error');
const db = require('../models');
const addToCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const billCreated = yield db.Bill.findAll({
        order: ['createdAt', 'DESC']
    });
    if (billCreated) {
        return res.status(200).json({
            EM: 'bill created recentlly',
            EC: 0,
            DT: billCreated
        });
    }
    else {
        return res.status(500).json({
            EM: 'not found',
            EC: -1,
            DT: billCreated
        });
    }
});
module.exports = {
    addToCart
};
