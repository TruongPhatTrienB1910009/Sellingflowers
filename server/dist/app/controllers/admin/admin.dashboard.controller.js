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
const costStatistics = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("run function");
        const result = yield db.ImportBill.findAll({
            attributes: [
                [(0, sequelize_1.fn)('MONTH', (0, sequelize_1.col)('createdAt')), 'month'],
                [(0, sequelize_1.fn)('YEAR', (0, sequelize_1.col)('createdAt')), 'year'],
                [(0, sequelize_1.fn)('SUM', (0, sequelize_1.col)('total')), 'sumValue'],
            ],
            where: {
                [sequelize_1.Op.and]: [
                    (0, sequelize_1.fn)('MONTH', (0, sequelize_1.col)('createdAt')),
                    (0, sequelize_1.fn)('YEAR', (0, sequelize_1.col)('createdAt')),
                ],
            },
            group: ['month', 'year'],
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
    costStatistics
};
