
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Banks = sequelize.define('bank', {
    code: {
      type: VARCHAR(4),
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: Sequelize.VARCHAR(64),
      allowNull: false
    }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'banks'
  });

  return Banks;
};
