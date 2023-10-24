import { NextFunction, Request, Response } from "express";
const db = require('../../models');

interface adminRequest extends Request {
    user: any
}

const getAllCategories = async (req: adminRequest, res: Response, next: NextFunction) => {
    try {
        const categories = await db.Categories.findAll({});
        if(categories) {
            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: categories
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EC: -1,
            EM: 'NOT OK',
            DT: (error as Error).message
        })
    }
}

const createNewCategory = async (req: adminRequest, res: Response, next: NextFunction) => {
    try {
        const newCategory = await db.Categories.create(req.body);
        if(newCategory) {
            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: newCategory
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

const getAllTypeProducts = async (req: adminRequest, res: Response, next: NextFunction) => {
    try {
        const typeProducts = await db.TypeProduct.findAll({});
        if(typeProducts) {
            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: typeProducts
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EC: -1,
            EM: 'NOT OK',
            DT: (error as Error).message
        })
    }
}

const createNewTypeProducts = async (req: adminRequest, res: Response, next: NextFunction) => {
    try {
        const result = await db.TypeProduct.create(req.body);
        if(result) {
            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: result
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
    getAllCategories, getAllTypeProducts, createNewTypeProducts, createNewCategory
}