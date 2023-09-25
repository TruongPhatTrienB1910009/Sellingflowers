import { NextFunction, Request, Response } from "express";
const ApiError = require('../../api-error');
const db = require('../models');

const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await db.Product.create(req.body);
        await product.save();
        if(product.id) {
            return res.status(200).json({
                EM: 'Product created',
                EC: 0,
                DT: product
            })
        }
    } catch (error) {
        return res.status(500).json({
            EM: 'Product created failed',
            EC: 0,
            DT: error
        });
    }
}

module.exports = {
    createProduct,
}