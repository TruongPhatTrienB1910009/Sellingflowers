import { NextFunction, Request, Response } from "express";
const db = require('../models');

interface IGetUserAuthInfoRequest extends Request {
    user: any
}

const getBillById = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    try {
        const bill = await db.Bill.findOne({
            where: {
                id: req.params.id
            }, 
            include: [
                {model: db.Product},
                {model: db.Account},
                {model: db.DeliveryAddress},
                {model: db.Checkout},
                {model: db.BillStatus},
            ]
        })

        if(bill) {
            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: bill
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
    getBillById
}