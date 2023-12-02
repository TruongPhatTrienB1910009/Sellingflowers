import { NextFunction, Request, Response } from "express";
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

        const billCreated = await db.Bill.findOne({
            where: {
                AccountId: user[0].id,
            },
            include: {
                model: db.BillStatus,
                where: {
                    statuscode: 0
                }
            }
        })

        if (billCreated) {

            const detailbill = await db.DetailBill.findOne({
                where: {
                    ProductId: req.body.ProductId,
                    BillId: billCreated.id
                }
            })

            if (detailbill) {
                const product = await db.Product.findOne({
                    where: {
                        id: req.body.ProductId
                    }
                })

                await detailbill.update({
                    totalItems: req.body.totalItems,
                    priceItem: product.price,
                    totalPriceItem: req.body.totalItems * product.price
                })

                await detailbill.save();
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

                const data = { BillId: billCreated.id, ...req.body, totalPriceItem:  req.body.totalItems * product.price, priceItem: product.price}
                const newDetail = await db.DetailBill.create(data);
                await newDetail.save();
                return res.status(200).json({
                    EM: 'add product successfully',
                    EC: 0,
                    DT: newDetail
                })
            }
        } else {
            const billstatus = await db.BillStatus.findOne({
                where: {
                    statuscode: 0
                }
            })
            const bill = await db.Bill.create({ "AccountId": user[0].id, "BillStatusId": billstatus.id});
            await bill.save();
            const product = await db.Product.findOne({
                where: {
                    id: req.body.ProductId
                }
            })
            const data = { BillId: bill.id, ...req.body, totalPriceItem:  req.body.totalItems * product.price, priceItem: product.price }
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
                },
                {
                    model: db.BillStatus,
                    where: {
                        statuscode: 0
                    }
                }
            ],
            where: {
                AccountId: user.id,
            },
        })

        if(data) {
            return res.status(200).json({
                EM: 'OK',
                EC: 0,
                DT: data
            })
        } else {
            return res.status(200).json({
                EM: 'NOT OK',
                EC: 0,
                DT: 'NO ITEMS'
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
        console.log(req.body)

        const user = await db.Account.findOne({
            where: {
                email: req.user.email
            }
        })

        const billStatus = await db.BillStatus.findOne({
            where: {
                statuscode: 0
            }
        })
    
        const billCreated = await db.Bill.findOne({
            where: {
                AccountId: user.id,
                BillStatusId: billStatus.id
            }
        })
    
        if(billCreated) {
            await db.DetailBill.destroy({
                where: {
                    BillId: billCreated.id,
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
        const product = await db.Product.findOne({
            where: {
                id: req.body.ProductId
            }
        })

        const result = await db.DetailBill.update({
            totalItems: req.body.totalItems,
            totalPriceItem: req.body.totalItems * product.price
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
