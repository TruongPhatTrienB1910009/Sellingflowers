module.exports = (sequelize: any, Model: any, DataTypes: any) => {

    class Role extends Model {
        public id?: number;
        public url?: string;
        public description?: string;
    }

    Role.init({
        id: {
            type: DataTypes.BIGINT,
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
        sequelize: sequelize,
        modelName: 'Role',
        timestamps: false
    });

    return Role;
}