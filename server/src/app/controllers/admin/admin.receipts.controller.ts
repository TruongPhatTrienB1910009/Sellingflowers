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
            }
        })

        const foundAddress = await db.DeliveryAddress.findOne({
            where: {
                id: receipt.DeliveryAddressId
            }
        })

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
        }

        const shipment: any = await createShipment(data);
        if (shipment.id) {
            const data: any = await getInfoShipment(shipment.id);
            const status = await db.BillStatus.findOne({where: {statuscode: data[0].status_code}})
            await receipt.update({ shippingcode: shipment.id, BillStatusId: status.id });
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