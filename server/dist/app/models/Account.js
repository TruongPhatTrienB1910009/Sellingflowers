"use strict";
module.exports = (sequelize, Model, DataTypes) => {
    class Account extends Model {
    }
    Account.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            defaultValue: "no name"
        },
        phone: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING
        },
        gender: {
            type: DataTypes.BIGINT
        },
        resetpassword: {
            type: DataTypes.STRING
        },
        GroupAccountId: {
            type: DataTypes.BIGINT,
            defaultValue: 2
        }
    }, {
        sequelize: sequelize,
        modelName: 'Account',
    });
    return Account;
};
