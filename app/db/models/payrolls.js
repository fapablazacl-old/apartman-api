
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Payrolls = sequelize.define('payroll', {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    bank: {
      type: Sequelize.DataTypes.VARCHAR(8),
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
    tableName: 'payrolls'
  });

  return Payrolls;
};
