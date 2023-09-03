"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const { Sequelize } = require('sequelize');
const sequelize_2 = __importDefault(require("../config/sequelize"));
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize_2.default;
db.Account = require('../models/Account')(db.sequelize, sequelize_1.Model, sequelize_1.DataTypes);
db.Group_account = require('../models/Group_Account')(db.sequelize, sequelize_1.Model, sequelize_1.DataTypes);
db.Role = require('../models/Roles')(db.sequelize, sequelize_1.Model, sequelize_1.DataTypes);
db.Group_role = require('../models/Group_role')(db.sequelize, sequelize_1.Model, sequelize_1.DataTypes);
// >>>>> config associations
db.Group_account.hasMany(db.Account);
db.Account.belongsTo(db.Group_account, {
    foreignKey: {
        name: 'GroupAccountId'
    }
});
db.Group_account.belongsToMany(db.Role, { through: 'Group_roles', foreignKey: 'RoleId' });
db.Role.belongsToMany(db.Group_account, { through: 'Group_roles', foreignKey: 'GroupAccountId' });
module.exports = db;
