
const Sequelize = require('sequelize');

/*
const sequelize = new Sequelize (
  'd8g9hahqsm6sht', 'mxiuygymilkeom', '936db37e6c9b66a75843c17fc7630149a1177910ab26ff3e586a3bdc30d53f19', {
    host: 'ec2-54-225-115-234.compute-1.amazonaws.com',
    dialect: 'postgres',
    port: 5432,
  }
);
*/

const sequelize = new Sequelize (
  'apartman',
  'apartman',
  'apartman', {
    host: 'localhost',
    dialect: 'mssql'
  }
);

module.exports = {
  sequelize,
  Movements: require('./movements')(sequelize),
  Payrolls: require('./payrolls')(sequelize),
  PayrollDetails: require('./payroll_details')(sequelize)
};
