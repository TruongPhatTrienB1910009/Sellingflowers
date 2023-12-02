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
db.TypeCategories = require('../models/TypeCategories')(db.sequelize, Model, DataTypes);
db.Root = require('../models/Root')(db.sequelize, Model, DataTypes);
db.Categories = require('../models/Categories')(db.sequelize, Model, DataTypes);
db.Bill = require('../models/Bill')(db.sequelize, Model, DataTypes);
db.Product = require('../models/Product')(db.sequelize, Model, DataTypes);
db.Review = require('../models/Review')(db.sequelize, Model, DataTypes);
db.DetailBill = require('../models/DetailBill')(db.sequelize, Model, DataTypes);
db.Checkout = require('../models/Checkout')(db.sequelize, Model, DataTypes);
db.Supplier = require('../models/Supplier')(db.sequelize, Model, DataTypes);
db.ImportBill = require('../models/ImportBill')(db.sequelize, Model, DataTypes);
db.DetailImportBill = require('../models/DetailImportBill')(db.sequelize, Model, DataTypes);
db.DeliveryAddress = require('../models/DeliveryAddress')(db.sequelize, Model, DataTypes);
db.BillStatus = require('../models/BillStatus')(db.sequelize, Model, DataTypes);
db.Discount = require('../models/Discount')(db.sequelize, Model, DataTypes);

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
db.TypeCategories.hasMany(db.Categories, { onDelete: 'cascade' })
db.Categories.belongsTo(db.TypeCategories)

// Product - Categories
db.Categories.hasMany(db.Product, { foreignKey: 'CategoryId', onDelete: 'cascade' })
db.Product.belongsTo(db.Categories)

// Bill - Account
db.Account.hasMany(db.Bill, { foreignKey: "AccountId", onDelete: 'cascade' })
db.Bill.belongsTo(db.Account)

// Product - DetailBill - Bill
db.Bill.belongsToMany(db.Product, { through: db.DetailBill, foreignKey: 'BillId', targetKey: 'id' })
db.Product.belongsToMany(db.Bill, { through: db.DetailBill, foreignKey: 'ProductId', targetKey: 'id' })

// Root - Product
db.Root.hasMany(db.Product, { foreignKey: 'RootId', onDelete: 'cascade' })
db.Product.belongsTo(db.Root)

// Checkout - Bill
db.Checkout.hasMany(db.Bill, { foreignKey: 'CheckoutId', onDelete: 'cascade' })
db.Bill.belongsTo(db.Checkout)

// Supplier - ImportBill
db.Supplier.hasMany(db.ImportBill, { foreignKey: 'SupplierId', onDelete: 'cascade' })
db.ImportBill.belongsTo(db.Supplier)

// ImportBill - Account
db.Account.hasMany(db.ImportBill, { foreignKey: 'AccountId', onDelete: 'cascade' })
db.ImportBill.belongsTo(db.Account)

// ImportBill - DetailImportBill - Product
db.ImportBill.belongsToMany(db.Product, { through: db.DetailImportBill, foreignKey: 'ImportBillId', targetKey: 'id' })
db.Product.belongsToMany(db.ImportBill, { through: db.DetailImportBill, foreignKey: 'ProductId', targetKey: 'id' })

// Account - Review - Product
db.Product.hasMany(db.Review)
db.Review.belongsTo(db.Product)

db.Account.hasMany(db.Review)
db.Review.belongsTo(db.Account)

// DeliveryAddress - Account
db.Account.hasMany(db.DeliveryAddress, { foreignKey: "AccountId", onDelete: 'cascade' })
db.DeliveryAddress.belongsTo(db.Account)

// DeliveryAddress - Bill
db.DeliveryAddress.hasMany(db.Bill)
db.Bill.belongsTo(db.DeliveryAddress)

// Bill - BillStatus
db.BillStatus.hasMany(db.Bill, { foreignKey: 'BillStatusId', onDelete: 'cascade' })
db.Bill.belongsTo(db.BillStatus)

// Bill - Discount
db.Discount.hasMany(db.Bill)
db.Bill.belongsTo(db.Discount)

module.exports = db;
