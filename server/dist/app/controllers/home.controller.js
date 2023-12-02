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
const sequelize_1 = require("sequelize");
const email_utils_1 = require("../utils/email.utils");
const { getRolesAccount, hashPassword, createToken, verifyToken } = require('../utils/account.utils');
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
                    email: user.email,
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
        const gAccount = yield db.Group_account.findOne({
            where: {
                name: {
                    [sequelize_1.Op.eq]: "user"
                }
            }
        });
        if (user) {
            return res.status(500).json({
                EM: 'Email already',
                EC: 500,
                DT: {}
            });
        }
        else {
            req.body.password = yield hashPassword(req.body.password);
            if (req.body.GroupAccountId) {
                const newAccount = yield db.Account.create(req.body);
                yield newAccount.save();
                return res.status(200).json({
                    EM: 'Account created',
                    EC: 0,
                    DT: newAccount
                });
            }
            else {
                const newAccount = yield db.Account.create(Object.assign(Object.assign({}, req.body), { GroupAccountId: gAccount.id }));
                yield newAccount.save();
                return res.status(200).json({
                    EM: 'Account created',
                    EC: 0,
                    DT: newAccount
                });
            }
        }
    }
    catch (error) {
        return next(new ApiError(500, error.message));
    }
});
const checkUserByToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.body.token;
    try {
        const result = verifyToken(token);
        return res.status(200).json({
            EM: 'Check token successfully',
            EC: 0,
            DT: result
        });
    }
    catch (error) {
        return res.send({
            EM: 'token expired',
            EC: -1,
            DT: ""
        });
    }
});
const getAllCategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield db.Categories.findAll({
            include: {
                model: db.TypeCategories
            }
        });
        if (categories) {
            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: categories
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            EC: -1,
            EM: 'NOT OK',
            DT: error.message
        });
    }
});
const getAllTypeCategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const typeCategories = yield db.TypeCategories.findAll({});
        if (typeCategories) {
            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: typeCategories
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            EC: -1,
            EM: 'NOT OK',
            DT: error.message
        });
    }
});
const requireForgotPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const result = yield (0, email_utils_1.sendEmailToReset)(email);
        if (result.token) {
            const user = yield db.Account.findOne({
                where: {
                    email: email
                }
            });
            return res.status(200).json({
                EC: 0,
                EM: 'OK',
                DT: result.token
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            EC: -1,
            EM: 'NOT OK',
            DT: error.message
        });
    }
});
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, confirm, token } = req.body;
        const newPassword = yield hashPassword(password);
        const data = verifyToken(token);
        const user = yield db.Account.findOne({
            where: {
                email: data.email,
            }
        });
        const result = yield user.update({ password: newPassword });
        return res.status(200).json({
            EC: 0,
            EM: 'OK',
            DT: result
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            EC: -1,
            EM: 'NOT OK',
            DT: error.message
        });
    }
});
module.exports = {
    signUp, signIn, checkUserByToken, getAllCategories, getAllTypeCategories, requireForgotPassword, resetPassword
};
