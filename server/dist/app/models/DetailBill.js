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
        totalPriceItem: {
            type: DataTypes.BIGINT,
        },
        priceItem: {
            type: DataTypes.BIGINT,
        }
    }, {
        sequelize: sequelize,
        modelName: 'DetailBill',
    });
    return DetailBill;
};
