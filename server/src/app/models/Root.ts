module.exports = (sequelize: any, Model: any, DataTypes: any) => {
    class Root extends Model {
        public id?: number;
        public country?: string;
        public area?: string;
    }

    Root.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        country: {
            type: DataTypes.string,
        },
        area: {
            type: DataTypes.string,
        }
    }, {
        sequelize: sequelize,
        modelName: 'Root',
    })

    return Root;
}