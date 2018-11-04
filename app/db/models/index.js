
const Sequelize = require('sequelize');

const sequelize = new Sequelize (
  'apartman', 'postgres', 'postgres', {
    // host: '172.18.0.2',
    host: 'localhost',
    dialect: 'postgres'
  }
);

module.exports = {
  sequelize,
  Movements: require('./movements')(sequelize)
};
