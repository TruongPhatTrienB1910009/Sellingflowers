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
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            defaultValue: "no name"
        },
        phone: {
            type: DataTypes.STRING,
            defaultValue: ''
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
            type: DataTypes.STRING
        },
        gender: {
            type: DataTypes.BIGINT
        },
        resetpassword: {
            type: DataTypes.STRING
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