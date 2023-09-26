import { NextFunction, Request, Response } from "express";
const db = require('../models');


const getAccount = (req: Request, res: Response, next: NextFunction) => {
    res.send({
        "message": "WELL COME"
    })
}

module.exports = {
    getAccount
}