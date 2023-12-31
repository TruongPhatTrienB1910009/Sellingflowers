"use strict";
module.exports = (sequelize, Model, DataTypes) => {
    class Role extends Model {
    }
    Role.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        sequelize: sequelize,
        modelName: 'Role',
        timestamps: false
    });
    return Role;
};
