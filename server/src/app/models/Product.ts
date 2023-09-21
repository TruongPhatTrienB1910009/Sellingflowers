module.exports = (sequelize: any, Model: any, DataTypes: any) => {

    class Product extends Model {
        public id?: number;
        public url?: string;
        public description?: string;
        public price?: number;
        public size?: number;
        public inventory?: number;
        public Characteristic?: string;
        public fengshui?: string;
        public takecare?: string;
        public use?: string;
        public img?: string;
    }

    Product.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.number,
            allowNull: false,
        },
        size: {
            type: DataTypes.number,
            allowNull: false,
        },
        inventory: {
            type: DataTypes.number,
            allowNull: false,
        },
        Characteristic: {
            type: DataTypes.string,
            allowNull: false,
        },
        fengshui: {
            type: DataTypes.string,
            allowNull: false,
        },
        takecare: {
            type: DataTypes.string
        },
        use: {
            type: DataTypes.string
        },
        img: {
            type: DataTypes.string
        }
    }, {
        sequelize: sequelize,
        modelName: 'Product',
        timestamps: false
    });

    return Product;
}