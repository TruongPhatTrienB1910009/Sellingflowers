"use strict";
module.exports = (sequelize, Model, DataTypes) => {
    class Group_account extends Model {
    }
    Group_account.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'Group_account',
        timestamps: false
    });
    return Group_account;
};
