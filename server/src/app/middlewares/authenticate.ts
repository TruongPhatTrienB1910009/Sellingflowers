import { NextFunction, Request, Response } from "express";
const { verifyToken } = require('../utils/account.utils');
interface IGetUserAuthInfoRequest extends Request {
    user: any
}

const checkUserJWT = (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if(token) {
        try {
            const result = verifyToken(token);
            req.user = result;
            next();
        } catch (error: any) {
            res.status(401).json({
                EC: -1,
                EM: error.message,
                DT: ''
            })
        }
    }else {
        res.status(401).json({
            EC: -1,
            EM: 'No token',
            DT: {}
        })
    }
}

module.exports = {
    checkUserJWT
}