module.exports = (sequelize: any, Model: any, DataTypes: any) => {
    class Categories extends Model {
        public id?: number;
        public name?: string;
    }

    Categories.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
        }
    }, {
        sequelize: sequelize,
        modelName: 'Categories',
        timestamps: false
    })

    return Categories;
}