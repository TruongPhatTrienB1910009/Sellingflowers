"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { verifyToken } = require('../utils/account.utils');
const checkUserJWT = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (token) {
        try {
            const result = verifyToken(token);
            req.user = result;
            next();
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
};
module.exports = {
    checkUserJWT
};
