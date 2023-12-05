import { NextFunction, Request, Response } from "express";
import { Op } from "sequelize";
const db = require('../models');


const getExisDiscounts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const currentDate = new Date();
        const discounts = await db.Discount.findAll({
            where: {
                end: {
                    [Op.gte]: currentDate
                }
            }
        })

        return res.status(200).json({
            EC: 0,
            EM: 'OK',
            DT: discounts
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
    getExisDiscounts
}