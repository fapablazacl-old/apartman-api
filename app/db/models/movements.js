
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Movements = sequelize.define('movement', {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    date: {
      type: Sequelize.DataTypes.DATE,
      allowNull: false
    },
    amount: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false
    },
    documentNumber: {
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
    tableName: 'movements',
    schema: 'public'
  });

  return Movements;
};
