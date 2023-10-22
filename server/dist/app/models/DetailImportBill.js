"use strict";
module.exports = (sequelize, Model, DataTypes) => {
    class DetailImportBill extends Model {
    }
    DetailImportBill.init({
        ImportBillId: {
            type: DataTypes.BIGINT,
            references: {
                model: 'ImportBill',
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
        total: {
            type: DataTypes.BIGINT,
        },
        priceItem: {
            type: DataTypes.BIGINT,
        },
        totalPrice: {
            type: DataTypes.BIGINT,
        }
    }, {
        sequelize: sequelize,
        modelName: 'DetailImportBill',
        timestamps: false
    });
    return DetailImportBill;
};
