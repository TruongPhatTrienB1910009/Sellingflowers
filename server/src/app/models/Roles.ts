module.exports = (sequelize: any, DataTypes: any, Model: any, db: any) => {
    class Role extends Model {}

    Role.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'Role',
    });
    return Role;
}