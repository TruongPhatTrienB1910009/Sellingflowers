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
const checkout_utils_1 = require("../utils/checkout.utils");
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
        const getDetailsBill = yield db.DetailBill.findAll({
            where: {
                BillId: getBill.id
            }
        });
        if (getDetailsBill.length === req.body.checkout.length) {
            let totalPrice = 0;
            for (let i = 0; i < getDetailsBill.length; i++) {
                totalPrice += getDetailsBill[i].totalPriceItem;
            }
            const foundAddress = yield db.DeliveryAddress.findOne({
                where: {
                    id: req.body.DeliveryAddress
                }
            });
            const data = {
                "shipment": {
                    "rate": `${req.body.delivery.id}`,
                    "order_id": null,
                    "address_from": {
                        "name": "Geen.",
                        "phone": "0787899778",
                        "street": "102 Thái Thịnh",
                        "district": "700100",
                        "city": "700000",
                        "ward": "8955"
                    },
                    "address_to": {
                        "name": `${foundAddress.name}`,
                        "phone": `${foundAddress.phone}`,
                        "district": `${foundAddress.district.slice(0, foundAddress.district.indexOf("-"))}`,
                        "street": `${foundAddress.detail}`,
                        "city": `${foundAddress.city.slice(0, foundAddress.city.indexOf("-"))}`,
                        "ward": `${foundAddress.ward.slice(0, foundAddress.ward.indexOf("-"))}`
                    },
                    "parcel": {
                        "cod": totalPrice,
                        "amount": totalPrice,
                        "width": 30,
                        "height": 100,
                        "length": 30,
                        "weight": 150,
                        "metadata": "Hàng dễ vỡ, vui lòng nhẹ tay."
                    }
                }
            };
            const shipment = yield (0, checkout_utils_1.createShipment)(data);
            if (shipment) {
                console.log("shipment", shipment);
            }
        }
        else {
            // const user = await db.Account.findOne({ where: { email: req.user.email }})
            // const numberArray = req.body.checkout.map((item: any) => parseInt(item, 10))
            // const arrCheckout = (getDetailsBill.map((product: any, index: number) => {
            //     if(numberArray.includes(index)) return product;
            // })).filter((product: any) => product != null)
            // const newBill = await db.Bill.create({
            //     AccountId: user.id,
            //     BillStatusId: 2,
            //     note: req.body.note,
            //     DeliveryAddressId: req.body.DeliveryAddress,
            //     deliveryfee: req.body.deliveryfee
            // })
            // let totalPrice = 0;
            // for(let i = 0; i < arrCheckout.length; i++) {
            //     const newDetail = await db.DetailBill.create({
            //         BillId: newBill.id,
            //         ProductId: arrCheckout[i].ProductId,
            //         totalItems: arrCheckout[i].totalItems,
            //         totalPriceItem: arrCheckout[i].totalPriceItem
            //     })
            //     totalPrice += arrCheckout[i].totalPriceItem
            //     await newDetail.save();
            // }
            // await newBill.update({ totalprice: totalPrice })
            // const deleArr = arrCheckout.map((product: any, index: number) => {
            //     return product.ProductId
            // })
            // await db.DetailBill.destroy({
            //     where: {
            //         BillId: getBill.id, 
            //         ProductId: {
            //             [Op.in] : deleArr
            //         }
            //     }
            // })
            // return res.status(200).json({
            //     EC: 0,
            //     EM: 'OK',
            //     DT: newBill
            // }) 
        }
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
module.exports = {
    checkOut
};
