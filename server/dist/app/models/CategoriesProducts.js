"use strict";
module.exports = (sequelize, Model, DataTypes) => {
    class CategpriesProducts extends Model {
    }
    CategpriesProducts.init({
        CategoriesId: {
            type: DataTypes.BIGINT,
            references: {
                model: 'Categories',
                key: 'id'
            }
        },
        ProductId: {
            type: DataTypes.BIGINT,
            references: {
                model: 'Product',
                key: 'id'
            }
        }
    }, {
        sequelize: sequelize,
        modelName: 'CategpriesProducts',
        timestamps: false
    });
    return CategpriesProducts;
};
