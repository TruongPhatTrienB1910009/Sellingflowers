"use strict";
module.exports = (sequelize, Model, DataTypes) => {
    class Group_role extends Model {
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
            },
        }
    }, {
        sequelize: sequelize,
        modelName: 'Group_roles',
        timestamps: false
    });
    return Group_role;
};
