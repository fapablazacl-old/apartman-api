
// TODO: Colocar parametros de la base de datos en un archivo de configuracion

const Sequelize = require('sequelize');
const sequelize = new Sequelize (
  'apartman', 'postgres', '', {
    host: 'localhost',
    dialect: 'postgres'
  }
);

const Providers = sequelize.define('provider', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  rut: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  name: {
    type: Sequelize.CHAR(64),
    allowNull: false
  },
  account: {
    type: Sequelize.BIGINT,
    allowNull: true
  },
  bank: {
    type: Sequelize.CHAR(32),
    allowNull: true
  },
  email: {
    type: Sequelize.CHAR(32),
    allowNull: true
  },
  phone: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
}, {
  timestamps: false,
  freezeTableName: true,
  tableName: 'providers',
  schema: 'public'
});

module.exports = {
  Providers
};
