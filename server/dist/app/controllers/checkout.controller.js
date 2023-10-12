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
const sequelize_1 = require("sequelize");
const db = require('../models');
const checkOut = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db.Account.findOne({ where: { email: req.user.email } });
        const getBill = yield db.Bill.findOne({
            where: {
                AccountId: user.id,
                CheckoutId: 1
            }
        });
        const getDetailsBill = yield db.DetailBill.findAll({
            where: {
                BillId: getBill.id
            }
        });
        if (getDetailsBill.length === req.body.checkout.length) {
            yield getBill.update({ checkoutId: 2 });
            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: getBill
            });
        }
        else {
            const user = yield db.Account.findOne({ where: { email: req.user.email } });
            const numberArray = req.body.checkout.map((item) => parseInt(item, 10));
            const arrCheckout = (getDetailsBill.map((product, index) => {
                if (numberArray.includes(index))
                    return product;
            })).filter((product) => product != null);
            const newBill = yield db.Bill.create({
                AccountId: user.id,
                CheckoutId: req.body.checkoutId,
                note: req.body.note
            });
            let totalPrice = 0;
            for (let i = 0; i < arrCheckout.length; i++) {
                const newDetail = yield db.DetailBill.create({
                    BillId: newBill.id,
                    ProductId: arrCheckout[i].ProductId,
                    totalItems: arrCheckout[i].totalItems,
                    totalPriceItem: arrCheckout[i].totalPriceItem
                });
                totalPrice += arrCheckout[i].totalPriceItem;
                yield newDetail.save();
            }
            yield newBill.update({ totalprice: totalPrice });
            const deleArr = arrCheckout.map((product, index) => {
                return product.ProductId;
            });
            yield db.DetailBill.destroy({
                where: {
                    BillId: getBill.id,
                    ProductId: {
                        [sequelize_1.Op.in]: deleArr
                    }
                }
            });
            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: newBill
            });
        }
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
module.exports = {
    checkOut
};
