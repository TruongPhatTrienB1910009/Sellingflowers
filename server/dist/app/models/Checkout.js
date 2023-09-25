"use strict";
module.exports = (sequelize, Model, DataTypes) => {
    class Checkout extends Model {
    }
    Checkout.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING
        }
    }, {
        sequelize: sequelize,
        modelName: 'Checkout',
        timestamps: false
    });
    return Checkout;
};
