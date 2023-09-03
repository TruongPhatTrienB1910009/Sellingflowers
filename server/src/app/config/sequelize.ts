const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sellingflower', 'root', '22042022', {
    host: 'localhost',
    dialect: 'mysql'
});

export default sequelize;