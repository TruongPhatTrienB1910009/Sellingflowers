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
            },
            include: [
                { model: db.Product }
            ]
        });
        let items = receipt.Products.map((product) => {
            return {
                name: product.name,
                quantity: product.DetailBill.totalItems,
                weight: 100
            };
        });
        const foundAddress = yield db.DeliveryAddress.findOne({
            where: {
                id: receipt.DeliveryAddressId
            }
        });
        const data = {
            "payment_type_id": 2,
            "note": "",
            "required_note": "KHONGCHOXEMHANG",
            "return_phone": "",
            "return_address": "",
            "return_district_id": null,
            "return_ward_code": "",
            "client_order_code": "",
            "to_name": foundAddress.name,
            "to_phone": foundAddress.phone,
            "to_address": foundAddress.detail,
            "to_ward_code": foundAddress.ward.slice(0, foundAddress.ward.indexOf("-")),
            "to_district_id": Number(foundAddress.district.slice(0, foundAddress.district.indexOf("-"))),
            "cod_amount": Number(receipt.totalprice),
            "content": "",
            "height": 50,
            "length": 20,
            "weight": 100,
            "width": 40,
            "pick_station_id": null,
            "deliver_station_id": null,
            "insurance_value": null,
            "service_id": 53320,
            "service_type_id": null,
            "coupon": null,
            "items": items
        };
        const getStatus = yield db.BillStatus.findOne({
            where: {
                statuscode: 2
            }
        });
        const shipment = yield (0, checkout_utils_1.createShipment)(data);
        if (shipment) {
            const info = yield (0, checkout_utils_1.getInfoShipment)({ order_code: shipment.order_code });
            const status = yield db.BillStatus.findOne({ where: { statuscode: 2 } });
            yield receipt.update({ shippingcode: shipment.order_code, BillStatusId: status.id, state: 1 });
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
