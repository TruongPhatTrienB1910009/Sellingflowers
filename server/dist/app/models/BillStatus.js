"use strict";
module.exports = (sequelize, Model, DataTypes) => {
    class BillStatus extends Model {
    }
    BillStatus.init({
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
        modelName: 'BillStatus',
        timestamps: false
    });
    return BillStatus;
};
