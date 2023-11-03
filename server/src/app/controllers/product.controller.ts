import { NextFunction, Request, Response } from "express";
import { Op } from "sequelize";
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

        if (products[0]) {
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

const sortProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { sortBy, order } = req.body;
        console.log("req.body", req.body);
        let products = [];
        switch (sortBy) {
            case 'sales':
                products = await db.DetailBill.findAll({
                    attributes: ['ProductId', [db.sequelize.fn('SUM', db.sequelize.col('totalItems')), 'sumTotalItems']],
                    group: ['ProductId'],
                    order: [
                        ['sumTotalItems', 'DESC']
                    ]
                })
                break;
            case 'ctime':
                products = await db.Product.findAll({
                    order: [
                        ['createdAt', 'DESC']
                    ]
                })
                break;
            case 'price':
                products = await db.Product.findAll({
                    order: [
                        ['price', order]
                    ]
                })
                break;
        }

        if (products) {
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

const filterProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { minPrice, maxPrice } = req.body;
        const products = await db.Product.findAll({
            where: {
                price: {
                    [Op.between]: [minPrice, maxPrice]
                }
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

        if (products) {
            return res.status(200).json({
                EM: 'OK',
                EC: 0,
                DT: products
            })
        }
    } catch (error) {
        return res.status(500).json({
            EM: 'NOT OK',
            EC: -1,
            DT: (error as Error).message
        });
    }
}

export const getAllProductsByCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await db.Product.findAll({
            include: [
                {
                    model: db.Root
                },
                {
                    model: db.Categories,
                }
            ],
            where: {
                CategoryId: req.params.categoryid
            }
        })

        if (products) {
            return res.status(200).json({
                EM: 'OK',
                EC: 0,
                DT: products
            })
        }
    } catch (error) {
        return res.status(500).json({
            EM: 'NOT OK',
            EC: -1,
            DT: (error as Error).message
        });
    }
}

module.exports = {
    getAllProducts, getProductById, sortProducts, filterProducts, getAllProductsByCategory
}