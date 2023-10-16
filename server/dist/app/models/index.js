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
db.Review = require('../models/Review')(db.sequelize, sequelize_1.Model, sequelize_1.DataTypes);
db.DetailBill = require('../models/DetailBill')(db.sequelize, sequelize_1.Model, sequelize_1.DataTypes);
db.Checkout = require('../models/Checkout')(db.sequelize, sequelize_1.Model, sequelize_1.DataTypes);
db.Supplier = require('../models/Supplier')(db.sequelize, sequelize_1.Model, sequelize_1.DataTypes);
db.ImportBill = require('../models/ImportBill')(db.sequelize, sequelize_1.Model, sequelize_1.DataTypes);
db.DetailImportBill = require('../models/DetailImportBill')(db.sequelize, sequelize_1.Model, sequelize_1.DataTypes);
db.DeliveryAddress = require('../models/DeliveryAddress')(db.sequelize, sequelize_1.Model, sequelize_1.DataTypes);
db.BillStatus = require('../models/BillStatus')(db.sequelize, sequelize_1.Model, sequelize_1.DataTypes);
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
db.Bill.belongsToMany(db.Product, { through: db.DetailBill, foreignKey: 'BillId', targetKey: 'id' });
db.Product.belongsToMany(db.Bill, { through: db.DetailBill, foreignKey: 'ProductId', targetKey: 'id' });
// Root - Product
db.Root.hasMany(db.Product, { foreignKey: 'RootId', onDelete: 'cascade' });
db.Product.belongsTo(db.Root);
// Checkout - Bill
db.Checkout.hasMany(db.Bill, { foreignKey: 'CheckoutId', onDelete: 'cascade' });
db.Bill.belongsTo(db.Checkout);
// Supplier - ImportBill
db.Supplier.hasMany(db.ImportBill, { foreignKey: 'SupplierId', onDelete: 'cascade' });
db.ImportBill.belongsTo(db.Supplier);
// ImportBill - Account
db.Account.hasMany(db.ImportBill, { foreignKey: 'AccountId', onDelete: 'cascade' });
db.ImportBill.belongsTo(db.Account);
// ImportBill - DetailImportBill - Product
db.ImportBill.belongsToMany(db.Product, { through: db.DetailImportBill, foreignKey: 'ImportBillId', targetKey: 'id' });
db.Product.belongsToMany(db.ImportBill, { through: db.DetailImportBill, foreignKey: 'ProductId', targetKey: 'id' });
// Account - Review - Product
db.Account.belongsToMany(db.Product, { through: db.Review, foreignKey: 'AccountId', targetKey: 'id' });
db.Product.belongsToMany(db.Account, { through: db.Review, foreignKey: 'ProductId', targetKey: 'id' });
// DeliveryAddress - Account
db.Account.hasMany(db.DeliveryAddress, { foreignKey: "AccountId", onDelete: 'cascade' });
db.DeliveryAddress.belongsTo(db.Account);
// DeliveryAddress - Bill
db.DeliveryAddress.hasMany(db.Bill);
db.Bill.belongsTo(db.DeliveryAddress);
// Bill - BillStatus
db.BillStatus.hasMany(db.Bill, { foreignKey: 'BillStatusId', onDelete: 'cascade' });
db.Bill.belongsTo(db.BillStatus);
module.exports = db;
