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
const addToCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db.Account.findAll({
            where: {
                email: req.user.email
            }
        });
        const billCreated = yield db.Bill.findOne({
            where: {
                AccountId: user[0].id,
            },
            include: {
                model: db.BillStatus,
                where: {
                    statuscode: 0
                }
            }
        });
        if (billCreated) {
            const detailbill = yield db.DetailBill.findOne({
                where: {
                    ProductId: req.body.ProductId,
                    BillId: billCreated.id
                }
            });
            if (detailbill) {
                const product = yield db.Product.findOne({
                    where: {
                        id: req.body.ProductId
                    }
                });
                yield detailbill.update({
                    totalItems: req.body.totalItems,
                    totalPriceItem: req.body.totalItems * product.price
                });
                yield detailbill.save();
                return res.status(200).json({
                    EM: 'add product successfully',
                    EC: 0,
                    DT: detailbill[0]
                });
            }
            else {
                const product = yield db.Product.findOne({
                    where: {
                        id: req.body.ProductId
                    }
                });
                const data = Object.assign(Object.assign({ BillId: billCreated.id }, req.body), { totalPriceItem: req.body.totalItems * product.price });
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
            const billstatus = yield db.BillStatus.findOne({
                where: {
                    statuscode: 0
                }
            });
            const bill = yield db.Bill.create({ "AccountId": user[0].id, "BillStatusId": billstatus.id });
            yield bill.save();
            const product = yield db.Product.findOne({
                where: {
                    id: req.body.ProductId
                }
            });
            const data = Object.assign(Object.assign({ BillId: bill.id }, req.body), { totalPriceItem: req.body.totalItems * product.price });
            const detail = yield db.DetailBill.create(data);
            yield detail.save();
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
        return res.status(500).json({
            EM: 'not found',
            EC: -1,
            DT: error
        });
    }
});
const getAllItemsInCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db.Account.findOne({
            where: {
                email: req.user.email
            }
        });
        const data = yield db.Bill.findOne({
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
        });
        if (data) {
            return res.status(200).json({
                EM: 'OK',
                EC: 0,
                DT: data
            });
        }
        else {
            return res.status(200).json({
                EM: 'NOT OK',
                EC: 0,
                DT: 'NO ITEMS'
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            EM: 'failed',
            EC: -1,
            DT: error.message
        });
    }
});
const removeItemFromCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const user = yield db.Account.findOne({
            where: {
                email: req.user.email
            }
        });
        const billStatus = yield db.BillStatus.findOne({
            where: {
                statuscode: 0
            }
        });
        const billCreated = yield db.Bill.findOne({
            where: {
                AccountId: user.id,
                BillStatusId: billStatus.id
            }
        });
        if (billCreated) {
            yield db.DetailBill.destroy({
                where: {
                    BillId: billCreated.id,
                    ProductId: req.body.ProductId
                }
            });
            return res.status(200).json({
                EM: 'OK',
                EC: 0,
                DT: {}
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            EM: 'failed',
            EC: -1,
            DT: error.message
        });
    }
});
const updateTotalItems = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield db.Product.findOne({
            where: {
                id: req.body.ProductId
            }
        });
        const result = yield db.DetailBill.update({
            totalItems: req.body.totalItems,
            totalPriceItem: req.body.totalItems * product.price
        }, {
            where: {
                BillId: req.body.BillId,
                ProductId: req.body.ProductId
            }
        });
        if (result) {
            return res.status(200).json({
                EM: 'OK',
                EC: 0,
                DT: result
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            EM: 'failed',
            EC: -1,
            DT: error.message
        });
    }
});
module.exports = {
    addToCart, getAllItemsInCart, removeItemFromCart, updateTotalItems
};
