"use strict";
module.exports = (sequelize, Model, DataTypes) => {
    class TypeCategories extends Model {
    }
    TypeCategories.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        }
    }, {
        sequelize: sequelize,
        modelName: 'TypeCategories',
    });
    return TypeCategories;
};
