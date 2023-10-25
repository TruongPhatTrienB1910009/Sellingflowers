module.exports = (sequelize: any, Model: any, DataTypes: any) => {
    class DetailImportBill extends Model {
        public ImportBillId?: number;
        public ProductId?: number;
        public total?: number;
        public priceItem?: number;
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
        totalItems: {
            type: DataTypes.BIGINT,
        },
        priceItem: {
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