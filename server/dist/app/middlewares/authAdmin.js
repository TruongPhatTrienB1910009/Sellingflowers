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
const db = require("../models/index");
const checkAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        try {
            const check = yield db.Account.findOne({
                where: {
                    GroupAccountId: 3
                }
            });
            if (check.email === user.email) {
                next();
            }
            else {
                return res.status(500).json({
                    EC: -1,
                    EM: 'Not Admin',
                    DT: {}
                });
            }
        }
        catch (error) {
            res.status(401).json({
                EC: -1,
                EM: error.message,
                DT: ''
            });
        }
    }
    else {
        res.status(401).json({
            EC: -1,
            EM: 'No token',
            DT: {}
        });
    }
});
module.exports = {
    checkAdmin
};
