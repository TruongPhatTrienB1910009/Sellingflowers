module.exports = (sequelize: any, Model: any, DataTypes: any) => {
    class DetailBill extends Model {
        public BillId?: number;
        public ProductId?: number;
        public totalItems?: number;
        public notes?: string;
        public address?: string;
    }

    DetailBill.init({
        BillId: {
            type: DataTypes.BIGINT,
            references: {
                model: 'Bill',
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
        totalPriceItem: {
            type: DataTypes.BIGINT,
        },
        priceItem: {
            type: DataTypes.BIGINT,
        }
    }, {
        sequelize: sequelize,
        modelName: 'DetailBill',
    })

    return DetailBill;
}