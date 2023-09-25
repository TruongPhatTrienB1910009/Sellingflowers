"use strict";
module.exports = (sequelize, Model, DataTypes) => {
    class Bill extends Model {
    }
    Bill.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        note: {
            type: DataTypes.STRING,
        },
        totalprice: {
            type: DataTypes.BIGINT,
        }
    }, {
        sequelize: sequelize,
        modelName: 'Bill',
    });
    return Bill;
};
