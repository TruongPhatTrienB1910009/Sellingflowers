"use strict";
module.exports = (sequelize, Model, DataTypes) => {
    class Review extends Model {
    }
    Review.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        star: {
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
