"use strict";
module.exports = (sequelize, Model, DataTypes) => {
    class Categories extends Model {
    }
    Categories.init({
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
        modelName: 'Categories',
    });
    return Categories;
};
