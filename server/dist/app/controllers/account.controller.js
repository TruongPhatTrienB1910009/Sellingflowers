"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require('../models');
const getAccount = (req, res, next) => {
    res.send({
        "message": "WELL COME"
    });
};
module.exports = {
    getAccount
};
