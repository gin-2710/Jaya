const express = require('express');
const app = express();
const db = require('./models')
const { Driving, Alert, Threshold } = require('./models');
const Sequelize = require('sequelize');
const { Op } = Sequelize;

const PORT = 5000;

db.sequelize.sync().then((req, res) => {
    app.listen(PORT, () => {
        try {
            console.log("Server started at Port", PORT);
        }
        catch (err) {
            console.log("Error starting server due to", err);
        }
    });
});


app.post('/event', (req, res) => {

    const drivingData = [
        {
            "timestamp": "2023-05-24T05:55:00+00:00",
            "is_overspeeding": true,
            "vehicle_id": 1234,
            "location_type": "highway"
        },
        {
            "timestamp": "2023-05-24T05:56:00+00:00",
            "is_overspeeding": true,
            "vehicle_id": 1234,
            "location_type": "highway"
        },
        {
            "timestamp": "2023-05-24T05:57:00+00:00",
            "is_overspeeding": true,
            "vehicle_id": 1234,
            "location_type": "highway"
        },
        {
            "timestamp": "2023-05-24T05:58:00+00:00",
            "is_overspeeding": true,
            "vehicle_id": 1234,
            "location_type": "highway"
        },
        {
            "timestamp": "2023-05-24T05:59:00+00:00",
            "is_overspeeding": true,
            "vehicle_id": 1234,
            "location_type": "highway"
        }
    ]
    for (i of drivingData) {
        const newDriving = Driving.build({
            timestamp: i.timestamp,
            is_overspeeding: i.is_overspeeding,
            vehicle_id: i.vehicle_id,
            location_type: i.location_type
        });
        newDriving.save()
            .then((savedDriving) => {
                console.log('New Driving data added:', savedDriving.toJSON());
                res.send(savedDriving)
            })
            .catch((error) => {
                console.error('Error adding Driving data:', error);
            });
    };

})

app.get('/alert/:alert_id', (req, res) => {
    const alertId = req.params.alert_id;
    createAlerts();
    res.status(200).send(alertId);
})

const createAlerts = async () => {
    try {
        const overspeeding = await Driving.findAll({
            attributes: [
                'location_type',
                [Sequelize.fn('COUNT', Sequelize.col('vehicle_id')), 'vehicle_id_count'],
                [Sequelize.col('vehicle_id'), 'vehicle_id'],
            ],
            where: {
                is_overspeeding: true,
            },
            group: ['location_type', 'vehicle_id'],
        });
        const location = overspeeding[0];
        console.log(location);
        const thresholdValue = await Threshold.findOne({
            where: {
                location_type: location,
            },
        })
        console.log(thresholdValue)
        let overspeeding_vehicles = overspeeding[0].dataValues;
        overspeeding_vehicles = await JSON.stringify(overspeeding_vehicles);
        overspeeding_vehicles = await JSON.parse(overspeeding_vehicles);
        overspeeding_vehicles = overspeeding_vehicles.vehicle_id;
        for (i of overspeeding_vehicles) {
            const newAlert = Alert.build({
                vehicle_id: i.vehicle_id,
            });
            newAlert.save()
                .then((savedAlert) => {
                    console.log('New Alert created', savedAlert.toJSON());
                })
                .catch((error) => {
                    console.error('Error creating alert', error);
                });
        }
        res.send(alertId);
    }
    catch (error) {
        console.error(error);
    }


}


const addLocation = async () => {
    const location = ["highway", "city_center", "commercial", "residential"];
    const threshold = [4, 3, 2, 1];
    for (let i = 0; i < 4; i++) {
        const newThreshold = Threshold.build({
            location_type: location[i],
            alert_limit: threshold[i]
        });

        newThreshold.save()
            .then((savedThreshold) => {
                console.log('New Threshold limit created:', savedThreshold.toJSON());
            })
            .catch((error) => {
                console.error('Error creating Threshold limit:', error);
            });
    }

}

