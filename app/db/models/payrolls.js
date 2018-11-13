
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Payrolls = sequelize.define('payroll', {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    date: {
      type: Sequelize.DataTypes.DATEONLY,
      allowNull: false
    },
    movement_id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true
    },
    amount: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: Sequelize.DataTypes.STRING(64),
      allowNull: false
    }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'payrolls'
  });

  Payrolls.associate = (models) => {
    Payrolls.belongsTo(models.Movements, {
      foreignKey: 'movement_id',
      constraints: false
    });
  };

  return Payrolls;
};
