module.exports = (sequelize: any, Model: any, DataTypes: any) => {

    class Discount extends Model {
        public id?: number;
        public code?: string;
        public description?: string;
        public start?: Date;
        public end?: Date;
        public total?: number;
        public amount?: number;
        public applied?: number;
    }

    Discount.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        start: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        end: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        total: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        amount: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        applied: {
            type: DataTypes.BIGINT,
        }
    }, {
        sequelize: sequelize,
        modelName: 'Discount',
        // timestamps: false
    });

    return Discount;
}