module.exports = (sequelize: any, Model: any, DataTypes: any) => {
    class Group_account extends Model{ 
        public id?: number | undefined;
        public name?: string;
        public description?: string;
    }
    
    Group_account.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'Group_account',
        timestamps: false
    });
    
    return Group_account;
}