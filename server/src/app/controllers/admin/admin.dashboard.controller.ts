import { NextFunction, Request, Response } from "express";
import { Op, col, fn } from "sequelize";
const db = require('../../models');

interface adminRequest extends Request {
    user: any
}

const costStatistics = async (req: adminRequest, res: Response, next: NextFunction) => {
    try {
        let result1 = await db.ImportBill.findAll({
            attributes: [
                [fn('MONTH', col('createdAt')), 'month'],
                [fn('YEAR', col('createdAt')), 'year'],
                [fn('SUM', col('total')), 'cost'],
            ],
            where: {
                [Op.and]: [
                    fn('MONTH', col('createdAt')),
                    fn('YEAR', col('createdAt')),
                ],
            },
            group: ['month', 'year'],
        })

        let result2 = await db.Bill.findAll({
            attributes: [
                [fn('MONTH', col('createdAt')), 'month'],
                [fn('YEAR', col('createdAt')), 'year'],
                [fn('SUM', col('totalamount')), 'revenue'],
            ],
            where: {
                [Op.and]: [
                    fn('MONTH', col('createdAt')),
                    fn('YEAR', col('createdAt')),
                ],
            },
            group: ['month', 'year'],
        })

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
        })
    } catch (error) {
        return res.status(500).json({
            EC: -1,
            EM: 'NOT OK',
            DT: (error as Error).message
        })
    }
}


const getAllBillToday = async (req: adminRequest, res: Response, next: NextFunction) => {
    try {
        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
        const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

        const recripts = await db.Bill.findAll({
            where: {
                createdAt: {
                    [Op.between]: [startOfDay, endOfDay]
                }
            },
            include: [
                {
                    model: db.BillStatus,
                    where: {
                        statuscode: {
                            [Op.notIn]: [0]
                        }
                    }
                }
            ]
        })

        return res.status(200).json({
            EC: 0,
            EM: 'OK',
            DT: recripts
        })
    } catch (error) {
        return res.status(500).json({
            EC: -1,
            EM: 'NOT OK',
            DT: (error as Error).message
        })
    }
}

module.exports = {
    costStatistics, getAllBillToday
}