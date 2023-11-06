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
const checkout_utils_1 = require("../../utils/checkout.utils");
const db = require('../../models');
const getAllReceipts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const receipts = yield db.Bill.findAll({
            include: [
                { model: db.Product },
                { model: db.Account },
                { model: db.DeliveryAddress },
                { model: db.Checkout },
                { model: db.BillStatus, where: { statuscode: { [sequelize_1.Op.notIn]: [0] } } },
            ]
        });
        if (receipts) {
            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: receipts
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            EC: -1,
            EM: 'NOT OK',
            DT: error.message
        });
    }
});
const updateStatusReceipt = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body.BillStatusId);
        console.log(req.params.id);
        const receipt = yield db.Bill.update({ BillStatusId: req.body.BillStatusId }, {
            where: {
                id: req.params.id,
            }
        });
        if (receipt) {
            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: receipt
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            EC: -1,
            EM: 'NOT OK',
            DT: error.message
        });
    }
});
const confirmReceipt = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const receipt = yield db.Bill.findOne({
            where: {
                id: req.params.id
            }
        });
        const foundAddress = yield db.DeliveryAddress.findOne({
            where: {
                id: receipt.DeliveryAddressId
            }
        });
        const data = {
            "shipment": {
                "rate": `${receipt.deliverycode}`,
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
                    "cod": `${receipt.totalprice}`,
                    "amount": `${receipt.totalprice}`,
                    "width": 30,
                    "height": 100,
                    "length": 30,
                    "weight": 150,
                    "metadata": "Hàng dễ vỡ, vui lòng nhẹ tay."
                }
            }
        };
        const shipment = yield (0, checkout_utils_1.createShipment)(data);
        if (shipment.id) {
            const data = yield (0, checkout_utils_1.getInfoShipment)(shipment.id);
            const status = yield db.BillStatus.findOne({ where: { statuscode: data[0].status_code } });
            yield receipt.update({ shippingcode: shipment.id, BillStatusId: status.id });
            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: receipt
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            EC: -1,
            EM: 'NOT OK',
            DT: error.message
        });
    }
});
module.exports = {
    getAllReceipts, updateStatusReceipt, confirmReceipt
};
