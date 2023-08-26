"use strict";
module.exports = (sequelize, DataTypes, Model) => {
    class Group_role extends Model {
    }
    Group_role.init({
        GroupsId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'group_accounts',
                key: 'id'
            }
        },
        RolesId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'roles',
                key: 'id'
            },
        }
    }, {
        sequelize,
        modelName: 'group_roles',
    });
    return Group_role;
};
