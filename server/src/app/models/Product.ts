module.exports = (sequelize: any, Model: any, DataTypes: any) => {

    class Product extends Model {
        public id?: number;
        public name?: string;
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
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        size: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        inventory: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        Characteristic: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fengshui: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        takecare: {
            type: DataTypes.STRING
        },
        use: {
            type: DataTypes.STRING
        },
        img: {
            type: DataTypes.STRING
        }
    }, {
        sequelize: sequelize,
        modelName: 'Product',
        timestamps: false
    });

    return Product;
}