module.exports = (sequelize: any, Model: any, DataTypes: any) => {
    class DetailImportBill extends Model {
        public ImportBillId?: number;
        public ProductId?: number;
        public total?: number;
        public price?: number;
        public totalPrice?: number;
    }

    DetailImportBill.init({
        ImportBillId: {
            type: DataTypes.BIGINT,
            references: {
                model: 'ImportBill',
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
        total: {
            type: DataTypes.BIGINT,
        },
        price: {
            type: DataTypes.BIGINT,
        },
        totalPrice: {
            type: DataTypes.BIGINT,
        }
    }, {
        sequelize: sequelize,
        modelName: 'DetailImportBill',
        timestamps: false
    })

    return DetailImportBill;
}