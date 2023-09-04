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
const { getRolesAccount, hashPassword, checkPassword, createToken } = require('../utils/account.utils');
const ApiError = require('../../api-error');
const db = require('../models');
const signIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db.Account.findOne({
            where: { email: req.body.email }
        });
        if (user) {
            const rolesAccount = yield getRolesAccount(user);
            const payload = {
                email: user.email,
                groupRoles: rolesAccount
            };
            let token = createToken(payload);
            res.setHeader('Authorization', token);
            res.status(200).json({
                EM: 'OK',
                EC: 0,
                DT: {
                    accesstoken: token,
                    groupRoles: rolesAccount
                }
            });
        }
        else {
            res.status(500).json({
                EM: 'Account not found',
                EC: 500,
                DT: {}
            });
        }
    }
    catch (error) {
        console.log(error);
        return next(new ApiError(500, "An error occurred while Sign in"));
    }
});
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db.Account.findOne({ where: { email: req.body.email } });
        if (user) {
            return res.status(500).json({
                EM: 'Email already',
                EC: 500,
                DT: {}
            });
        }
        else {
            req.body.password = yield hashPassword(req.body.password);
            const newAccount = yield db.Account.create(req.body);
            yield newAccount.save();
            return res.status(200).json({
                EM: 'Account created',
                EC: 0,
                DT: newAccount
            });
        }
    }
    catch (error) {
        return next(new ApiError(500, error.message));
    }
});
module.exports = {
    signUp, signIn
};
