import { NextFunction, Request, Response } from "express";
import { Op } from "sequelize";
import { createShipment, getInfoShipment } from "../../utils/checkout.utils";
const db = require('../../models');

interface adminRequest extends Request {
    user: any
}

const getAllReceipts = async (req: adminRequest, res: Response, next: NextFunction) => {
    try {
        const receipts = await db.Bill.findAll({
            include: [
                { model: db.Product },
                { model: db.Account },
                { model: db.DeliveryAddress },
                { model: db.Checkout },
                { model: db.BillStatus, where: { statuscode: { [Op.notIn]: [0] } } },
            ]
        })

        if (receipts) {
            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: receipts
            })
        }
    } catch (error) {
        return res.status(500).json({
            EC: -1,
            EM: 'NOT OK',
            DT: (error as Error).message
        })
    }
}

const updateStatusReceipt = async (req: adminRequest, res: Response, next: NextFunction) => {
    try {
        console.log(req.body.BillStatusId)
        console.log(req.params.id)
        const receipt = await db.Bill.update({ BillStatusId: req.body.BillStatusId }, {
            where: {
                id: req.params.id,
            }
        })

        if (receipt) {
            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: receipt
            })
        }
    } catch (error) {
        return res.status(500).json({
            EC: -1,
            EM: 'NOT OK',
            DT: (error as Error).message
        })
    }
}

const confirmReceipt = async (req: adminRequest, res: Response, next: NextFunction) => {
    try {
        const receipt = await db.Bill.findOne({
            where: {
                id: req.params.id
            },
            include: [
                { model: db.Product }
            ]
        })



        let items = receipt.Products.map((product: any) => {
            return {
                name: product.name,
                quantity: product.DetailBill.totalItems,
                weight: 100
            }
        })

        const foundAddress = await db.DeliveryAddress.findOne({
            where: {
                id: receipt.DeliveryAddressId
            }
        })

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
        }

        const shipment: any = await createShipment(data);
        if (shipment) {
            const info: any = await getInfoShipment({order_code: shipment.order_code});
            console.log("data", info)
            const status = await db.BillStatus.findOne({where: {statuscode: 2}})
            await receipt.update({ shippingcode: shipment.order_code, BillStatusId: status.id });
            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: receipt
            })
        }
    } catch (error) {
        return res.status(500).json({
            EC: -1,
            EM: 'NOT OK',
            DT: (error as Error).message
        })
    }
}

module.exports = {
    getAllReceipts, updateStatusReceipt, confirmReceipt
}