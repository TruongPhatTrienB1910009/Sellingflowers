import { NextFunction, Request, Response } from "express";
const db = require('../models');

interface UserRequest extends Request  {
    user: any;
}

const getAccount = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
        const account = await db.Account.findOne({
            where: {
                email: req.user.email
            }
        })

        if(account) {
            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: account
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

const updateAccount = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
        const result = await db.Account.update({...req.body}, {
            where: {
                email: req.user.email
            }
        })

        if(result) {
            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: result
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

const createDeliveryAddress = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
        
    } catch (error) {
        
    }
}

module.exports = {
    getAccount, updateAccount
}