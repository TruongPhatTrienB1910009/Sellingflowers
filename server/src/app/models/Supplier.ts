module.exports = (sequelize: any, Model: any, DataTypes: any) => {
    class Supplier extends Model {
        public id?: number;
        public name?: string;
        public email?: string;
        public address?: string;
        public phone?: string;
    }

    Supplier.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.STRING
        }
    }, {
        sequelize: sequelize,
        modelName: 'Supplier',
        timestamps: false
    })

    return Supplier;
}