"use strict";
module.exports = (sequelize, Model, DataTypes) => {
    class TypeProduct extends Model {
    }
    TypeProduct.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
        }
    }, {
        sequelize: sequelize,
        modelName: 'TypeProduct',
    });
    return TypeProduct;
};
