"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('sellingflower', 'root', '22042022', {
    host: 'localhost',
    dialect: 'mysql'
});
exports.default = sequelize;
