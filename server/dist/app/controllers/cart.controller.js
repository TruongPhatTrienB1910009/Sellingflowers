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
const ApiError = require('../../api-error');
const db = require('../models');
const addToCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db.Account.findAll({
            where: {
                email: req.user.email
            }
        });
        console.log("useruseruseruseruseruseruseruseruseruser", user[0]);
        const billCreated = yield db.Bill.findAll({
            where: {
                AccountId: user[0].id,
                CheckoutId: 1
            }
        });
        console.log("billCreated", billCreated[0]);
        if (billCreated[0]) {
            console.log("ha", req.body.ProductId, billCreated[0].id);
            const detailbill = yield db.DetailBill.findAll({
                where: {
                    ProductId: req.body.ProductId,
                    BillId: billCreated[0].id
                }
            });
            if (detailbill[0]) {
                yield detailbill[0].update({
                    totalItems: detailbill[0].totalItems + req.body.totalItems
                });
                yield detailbill[0].save();
                return res.status(200).json({
                    EM: 'add product successfully',
                    EC: 0,
                    DT: detailbill[0]
                });
            }
            else {
                const data = Object.assign({ BillId: billCreated[0].id }, req.body);
                const newDetail = yield db.DetailBill.create(data);
                yield newDetail.save();
                return res.status(200).json({
                    EM: 'add product successfully',
                    EC: 0,
                    DT: newDetail
                });
            }
        }
        else {
            console.log("user[0].id", user[0].id);
            console.log("----------------------------------------------------------------");
            const bill = yield db.Bill.create({ "AccountId": user[0].id, "CheckoutId": 1 });
            yield bill.save();
            const data = Object.assign({ BillId: bill.id }, req.body);
            const detail = yield db.DetailBill.create(data);
            yield detail.save();
            console.log("detail", detail.id);
            console.log("detail", detail);
            const result = yield db.DetailBill.findOne({
                where: {
                    BillId: bill.id
                },
                include: [{ all: true }]
            });
            return res.status(200).json({
                EM: 'add product successfully',
                EC: 0,
                DT: result
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'not found',
            EC: -1,
            DT: error
        });
    }
});
module.exports = {
    addToCart
};
