import { NextFunction, Request, Response } from "express";
const db = require('../../models');

interface adminRequest extends Request {
    user: any
}

const getAllCategories = async (req: adminRequest, res: Response, next: NextFunction) => {
    try {
        const categories = await db.Categories.findAll({});
        if (categories) {
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
        if (newCategory) {
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

const getAllTypeCategories = async (req: adminRequest, res: Response, next: NextFunction) => {
    try {
        const typeCategories = await db.TypeCategories.findAll({});
        if (typeCategories) {
            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: typeCategories
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

const createNewTypeCategories = async (req: adminRequest, res: Response, next: NextFunction) => {
    try {
        const result = await db.TypeCategories.create(req.body);
        if (result) {
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

const deleteCategory = async (req: adminRequest, res: Response, next: NextFunction) => {
    try {
        const result = await db.Categories.destroy({
            where: {
                id: req.params.id
            }
        });
        if (result) {
            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: result
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

module.exports = {
    getAllCategories, getAllTypeCategories, createNewTypeCategories, createNewCategory, deleteCategory
}