const { DataTypes } = require('sequelize');
// const sequelize = require('../sequelize-config');
module.exports = (sequelize) => {
const Alert = sequelize.define('Alert', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    vehicle_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Alert;

}
  
//   module.exports = Alert;