import { Op } from 'sequelize';
import { NextFunction, Request, Response } from "express";
const db = require('../../models');

interface adminRequest extends Request {
    user: any
}

const getAllUsers = async (req: adminRequest, res: Response, next: NextFunction) => {
    try {
        const users = await db.Account.findAll({
            where: {
                GroupAccountId: {
                    [Op.notIn]: [3]
                }
            }
        });
        if(users) {
            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: users
            })
        }
    } catch (error) {
        return res.status(500).json({
            EC: -1,
            EM: 'NOT OK',
            DT: (error as Error).message
        })
    }
}

module.exports = {
    getAllUsers
}