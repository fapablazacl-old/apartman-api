
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Movements = sequelize.define('movement', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    amount: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    documentNumber: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    description: {
      type: Sequelize.VARCHAR(1024),
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
