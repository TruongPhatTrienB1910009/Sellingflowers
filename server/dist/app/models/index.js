"use strict";
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('sellingflower', 'root', '22042022', {
    host: 'localhost',
    dialect: 'mysql'
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Account = require('./Account')(db.sequelize, DataTypes, Model);
db.Group_account = require('./Group')(db.sequelize, DataTypes, Model, db);
db.Roles = require('./Roles')(db.sequelize, DataTypes, Model, db);
db.Group_role = require('./Group_role')(db.sequelize, DataTypes, Model);
// >>>>> config associations
// db.Group.belongsToMany(db.Roles, { through: 'group_roles'})
// db.Roles.belongsToMany(db.Group, { through: 'group_roles'})
db.Group_account.hasOne(db.Account);
db.Account.belongsTo(db.Group_account, { foreignKey: { name: 'GroupAccountId' } });
db.sequelize.sync({ alter: true });
module.exports = db;
