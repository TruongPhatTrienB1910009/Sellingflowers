"use strict";
module.exports = (sequelize, Model, DataTypes) => {
    class Root extends Model {
    }
    Root.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        country: {
            type: DataTypes.STRING,
        },
        area: {
            type: DataTypes.STRING,
        }
    }, {
        sequelize: sequelize,
        modelName: 'Root',
        timestamps: false
    });
    return Root;
};
