module.exports = (sequelize: any, Model: any, DataTypes: any) => {
    class Checkout extends Model {
        public id?: number;
        public name?: string;
    }

    Checkout.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING
        }
    }, {
        sequelize: sequelize,
        modelName: 'Checkout',
        timestamps: false
    })

    return Checkout;
}