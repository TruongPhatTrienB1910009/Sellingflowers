"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('sellingflower', 'root', '22042022', {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
        options: {
            // Your tedious options here
            useUTC: false,
        }
    },
    timezone: '+07:00',
});
exports.default = sequelize;
