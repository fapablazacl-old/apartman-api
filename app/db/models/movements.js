
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Movements = sequelize.define('movement', {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    hashId: {
      type: Sequelize.DataTypes.STRING(32),
      allowNull: false,
    },
    bank: {
      type: Sequelize.DataTypes.STRING(8),
      allowNull: false
    },
    date: {
      type: Sequelize.DataTypes.DATEONLY,
      allowNull: false
    },
    amount: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false
    },
    document_number: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true
    },
    description: {
      type: Sequelize.DataTypes.STRING(1024),
      allowNull: false
    }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'movements'
  });

  return Movements;
};
