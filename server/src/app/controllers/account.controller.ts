import { NextFunction, Request, Response } from "express";
const db = require('../models');

interface UserRequest extends Request  {
    user: any;
}

// account/profile

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


// account/address

const getAllAddress = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
        const user = await db.Account.findOne({
            where: {
                email: req.user.email
            }
        })

        const result = await db.DeliveryAddress.findAll({
            where: {
                AccountId: user.id
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
        const user = await db.Account.findOne({
            where: {
                email: req.user.email
            }
        })

        const data = {
            AccountId: user.id,
            ...req.body
        }

        const newAddress = await db.DeliveryAddress.create(data);
        if (newAddress) {
            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: newAddress
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


const getDetailAddress = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
        const address = await db.DeliveryAddress.findOne({
            where: {
                id: req.params.id
            }
        })

        if(address) {
            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: address
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

const updateDeliveryAddress = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
        const address = await db.DeliveryAddress.update({ ...req.body },{
            where: {
                id: req.params.id
            }
        })

        if(address) {
            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: address
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
    getAccount, updateAccount, createDeliveryAddress, getAllAddress, updateDeliveryAddress, getDetailAddress
}