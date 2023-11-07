import { NextFunction, Request, Response } from "express";
import { Op, col, fn } from "sequelize";
const db = require('../../models');

interface adminRequest extends Request {
    user: any
}

const costStatistics = async (req: adminRequest, res: Response, next: NextFunction) => {
    try {
        console.log("run function");
        const result = await db.ImportBill.findAll({
            attributes: [
                [fn('MONTH', col('createdAt')), 'month'],
                [fn('YEAR', col('createdAt')), 'year'],
                [fn('SUM', col('total')), 'sumValue'],
            ],
            where: {
                [Op.and]: [
                    fn('MONTH', col('createdAt')),
                    fn('YEAR', col('createdAt')),
                ],
            },
            group: ['month', 'year'],
        })

        return res.status(200).json({
            EC: 0,
            EM: 'OK',
            DT: result
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
    costStatistics
}