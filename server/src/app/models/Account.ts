module.exports = (sequelize: any, Model: any, DataTypes: any) => {
    class Account extends Model {
        public id?: number | undefined;
        public name?: string | undefined;
        public phone?: string | undefined;
        public email?: string | undefined;
        public password?: string | undefined;
        public GroupAccountId?: number | undefined;

        public readonly createAt?: Date | undefined;
        public readonly updateAt?: Date | undefined;
    }

    Account.init({
        id: {
            type: DataTypes.BIGINT,
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
            type: DataTypes.BIGINT,
            defaultValue: 2
        }
    }, {
        sequelize: sequelize,
        modelName: 'Account',
    });


    return Account;
}