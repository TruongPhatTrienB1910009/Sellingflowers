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
const db = require('../models');
const getAccount = (req, res, nexr) => {
    res.send({
        "message": "hi"
    });
};
const signIn = (req, res, next) => {
    res.send({
        "message": "hi"
    });
};
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db.Account.findOne({ where: { email: req.body.email } });
        if (user) {
            return res.status(500).json({
                message: "Email already"
            });
        }
        else {
            const newAccount = yield db.Account.create(req.body);
            yield newAccount.save();
            return res.status(200).json({
                message: "Account created",
                account: newAccount
            });
        }
    }
    catch (error) {
        console.log(req.body);
        console.log(error);
        return res.status(500).json({
            error: error
        });
    }
});
module.exports = {
    getAccount, signUp
};
