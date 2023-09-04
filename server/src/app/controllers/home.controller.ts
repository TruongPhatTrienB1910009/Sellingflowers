import { NextFunction, Request, Response } from "express";
const { getRolesAccount, hashPassword, checkPassword, createToken } = require('../utils/account.utils');
const ApiError = require('../../api-error');
const db = require('../models');

const signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await db.Account.findOne({
            where: { email: req.body.email }
        })

        if(user) {
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
                    groupRoles: rolesAccount
                }
            })
        }else {
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
        if (user) {
            return res.status(500).json({
                EM: 'Email already',
                EC: 500,
                DT: {}
            })
        } else {
            req.body.password = await hashPassword(req.body.password);
            const newAccount = await db.Account.create(req.body)
            await newAccount.save();
            return res.status(200).json({
                EM: 'Account created',
                EC: 0,
                DT: newAccount
            })
        }
    } catch (error: any) {
        return next(
            new ApiError(500, error.message)
        )
    }
}

module.exports = {
    signUp, signIn
}