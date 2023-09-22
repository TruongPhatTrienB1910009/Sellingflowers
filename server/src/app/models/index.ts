import { Model, DataTypes, Optional } from 'sequelize';
const { Sequelize } = require('sequelize');
import sequelize from "../config/sequelize";
const db : any = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Account = require('../models/Account')(db.sequelize, Model, DataTypes);
db.Group_account =  require('../models/Group_Account')(db.sequelize, Model, DataTypes);
db.Role = require('../models/Roles')(db.sequelize, Model, DataTypes);
db.Group_role = require('../models/Group_role')(db.sequelize, Model, DataTypes);
db.TypeProduct = require('../models/TypeProduct')(db.sequelize, Model, DataTypes);
db.Root = require('../models/Root')(db.sequelize, Model, DataTypes);
db.Categories = require('../models/Categories')(db.sequelize, Model, DataTypes);
db.Bill = require('../models/Bill')(db.sequelize, Model, DataTypes);
db.Product = require('../models/Product')(db.sequelize, Model, DataTypes);
db.DetailBill = require('../models/DetailBill')(db.sequelize, Model, DataTypes);

// >>>>> config associations

// Group_account - Account
db.Group_account.hasMany(db.Account)
db.Account.belongsTo(db.Group_account, {
    foreignKey: {
        name: 'GroupAccountId'
    }
})

// Group_account - Role
db.Group_account.belongsToMany(db.Role, { through: 'Group_roles', foreignKey: 'RoleId' })
db.Role.belongsToMany(db.Group_account, { through: 'Group_roles', foreignKey: 'GroupAccountId' })

// TypeProduct - Categories
db.Categories.hasMany(db.TypeProduct, { foreignKey: 'CategoriesId' })
db.TypeProduct.belongsTo(db.Categories)

// Product - Categories
db.Categories.hasMany(db.Product, { foreignKey: 'ProductId' })
db.Product.belongsTo(db.Categories)

// Bill - Account
db.Account.hasMany(db.Bill, { foreignKey: "AccountId" })
db.Bill.belongsTo(db.Account)

// Product - DetailBill - Bill
db.Bill.belongsToMany(db.Product, {through: db.DetailBill, foreignKey: 'ProductId' })
db.Product.belongsToMany(db.Bill, {through: db.DetailBill, foreignKey: 'BillId' })

// Root - Product
db.Root.hasMany(db.Product, { foreignKey: 'ProductId' })
db.Product.belongsTo(db.Root)

module.exports = db;