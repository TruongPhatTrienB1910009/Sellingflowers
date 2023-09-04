"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { getRolesAccount, hashPassword, checkPassword, createToken } = require('../utils/account.utils');
const ApiError = require('../../api-error');
const db = require('../models');
const getAccount = (req, res, next) => {
    res.send({
        "message": "welcome profile"
    });
};
module.exports = {
    getAccount
};
