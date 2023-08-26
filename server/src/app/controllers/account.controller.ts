import { NextFunction, Request, Response } from "express";
const db = require('../models')

const getAccount = (req: Request, res: Response, nexr: NextFunction) => {
    res.send({
        "message": "hi"
    })
}

const signIn = (req: Request, res: Response, next: NextFunction) => {

    res.send({
        "message": "hi"
    })
}

const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await db.Account.findOne({ where: { email: req.body.email }});
        if(user) {
            return res.status(500).json({
                message: "Email already"
            })
        } else {
            const newAccount = await db.Account.create(req.body)
            await newAccount.save();
            return res.status(200).json({
                message: "Account created",
                account: newAccount
            })
        }
    } catch (error:any) {
        console.log(req.body)
        console.log(error)
        return res.status(500).json({
            error : error
        })
    }
}

module.exports = {
    getAccount, signUp
}