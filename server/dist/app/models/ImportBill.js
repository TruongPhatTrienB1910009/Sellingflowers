"use strict";
module.exports = (sequelize, Model, DataTypes) => {
    class ImportBill extends Model {
    }
    ImportBill.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        note: {
            type: DataTypes.TEXT,
        },
        total: {
            type: DataTypes.BIGINT,
        }
    }, {
        sequelize: sequelize,
        modelName: 'ImportBill',
        timestamps: false
    });
    return ImportBill;
};
