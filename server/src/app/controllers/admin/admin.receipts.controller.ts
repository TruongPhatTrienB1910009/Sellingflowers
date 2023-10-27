import { NextFunction, Request, Response } from "express";
const db = require('../../models');

interface adminRequest extends Request {
    user: any
}

const getAllReceipts = async (req: adminRequest, res: Response, next: NextFunction) => {
    try {
        const receipts = await db.Bill.findAll({
            include: [
                {model: db.Product},
                {model: db.Account},
                {model: db.DeliveryAddress},
                {model: db.Checkout},
                {model: db.BillStatus},
            ]
        })

        if(receipts) {
            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: receipts
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
    getAllReceipts
}