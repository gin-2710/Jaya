const fs = require('fs/promises');
const faker = require('faker');

function generateRandomTimestamp() {
    const startDate = new Date('2023-05-01T00:00:00Z').getTime();
    const endDate = new Date('2023-05-31T23:59:59Z').getTime();
    const randomTimestamp = new Date(
        startDate + Math.random() * (endDate - startDate)
    );
    return randomTimestamp.toISOString();
}

function generateRandomVehicleId() {
    return faker.random.number({ min: 1000, max: 9999 });
  }

  function generateRandomData() {
    return {
      timestamp: generateRandomTimestamp(),
      is_overspeeding: faker.random.boolean(),
      vehicle_id: generateRandomVehicleId(),
      location_type: faker.random.arrayElement(['highway', 'city_center', 'commercial', 'residential']),
    };
  }

const create_driving_event = (count) => {
    const data = {};
    const timestamp = new Date('2023-05-24T05:55:00Z');
    for(let i=0; i<count; i++){
        data= data+generateRandomData();
    }
    console.log(data);
}

module.exports = create_driving_event