import { Model, DataTypes, Optional } from 'sequelize';
const { Sequelize } = require('sequelize');
import sequelize from "../config/sequelize";
const db: any = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Account = require('../models/Account')(db.sequelize, Model, DataTypes);
db.Group_account = require('../models/Group_Account')(db.sequelize, Model, DataTypes);
db.Role = require('../models/Roles')(db.sequelize, Model, DataTypes);
db.Group_role = require('../models/Group_role')(db.sequelize, Model, DataTypes);
db.TypeProduct = require('../models/TypeProduct')(db.sequelize, Model, DataTypes);
db.Root = require('../models/Root')(db.sequelize, Model, DataTypes);
db.Categories = require('../models/Categories')(db.sequelize, Model, DataTypes);
db.Bill = require('../models/Bill')(db.sequelize, Model, DataTypes);
db.Product = require('../models/Product')(db.sequelize, Model, DataTypes);
db.DetailBill = require('../models/DetailBill')(db.sequelize, Model, DataTypes);
db.Checkout = require('../models/Checkout')(db.sequelize, Model, DataTypes);

// >>>>> config associations

// Group_account - Account

db.Group_account.hasMany(db.Account, { onDelete: 'cascade' })
db.Account.belongsTo(db.Group_account, {
    foreignKey: {
        name: 'GroupAccountId'
    }
})


// Group_account - Role
db.Group_account.belongsToMany(db.Role, { through: 'Group_roles', foreignKey: 'RoleId' })
db.Role.belongsToMany(db.Group_account, { through: 'Group_roles', foreignKey: 'GroupAccountId' })

// TypeProduct - Categories
db.Categories.hasMany(db.TypeProduct, { foreignKey: 'CategoryId', onDelete: 'cascade' })
db.TypeProduct.belongsTo(db.Categories)

// Product - Categories
db.Categories.hasMany(db.Product, { foreignKey: 'CategoryId', onDelete: 'cascade' })
db.Product.belongsTo(db.Categories)

// Bill - Account
db.Account.hasMany(db.Bill, { foreignKey: "AccountId", onDelete: 'cascade' })
db.Bill.belongsTo(db.Account)

// Product - DetailBill - Bill
db.Bill.belongsToMany(db.Product, { through: db.DetailBill, foreignKey: 'BillId' })
db.Product.belongsToMany(db.Bill, { through: db.DetailBill, foreignKey: 'ProductId' })

// Root - Product
db.Root.hasMany(db.Product, { foreignKey: 'RootId', onDelete: 'cascade' })
db.Product.belongsTo(db.Root)

// Checkout - Bill
db.Checkout.hasMany(db.Bill, { foreignKey: 'CheckoutId', onDelete: 'cascade' })
db.Bill.belongsTo(db.Checkout, { defaultValue: 1})

module.exports = db;
