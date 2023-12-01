import { NextFunction, Request, Response } from "express";
import { Op } from "sequelize";
const db = require('../models');

interface UserRequest extends Request {
    user: any;
}

const checkOut = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
        console.log("checkOut", req.body)

        const user = await db.Account.findOne({ where: { email: req.user.email } })
        req.body.checkout = JSON.parse(req.body.checkout);
        const getBill = await db.Bill.findOne({
            where: {
                AccountId: user.id,
            },
            include: {
                model: db.BillStatus,
                where: {
                    statuscode: 0
                }
            }
        })

        const getDetailsBill = await db.DetailBill.findAll({
            where: {
                BillId: getBill.id
            }
        })

        const getStatus = await db.BillStatus.findOne({
            where: {
                statuscode: 1
            }
        })

        if (getDetailsBill.length === req.body.checkout.length) {
            let totalPrice = 0;
            for (let i = 0; i < getDetailsBill.length; i++) {
                const Product = await db.Product.findOne({where: {id: getDetailsBill[i].ProductId}});
                await Product.update({inventory: Product.inventory - getDetailsBill[i].totalItems});
                totalPrice += getDetailsBill[i].totalPriceItem
            }

            await getBill.update({ BillStatusId: getStatus.id, DeliveryAddressId: req.body.DeliveryAddress, totalprice: totalPrice, deliveryfee: req.body.delivery.total })
            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: getBill
            })


        } else {
            const numberArray = req.body.checkout.map((item: any) => parseInt(item, 10))

            const arrCheckout = (getDetailsBill.map((product: any, index: number) => {
                if (numberArray.includes(index)) return product;
            })).filter((product: any) => product != null)

            const newBill = await db.Bill.create({
                AccountId: user.id,
                BillStatusId: getStatus.id,
                note: req.body.note,
                DeliveryAddressId: req.body.DeliveryAddress
            })

            let totalPrice = 0;
            for (let i = 0; i < arrCheckout.length; i++) {
                const newDetail = await db.DetailBill.create({
                    BillId: newBill.id,
                    ProductId: arrCheckout[i].ProductId,
                    totalItems: arrCheckout[i].totalItems,
                    totalPriceItem: arrCheckout[i].totalPriceItem
                })
                const Product = await db.Product.findOne({where: {id: arrCheckout[i].ProductId}});
                await Product.update({inventory: Product.inventory - arrCheckout[i].totalItems});
                totalPrice += arrCheckout[i].totalPriceItem
                await newDetail.save();
            }

            const deleArr = arrCheckout.map((product: any, index: number) => {
                return product.ProductId
            })

            await db.DetailBill.destroy({
                where: {
                    BillId: getBill.id,
                    ProductId: {
                        [Op.in]: deleArr
                    }
                }
            })

            await newBill.update({ DeliveryAddressId: req.body.DeliveryAddress, totalprice: totalPrice, deliveryfee: req.body.delivery.total })

            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: newBill
            })
        }

    } catch (error) {
        return res.status(500).json({ error: (error as Error).message });
    }
}

module.exports = {
    checkOut
}
