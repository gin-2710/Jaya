const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Driving = sequelize.define('Driving', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        timestamp: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_overspeeding: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        vehicle_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        location_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Driving;
};

