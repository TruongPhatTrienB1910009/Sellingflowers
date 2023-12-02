const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sellingflower', 'root', '22042022', {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
        options: {
            // Your tedious options here
            useUTC: false,
        }
    },
    timezone: '+07:00',
});

export default sequelize;