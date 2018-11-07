
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Providers = sequelize.define('provider', {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    rut: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: Sequelize.DataTypes.STRING(64),
      allowNull: false
    },
    account: {
      type: Sequelize.DataTypes.BIGINT,
      allowNull: true
    },
    bank: {
      type: Sequelize.DataTypes.STRING(32),
      allowNull: true
    },
    email: {
      type: Sequelize.DataTypes.STRING(32),
      allowNull: true
    },
    phone: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'providers'
  });

  return Providers;
};
