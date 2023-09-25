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
db.TypeProduct = require('../models/TypeProduct')(db.sequelize, sequelize_1.Model, sequelize_1.DataTypes);
db.Root = require('../models/Root')(db.sequelize, sequelize_1.Model, sequelize_1.DataTypes);
db.Categories = require('../models/Categories')(db.sequelize, sequelize_1.Model, sequelize_1.DataTypes);
db.Bill = require('../models/Bill')(db.sequelize, sequelize_1.Model, sequelize_1.DataTypes);
db.Product = require('../models/Product')(db.sequelize, sequelize_1.Model, sequelize_1.DataTypes);
db.DetailBill = require('../models/DetailBill')(db.sequelize, sequelize_1.Model, sequelize_1.DataTypes);
db.Checkout = require('../models/Checkout')(db.sequelize, sequelize_1.Model, sequelize_1.DataTypes);
// >>>>> config associations
// Group_account - Account
db.Group_account.hasMany(db.Account, { onDelete: 'cascade' });
db.Account.belongsTo(db.Group_account, {
    foreignKey: {
        name: 'GroupAccountId'
    }
});
// Group_account - Role
db.Group_account.belongsToMany(db.Role, { through: 'Group_roles', foreignKey: 'RoleId' });
db.Role.belongsToMany(db.Group_account, { through: 'Group_roles', foreignKey: 'GroupAccountId' });
// TypeProduct - Categories
db.Categories.hasMany(db.TypeProduct, { foreignKey: 'CategoryId', onDelete: 'cascade' });
db.TypeProduct.belongsTo(db.Categories);
// Product - Categories
db.Categories.hasMany(db.Product, { foreignKey: 'CategoryId', onDelete: 'cascade' });
db.Product.belongsTo(db.Categories);
// Bill - Account
db.Account.hasMany(db.Bill, { foreignKey: "AccountId", onDelete: 'cascade' });
db.Bill.belongsTo(db.Account);
// Product - DetailBill - Bill
db.Bill.belongsToMany(db.Product, { through: db.DetailBill, foreignKey: 'BillId' });
db.Product.belongsToMany(db.Bill, { through: db.DetailBill, foreignKey: 'ProductId' });
// Root - Product
db.Root.hasMany(db.Product, { foreignKey: 'RootId', onDelete: 'cascade' });
db.Product.belongsTo(db.Root);
// Checkout - Bill
db.Checkout.hasMany(db.Bill, { foreignKey: 'CheckoutId', onDelete: 'cascade' });
db.Bill.belongsTo(db.Checkout, { defaultValue: 1 });
module.exports = db;
