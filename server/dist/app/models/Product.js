"use strict";
module.exports = (sequelize, Model, DataTypes) => {
    class Product extends Model {
    }
    Product.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            unique: 'id'
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        size: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        inventory: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        characteristic: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        takecare: {
            type: DataTypes.STRING
        },
        use: {
            type: DataTypes.STRING
        },
        img: {
            type: DataTypes.STRING
        }
    }, {
        sequelize: sequelize,
        modelName: 'Product'
    });
    return Product;
};
