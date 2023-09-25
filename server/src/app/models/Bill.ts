module.exports = (sequelize: any, Model: any, DataTypes: any) => {
    class Bill extends Model {
        public id?: number;
        public note?: string;
        public totalprice?: number;
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
        }
    }, {
        sequelize: sequelize,
        modelName: 'Bill',
    })

    return Bill;
}