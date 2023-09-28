module.exports = (sequelize: any, Model: any, DataTypes: any) => {
    class Review extends Model {
        public AccountId?: number;
        public ProductId?: number;
        public star?: number;
        public comment?: string;
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
    })

    return Review;
}