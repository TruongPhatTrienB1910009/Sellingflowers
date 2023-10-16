module.exports = (sequelize: any, Model: any, DataTypes: any) => {
    class DeliveryAddress extends Model {
        public id?: number;
        public name?: string;
    }

    DeliveryAddress.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        detail: {
            type: DataTypes.STRING
        },
        city: {
            type: DataTypes.STRING
        }, 
        district: {
            type: DataTypes.STRING
        }, 
        ward: {
            type: DataTypes.STRING
        },
        name: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING
        }
    }, {
        sequelize: sequelize,
        modelName: 'DeliveryAddress',
        timestamps: false
    })

    return DeliveryAddress;
}