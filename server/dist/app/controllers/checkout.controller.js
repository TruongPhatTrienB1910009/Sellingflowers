"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db = require('../models');
const checkOut = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("checkOut", req.body);
        const user = yield db.Account.findOne({ where: { email: req.user.email } });
        req.body.checkout = JSON.parse(req.body.checkout);
        const getBill = yield db.Bill.findOne({
            where: {
                AccountId: user.id,
            },
            include: {
                model: db.BillStatus,
                where: {
                    statuscode: 0
                }
            }
        });
        return res.status(200).json({
            DT: getBill
        });
        // const getDetailsBill = await db.DetailBill.findAll({
        //     where: {
        //         BillId: getBill.id
        //     }
        // })
        // if(getDetailsBill.length === req.body.checkout.length) {
        //     let totalPrice = 0;
        //     for(let i = 0; i < getDetailsBill.length; i++) {
        //         totalPrice += getDetailsBill[i].totalPriceItem
        //     }
        //     await getBill.update({BillStatusId: 2, DeliveryAddressId: req.body.DeliveryAddress, totalprice: totalPrice, deliveryfee: req.body.deliveryfee})
        //     return res.status(200).json({
        //         EC: 0,
        //         EM: 'OK',
        //         DT: getBill
        //     })
        // } else {
        //     const user = await db.Account.findOne({ where: { email: req.user.email }})
        //     const numberArray = req.body.checkout.map((item: any) => parseInt(item, 10))
        //     const arrCheckout = (getDetailsBill.map((product: any, index: number) => {
        //         if(numberArray.includes(index)) return product;
        //     })).filter((product: any) => product != null)
        //     const newBill = await db.Bill.create({
        //         AccountId: user.id,
        //         BillStatusId: 2,
        //         note: req.body.note,
        //         DeliveryAddressId: req.body.DeliveryAddress,
        //         deliveryfee: req.body.deliveryfee
        //     })
        //     let totalPrice = 0;
        //     for(let i = 0; i < arrCheckout.length; i++) {
        //         const newDetail = await db.DetailBill.create({
        //             BillId: newBill.id,
        //             ProductId: arrCheckout[i].ProductId,
        //             totalItems: arrCheckout[i].totalItems,
        //             totalPriceItem: arrCheckout[i].totalPriceItem
        //         })
        //         totalPrice += arrCheckout[i].totalPriceItem
        //         await newDetail.save();
        //     }
        //     await newBill.update({ totalprice: totalPrice })
        //     const deleArr = arrCheckout.map((product: any, index: number) => {
        //         return product.ProductId
        //     })
        //     await db.DetailBill.destroy({
        //         where: {
        //             BillId: getBill.id, 
        //             ProductId: {
        //                 [Op.in] : deleArr
        //             }
        //         }
        //     })
        //     return res.status(200).json({
        //         EC: 0,
        //         EM: 'OK',
        //         DT: newBill
        //     }) 
        // }
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
module.exports = {
    checkOut
};
