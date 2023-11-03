import { NextFunction, Request, Response } from "express";
const db = require('../../models');

interface adminRequest extends Request {
    user: any
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

const getTypeCategory = async (req: adminRequest, res: Response, next: NextFunction) => {
    try {
        const result = await db.TypeCategories.findOne({
            where: {
                id: req.params.id
            }
        })

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
 
const updateTypeCategory = async (req: adminRequest, res: Response, next: NextFunction) => {
    try {
        const result = await db.TypeCategories.update(req.body, {
            where: {
                id: req.params.id
            }
        })

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

const deleteTypeCategory = async (req: adminRequest, res: Response, next: NextFunction) => {
    try {
        const result = await db.TypeCategories.destroy({
            where: {
                id: req.params.id
            }
        })

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
    createNewTypeCategories, createNewCategory, deleteCategory, updateTypeCategory, deleteTypeCategory, getTypeCategory
}