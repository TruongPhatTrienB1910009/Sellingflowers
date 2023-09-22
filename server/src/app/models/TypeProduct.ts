module.exports = (sequelize: any, Model: any, DataTypes: any) => {
    class TypeProduct extends Model {
        public id?: number;
        public name?: string;
    }

    TypeProduct.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
        }
    }, {
        sequelize: sequelize,
        modelName: 'TypeProduct',
    })

    return TypeProduct;
}