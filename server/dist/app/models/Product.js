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
            type: DataTypes.TEXT,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        price: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        width: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        height: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        inventory: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        characteristic: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        takecare: {
            type: DataTypes.TEXT
        },
        use: {
            type: DataTypes.TEXT
        },
        img: {
            type: DataTypes.TEXT
        }
    }, {
        sequelize: sequelize,
        modelName: 'Product'
    });
    return Product;
};
