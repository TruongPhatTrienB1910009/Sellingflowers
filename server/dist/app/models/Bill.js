"use strict";
module.exports = (sequelize, Model, DataTypes) => {
    class Bill extends Model {
    }
    Bill.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        note: {
            type: DataTypes.STRING,
        },
        totalprice: {
            type: DataTypes.BIGINT,
        },
        state: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        BillStatusId: {
            type: DataTypes.BIGINT,
            defaultValue: 1
        },
        CheckoutId: {
            type: DataTypes.BIGINT,
            defaultValue: 1
        }
    }, {
        sequelize: sequelize,
        modelName: 'Bill',
    });
    return Bill;
};
