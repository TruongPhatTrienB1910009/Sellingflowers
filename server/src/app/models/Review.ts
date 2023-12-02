module.exports = (sequelize: any, Model: any, DataTypes: any) => {
    class Review extends Model {
        public id?: number;
        public star?: number;
        public comment?: string;
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
    })

    return Review;
}