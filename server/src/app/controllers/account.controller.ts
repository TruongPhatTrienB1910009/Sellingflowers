import { NextFunction, Request, Response } from "express";
const { getRolesAccount, hashPassword, checkPassword, createToken } = require('../utils/account.utils');
const ApiError = require('../../api-error');
const db = require('../models');

const getAccount = (req: Request, res: Response, next: NextFunction) => {
    res.send({
        "message": "welcome profile"
    })
}

module.exports = {
    getAccount
}