const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Threshold = sequelize.define('Threshold', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        location_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        alert_limit: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    return Threshold;
};

