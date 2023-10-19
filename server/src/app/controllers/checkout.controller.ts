import { NextFunction, Request, Response } from "express";
import { Op } from "sequelize";
const db = require('../models');

interface UserRequest extends Request {
    user: any;
}

const checkOut = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
        console.log(req.body);
        const user = await db.Account.findOne({ where: { email: req.user.email } })
        req.body.checkout = JSON.parse(req.body.checkout);
        const getBill = await db.Bill.findOne({
            where: {
                AccountId: user.id,
                BillStatusId: 1
            }
        })

        const getDetailsBill = await db.DetailBill.findAll({
            where: {
                BillId: getBill.id
            }
        })

        if(getDetailsBill.length === req.body.checkout.length) {
            let totalPrice = 0;
            for(let i = 0; i < getDetailsBill.length; i++) {
                totalPrice += getDetailsBill[i].totalPriceItem
            }
            await getBill.update({BillStatusId: 2, DeliveryAddressId: req.body.DeliveryAddress, totalprice: totalPrice})
            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: getBill
            })
        } else {
            const user = await db.Account.findOne({ where: { email: req.user.email }})
            const numberArray = req.body.checkout.map((item: any) => parseInt(item, 10))

            const arrCheckout = (getDetailsBill.map((product: any, index: number) => {
                if(numberArray.includes(index)) return product;
            })).filter((product: any) => product != null)

            const newBill = await db.Bill.create({
                AccountId: user.id,
                BillStatusId: 2,
                note: req.body.note,
                DeliveryAddressId: req.body.DeliveryAddress
            })

            let totalPrice = 0;
            for(let i = 0; i < arrCheckout.length; i++) {
                const newDetail = await db.DetailBill.create({
                    BillId: newBill.id,
                    ProductId: arrCheckout[i].ProductId,
                    totalItems: arrCheckout[i].totalItems,
                    totalPriceItem: arrCheckout[i].totalPriceItem
                })
                totalPrice += arrCheckout[i].totalPriceItem
                await newDetail.save();
            }

            await newBill.update({ totalprice: totalPrice + req.body.deleveryfee })

            const deleArr = arrCheckout.map((product: any, index: number) => {
                return product.ProductId
            })

            await db.DetailBill.destroy({
                where: {
                    BillId: getBill.id, 
                    ProductId: {
                        [Op.in] : deleArr
                    }
                }
            })

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