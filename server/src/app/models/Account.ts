module.exports = (sequelize: any, DataTypes: any, Model: any) => {
    class Account extends Model {}

    Account.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^(?:\+84|0)(?:\d{9}|[1-9][0-9]{8})$/
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                min: 8
            }
        },
        GroupAccountId: {
            type: DataTypes.STRING,
            defaultValue: '2'
        }
    }, {
        sequelize,
        modelName: 'Account',
    });
    return Account;
}