"use strict";
module.exports = (sequelize, Model, DataTypes) => {
    class Supplier extends Model {
    }
    Supplier.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.STRING
        }
    }, {
        sequelize: sequelize,
        modelName: 'Supplier',
        timestamps: false
    });
    return Supplier;
};
