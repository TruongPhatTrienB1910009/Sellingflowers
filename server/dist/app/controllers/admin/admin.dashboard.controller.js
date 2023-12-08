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
        let result1 = yield db.ImportBill.findAll({
            attributes: [
                [(0, sequelize_1.fn)('MONTH', (0, sequelize_1.col)('createdAt')), 'month'],
                [(0, sequelize_1.fn)('YEAR', (0, sequelize_1.col)('createdAt')), 'year'],
                [(0, sequelize_1.fn)('SUM', (0, sequelize_1.col)('total')), 'cost'],
            ],
            where: {
                [sequelize_1.Op.and]: [
                    (0, sequelize_1.fn)('MONTH', (0, sequelize_1.col)('createdAt')),
                    (0, sequelize_1.fn)('YEAR', (0, sequelize_1.col)('createdAt')),
                ],
            },
            group: ['month', 'year'],
        });
        let result2 = yield db.Bill.findAll({
            attributes: [
                [(0, sequelize_1.fn)('MONTH', (0, sequelize_1.col)('createdAt')), 'month'],
                [(0, sequelize_1.fn)('YEAR', (0, sequelize_1.col)('createdAt')), 'year'],
                [(0, sequelize_1.fn)('SUM', (0, sequelize_1.col)('totalamount')), 'revenue'],
            ],
            where: {
                [sequelize_1.Op.and]: [
                    (0, sequelize_1.fn)('MONTH', (0, sequelize_1.col)('createdAt')),
                    (0, sequelize_1.fn)('YEAR', (0, sequelize_1.col)('createdAt')),
                ],
            },
            group: ['month', 'year'],
        });
        // result1 = JSON.parse(JSON.stringify(result1))
        // result2 = JSON.parse(JSON.stringify(result2))
        // const result: any = [];
        // console.log(result1[0].month)
        // console.log(result2[0].month)
        // for(let i=0; i< result1.length; i++) {
        //     for(let j=0; j=result2.length; j++) {
        //         if(result2[j].month === result1[i].month) {
        //             result.push({
        //                 ...result1[i],
        //                 "revenue": result2[j].revenue
        //             })
        //         }
        //     }
        // }
        return res.status(200).json({
            EC: 0,
            EM: 'OK',
            DT: {
                cost: result1,
                revenue: result2,
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
const getAllBillToday = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
        const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
        const recripts = yield db.Bill.findAll({
            where: {
                createdAt: {
                    [sequelize_1.Op.between]: [startOfDay, endOfDay]
                }
            },
            include: [
                {
                    model: db.BillStatus,
                    where: {
                        statuscode: {
                            [sequelize_1.Op.notIn]: [0]
                        }
                    }
                }
            ]
        });
        return res.status(200).json({
            EC: 0,
            EM: 'OK',
            DT: recripts
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
    costStatistics, getAllBillToday
};
