module.exports = (sequelize: any, Model: any, DataTypes: any) => {

    class Group_role extends Model {
        public GroupAccountId?: number | undefined;
        public RoleId?: number | undefined;
    }

    Group_role.init({
        GroupAccountId: {
            type: DataTypes.BIGINT,
            references: {
                model: 'Group_account',
                key: 'id'
            }
        },
        RoleId: {
            type: DataTypes.BIGINT,
            references: {
                model: 'Role',
                key: 'id'
            }
        }
    }, {
        sequelize: sequelize,
        modelName: 'Group_roles',
        timestamps: false
    });

    return Group_role;

}