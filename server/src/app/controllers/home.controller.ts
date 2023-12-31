import { Op } from 'sequelize';
const bcrypt = require('bcrypt');
import { NextFunction, Request, Response } from "express";
import { sendEmailToReset } from "../utils/email.utils";
const { getRolesAccount, hashPassword, createToken, verifyToken } = require('../utils/account.utils');
const ApiError = require('../../api-error');
const db = require('../models');

const signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {

        console.log(req.body);
        const user = await db.Account.findOne({
            where: { email: req.body.email }
        })

        if (user) {
            console.log(req.body.password);
            console.log(user.password);
            bcrypt.compare(req.body.password, user.password, async function (err: any, result: any) {
                if (err) {
                    console.error('Error:', err);
                } else {
                    if (result) {
                        console.log('Passwords match');
                        const rolesAccount = await getRolesAccount(user);
                        const payload = {
                            email: user.email,
                            groupRoles: rolesAccount
                        }

                        let token = createToken(payload);
                        res.setHeader('Authorization', token);
                        res.status(200).json({
                            EM: 'OK',
                            EC: 0,
                            DT: {
                                accesstoken: token,
                                email: user.email,
                                groupRoles: rolesAccount
                            }
                        })
                    } else {
                        console.log('Passwords do not match');
                        res.status(500).json({
                            EM: 'Account not found',
                            EC: 500,
                            DT: "Sai mật khẩu"
                        })
                    }
                }
            });

        } else {
            res.status(500).json({
                EM: 'Account not found',
                EC: 500,
                DT: {}
            })
        }
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "An error occurred while Sign in")
        )
    }
}

const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await db.Account.findOne({ where: { email: req.body.email } });
        const gAccount = await db.Group_account.findOne({
            where: {
                name: {
                    [Op.eq]: "user"
                }
            }
        })

        if (user) {
            return res.status(500).json({
                EM: 'Email already',
                EC: 500,
                DT: {}
            })
        } else {
            req.body.password = await hashPassword(req.body.password);

            if (req.body.GroupAccountId) {
                const newAccount = await db.Account.create(req.body)
                await newAccount.save();
                return res.status(200).json({
                    EM: 'Account created',
                    EC: 0,
                    DT: newAccount
                })
            } else {
                const newAccount = await db.Account.create({
                    ...req.body,
                    GroupAccountId: gAccount.id
                })
                await newAccount.save();
                return res.status(200).json({
                    EM: 'Account created',
                    EC: 0,
                    DT: newAccount
                })
            }
        }
    } catch (error: any) {
        return next(
            new ApiError(500, error.message)
        )
    }
}

const checkUserByToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.body.token;
    try {
        const result = verifyToken(token);
        return res.status(200).json({
            EM: 'Check token successfully',
            EC: 0,
            DT: result
        })
    } catch (error: any) {
        return res.send({
            EM: 'token expired',
            EC: -1,
            DT: ""
        })
    }
}

const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await db.Categories.findAll({
            include: {
                model: db.TypeCategories
            }
        });
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

const getAllTypeCategories = async (req: Request, res: Response, next: NextFunction) => {
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

const requireForgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body;
        const result = await sendEmailToReset(email);
        if (result.token) {
            const user = await db.Account.findOne({
                where: {
                    email: email
                }
            })

            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: result.token
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

const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { password, confirm, token } = req.body;
        const newPassword = await hashPassword(password);
        const data = verifyToken(token);
        const user = await db.Account.findOne({
            where: {
                email: data.email,
            }
        })
        const result = await user.update({ password: newPassword })
        return res.status(200).json({
            EC: 0,
            EM: 'OK',
            DT: result
        })
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
    signUp, signIn, checkUserByToken, getAllCategories, getAllTypeCategories, requireForgotPassword, resetPassword
}