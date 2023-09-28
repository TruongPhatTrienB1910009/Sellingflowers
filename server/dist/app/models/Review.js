"use strict";
module.exports = (sequelize, Model, DataTypes) => {
    class Review extends Model {
    }
    Review.init({
        AccountId: {
            type: DataTypes.BIGINT,
            references: {
                model: 'Account',
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
        start: {
            type: DataTypes.BIGINT,
        },
        comment: {
            type: DataTypes.STRING,
        }
    }, {
        sequelize: sequelize,
        modelName: 'Review',
    });
    return Review;
};
