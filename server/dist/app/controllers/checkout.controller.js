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
        const getStatus = yield db.BillStatus.findOne({
            where: {
                statuscode: 1
            }
        });
        if (getDetailsBill.length === req.body.checkout.length) {
            let totalPrice = 0;
            for (let i = 0; i < getDetailsBill.length; i++) {
                const Product = yield db.Product.findOne({ where: { id: getDetailsBill[i].ProductId } });
                yield Product.update({ inventory: Product.inventory - getDetailsBill[i].totalItems });
                totalPrice += getDetailsBill[i].totalPriceItem;
            }
            if (req.body.discountId) {
                const getDiscount = yield db.Discount.findOne({
                    where: {
                        id: req.body.discountId
                    }
                });
                yield getBill.update({ BillStatusId: getStatus.id, DeliveryAddressId: req.body.DeliveryAddress, totalprice: totalPrice, deliveryfee: req.body.delivery.total, discountfee: getDiscount.amount, DiscountId: req.body.discountId, totalamount: totalPrice + req.body.delivery.total - getDiscount.amount });
                yield getDiscount.update({ applied: getDiscount.applied + 1 });
            }
            else {
                yield getBill.update({ BillStatusId: getStatus.id, DeliveryAddressId: req.body.DeliveryAddress, totalprice: totalPrice, deliveryfee: req.body.delivery.total, discountfee: 0, totalamount: totalPrice + req.body.delivery.total });
            }
            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: getBill
            });
        }
        else {
            const numberArray = req.body.checkout.map((item) => parseInt(item, 10));
            const arrCheckout = (getDetailsBill.map((product, index) => {
                if (numberArray.includes(index))
                    return product;
            })).filter((product) => product != null);
            const newBill = yield db.Bill.create({
                AccountId: user.id,
                BillStatusId: getStatus.id,
                note: req.body.note,
                DeliveryAddressId: req.body.DeliveryAddress
            });
            let totalPrice = 0;
            for (let i = 0; i < arrCheckout.length; i++) {
                const newDetail = yield db.DetailBill.create({
                    BillId: newBill.id,
                    ProductId: arrCheckout[i].ProductId,
                    totalItems: arrCheckout[i].totalItems,
                    totalPriceItem: arrCheckout[i].totalPriceItem
                });
                const Product = yield db.Product.findOne({ where: { id: arrCheckout[i].ProductId } });
                yield Product.update({ inventory: Product.inventory - arrCheckout[i].totalItems });
                totalPrice += arrCheckout[i].totalPriceItem;
                yield newDetail.save();
            }
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
            // await newBill.update({ DeliveryAddressId: req.body.DeliveryAddress, totalprice: totalPrice, deliveryfee: req.body.delivery.total })
            if (req.body.discountId) {
                const getDiscount = yield db.Discount.findOne({
                    where: {
                        id: req.body.discountId
                    }
                });
                yield newBill.update({ DeliveryAddressId: req.body.DeliveryAddress, totalprice: totalPrice, deliveryfee: req.body.delivery.total, discountfee: getDiscount.amount, DiscountId: req.body.discountId, totalamount: totalPrice + req.body.delivery.total - getDiscount.amount });
                yield getDiscount.update({ applied: getDiscount.applied + 1 });
            }
            else {
                yield newBill.update({ DeliveryAddressId: req.body.DeliveryAddress, totalprice: totalPrice, deliveryfee: req.body.delivery.total, discountfee: 0, totalamount: totalPrice + req.body.delivery.total });
            }
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
