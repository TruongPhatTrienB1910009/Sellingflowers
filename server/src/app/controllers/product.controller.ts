import { NextFunction, Request, Response } from "express";
const db = require('../models');

const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await db.Product.findAll({
            include: [
                {
                    model: db.Root
                },
                {
                    model: db.Categories
                }
            ]
        })

        if(products[0]) {
            return res.status(200).json({
                EM: 'OK',
                EC: 0,
                DT: products
            });
        }
    } catch (error) {
        return res.status(500).json({
            EM: 'NOT OK',
            EC: -1,
            DT: (error as Error).message
        });
    }
}

const getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await db.Product.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: db.Root
                },
                {
                    model: db.Categories
                }
            ]
        })
        return res.status(200).json({
            EM: 'OK',
            EC: 0,
            DT: data
        });
    } catch (error) {
        return res.status(500).json({
            EM: 'NOT OK',
            EC: -1,
            DT: (error as Error).message
        });
    }
}



module.exports = {
    getAllProducts, getProductById
}