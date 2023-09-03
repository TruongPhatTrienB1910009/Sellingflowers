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

// >>>>> config associations

db.Group_account.hasMany(db.Account)
db.Account.belongsTo(db.Group_account, {
    foreignKey: {
        name: 'GroupAccountId'
    }
})

db.Group_account.belongsToMany(db.Role, { through: 'Group_roles', foreignKey: 'RoleId' })
db.Role.belongsToMany(db.Group_account, { through: 'Group_roles', foreignKey: 'GroupAccountId' })

module.exports = db;
