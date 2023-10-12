"use strict";
module.exports = (sequelize, Model, DataTypes) => {
    class DeliveryAddress extends Model {
    }
    DeliveryAddress.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        detail: {
            type: DataTypes.STRING
        }
    }, {
        sequelize: sequelize,
        modelName: 'DeliveryAddress',
        timestamps: false
    });
    return DeliveryAddress;
};
