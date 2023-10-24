module.exports = (sequelize: any, Model: any, DataTypes: any) => {
    class ImportBill extends Model {
        public id?: number;
        public note?: string;
    }

    ImportBill.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        note: {
            type: DataTypes.TEXT,
        },
        total: {
            type: DataTypes.BIGINT,
        }
    }, {
        sequelize: sequelize,
        modelName: 'ImportBill',
        timestamps: false
    })

    return ImportBill;
}