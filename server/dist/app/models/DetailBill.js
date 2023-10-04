"use strict";
module.exports = (sequelize, Model, DataTypes) => {
    class DetailBill extends Model {
    }
    DetailBill.init({
        BillId: {
            type: DataTypes.BIGINT,
            references: {
                model: 'Bill',
                key: 'id',
            }
        },
        ProductId: {
            type: DataTypes.BIGINT,
            references: {
                model: 'Product',
                key: 'id',
            }
        },
        totalItems: {
            type: DataTypes.BIGINT,
        },
        notes: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING,
        }
    }, {
        sequelize: sequelize,
        modelName: 'DetailBill',
    });
    return DetailBill;
};
