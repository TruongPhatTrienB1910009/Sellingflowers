module.exports = (sequelize: any, Model: any, DataTypes: any) => {
    class TypeCategories extends Model {
        public id?: number;
        public name?: string;
    }

    TypeCategories.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        }
    }, {
        sequelize: sequelize,
        modelName: 'TypeCategories',
    })

    return TypeCategories;
}