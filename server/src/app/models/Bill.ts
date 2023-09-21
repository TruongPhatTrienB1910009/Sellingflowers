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
            primaryKey: true
        },
        note: {
            type: DataTypes.string,
        },
        totalprice: {
            type: DataTypes.number,
            allowNull: false
        }
    }, {
        sequelize: sequelize,
        modelName: 'Bill',
    })

    return Bill;
}