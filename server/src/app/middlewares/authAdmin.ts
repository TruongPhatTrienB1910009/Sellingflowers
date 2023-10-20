import { NextFunction, Request, Response } from "express";
const db = require("../models/index");
interface IGetUserAuthInfoRequest extends Request {
    user: any
}

const checkAdmin = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if (user) {
        try {
            const check = await db.Account.findOne({
                where: {
                    GroupAccountId: 3
                }
            })

            if(check.email === user.email) {
                next();
            } else {
                return res.status(500).json({
                    EC: -1,
                    EM: 'Not Admin',
                    DT: {}
                })
            }
        } catch (error: any) {
            res.status(401).json({
                EC: -1,
                EM: error.message,
                DT: ''
            })
        }
    } else {
        res.status(401).json({
            EC: -1,
            EM: 'No token',
            DT: {}
        })
    }
}

module.exports = {
    checkAdmin
}