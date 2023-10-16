module.exports = (sequelize: any, Model: any, DataTypes: any) => {
    class BillStatus extends Model {
        public id?: number;
        public note?: string;
        public totalprice?: number;
    }

    BillStatus.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        detail: {
            type: DataTypes.STRING
        }
    }, {
        sequelize: sequelize,
        modelName: 'BillStatus',
        timestamps: false
    })

    return BillStatus;
}