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
exports.getAllProductsByCategory = void 0;
const sequelize_1 = require("sequelize");
const db = require('../models');
const getAllProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield db.Product.findAll({
            include: [
                {
                    model: db.Root
                },
                {
                    model: db.Categories
                }
            ]
        });
        if (products[0]) {
            return res.status(200).json({
                EM: 'OK',
                EC: 0,
                DT: products
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            EM: 'NOT OK',
            EC: -1,
            DT: error.message
        });
    }
});
const getProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield db.Product.findOne({
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
        });
        return res.status(200).json({
            EM: 'OK',
            EC: 0,
            DT: data
        });
    }
    catch (error) {
        return res.status(500).json({
            EM: 'NOT OK',
            EC: -1,
            DT: error.message
        });
    }
});
const sortProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sortBy, order } = req.body;
        console.log("req.body", req.body);
        let products = [];
        switch (sortBy) {
            case 'sales':
                products = yield db.DetailBill.findAll({
                    attributes: ['ProductId', [db.sequelize.fn('SUM', db.sequelize.col('totalItems')), 'sumTotalItems']],
                    group: ['ProductId'],
                    order: [
                        ['sumTotalItems', 'DESC']
                    ]
                });
                break;
            case 'ctime':
                products = yield db.Product.findAll({
                    order: [
                        ['createdAt', 'DESC']
                    ]
                });
                break;
            case 'price':
                products = yield db.Product.findAll({
                    order: [
                        ['price', order]
                    ]
                });
                break;
        }
        if (products) {
            return res.status(200).json({
                EM: 'OK',
                EC: 0,
                DT: products
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            EM: 'NOT OK',
            EC: -1,
            DT: error.message
        });
    }
});
const filterProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { minPrice, maxPrice } = req.body;
        const products = yield db.Product.findAll({
            where: {
                price: {
                    [sequelize_1.Op.between]: [minPrice, maxPrice]
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
        });
        if (products) {
            return res.status(200).json({
                EM: 'OK',
                EC: 0,
                DT: products
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            EM: 'NOT OK',
            EC: -1,
            DT: error.message
        });
    }
});
const getAllProductsByCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield db.Product.findAll({
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
        });
        if (products) {
            return res.status(200).json({
                EM: 'OK',
                EC: 0,
                DT: products
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            EM: 'NOT OK',
            EC: -1,
            DT: error.message
        });
    }
});
exports.getAllProductsByCategory = getAllProductsByCategory;
const getAllReviewByProductId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield db.Review.findAll({
            where: {
                ProductId: req.params.id
            },
            include: [
                { model: db.Account },
                { model: db.Product }
            ]
        });
        return res.status(200).json({
            EC: 0,
            EM: "OK",
            DT: reviews
        });
    }
    catch (error) {
        return res.status(500).json({
            EC: -1,
            EM: "NOT OK",
            DT: error.message
        });
    }
});
module.exports = {
    getAllProducts, getProductById, sortProducts, filterProducts, getAllProductsByCategory: exports.getAllProductsByCategory, getAllReviewByProductId
};
