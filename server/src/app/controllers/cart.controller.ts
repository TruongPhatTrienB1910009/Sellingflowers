import { NextFunction, Request, Response } from "express";
const ApiError = require('../../api-error');
const db = require('../models');

interface IGetUserAuthInfoRequest extends Request {
    user: any
}

const addToCart = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    try {
        const user = await db.Account.findAll({
            where: {
                email: req.user.email
            }
        });

        const billCreated = await db.Bill.findAll({
            where: {
                AccountId: user[0].id,
                CheckoutId: 1
            }
        })

        if (billCreated[0]) {

            const detailbill = await db.DetailBill.findAll({
                where: {
                    ProductId: req.body.ProductId,
                    BillId: billCreated[0].id
                }
            })

            if (detailbill[0]) {
                const product = await db.Product.findOne({
                    where: {
                        id: req.body.ProductId
                    }
                })

                await detailbill[0].update({
                    totalItems: req.body.totalItems,
                    totalPriceItem: req.body.totalItems * product.price
                })

                await detailbill[0].save();
                return res.status(200).json({
                    EM: 'add product successfully',
                    EC: 0,
                    DT: detailbill[0]
                })
            } else {
                const product = await db.Product.findOne({
                    where: {
                        id: req.body.ProductId
                    }
                })

                const data = { BillId: billCreated[0].id, ...req.body, totalPriceItem:  req.body.totalItems * product.price}
                console.log(data)
                const newDetail = await db.DetailBill.create(data);
                await newDetail.save();
                return res.status(200).json({
                    EM: 'add product successfully',
                    EC: 0,
                    DT: newDetail
                })
            }
        } else {
            const bill = await db.Bill.create({ "AccountId": user[0].id, "CheckoutId": 1 });
            await bill.save();
            const product = await db.Product.findOne({
                where: {
                    id: req.body.ProductId
                }
            })
            const data = { BillId: bill.id, ...req.body, totalPriceItem:  req.body.totalItems * product.price }
            const detail = await db.DetailBill.create(data);
            await detail.save();

            const result = await db.DetailBill.findOne({
                where: {
                    BillId: bill.id
                },
                include: [{ all: true}]
            })
            return res.status(200).json({
                EM: 'add product successfully',
                EC: 0,
                DT: result
            })
        }
    } catch (error) {
        return res.status(500).json({
            EM: 'not found',
            EC: -1,
            DT: error
        })
    }
}


const getAllItemsInCart = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    try {
        const user = await db.Account.findOne({
            where: {
                email: req.user.email
            }
        })

        const data = await db.Bill.findOne({
            include: [
                {
                    model: db.Product,
                    through: db.DetailBill
                },
                {
                    model: db.Checkout
                }
            ],
            where: {
                AccountId: user.id
            }
        })

        if(data) {
            return res.status(200).json({
                EM: 'OK',
                EC: 0,
                DT: data
            })
        }
    } catch (error) {
        return res.status(500).json({
            EM: 'failed',
            EC: -1,
            DT: (error as Error).message
        })
    }
}

const removeItemFromCart = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    try {
        const user = await db.Account.findOne({
            where: {
                email: req.user.email
            }
        })
    
        const billCreated = await db.Bill.findAll({
            where: {
                AccountId: user.id,
                CheckoutId: 1
            }
        })
    
        if(billCreated[0]) {
            await db.DetailBill.destroy({
                where: {
                    BillId: billCreated[0].id,
                    ProductId: req.body.ProductId
                }
            })

            return res.status(200).json({
                EM: 'OK',
                EC: 0,
                DT: {}
            })
        }
    } catch (error) {
        return res.status(500).json({
            EM: 'failed',
            EC: -1,
            DT: (error as Error).message
        })
    }
}

const updateTotalItems = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    try {
        const result = await db.DetailBill.update({
            totalItems: req.body.totalItems
        }, {
            where: {
                BillId: req.body.BillId,
                ProductId: req.body.ProductId
            }
        })

        if(result) {
            return res.status(200).json({
                EM: 'OK',
                EC: 0,
                DT: result
            })
        }
    } catch (error) {
        return res.status(500).json({
            EM: 'failed',
            EC: -1,
            DT: (error as Error).message
        })
    }
}


module.exports = {
    addToCart, getAllItemsInCart, removeItemFromCart, updateTotalItems
}
