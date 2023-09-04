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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv = require('dotenv');
dotenv.config();
const JWT = require('jsonwebtoken');
const db = require('../models');
const getRolesAccount = (account) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield db.Group_account.findOne({
            include: {
                model: db.Role,
                attributes: ["id", "url", "description"],
                through: { attributes: [] }
            },
            where: { id: account.GroupAccountId }
        });
        if (data) {
            return data;
        }
        else {
            return {};
        }
    }
    catch (error) {
        throw (error);
    }
});
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salt = yield bcrypt_1.default.genSalt(10);
        const hasedPassword = yield bcrypt_1.default.hash(password, salt);
        return hasedPassword;
    }
    catch (error) {
        throw (error);
    }
});
const checkPassword = (password, hasedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield bcrypt_1.default.compare(password, hasedPassword);
        return result;
    }
    catch (error) {
        throw (error);
    }
});
const createToken = (payload) => {
    let key = process.env.jwt;
    let token = null;
    try {
        token = JWT.sign(payload, key, { expiresIn: "3h" });
    }
    catch (error) {
        throw (error);
    }
    return token;
};
const verifyToken = (token) => {
    let data = null;
    let key = process.env.jwt;
    try {
        data = JWT.verify(token, key);
    }
    catch (error) {
        throw (error);
    }
    return data;
};
module.exports = {
    getRolesAccount, hashPassword, checkPassword, createToken, verifyToken
};
