const Property = require('./properties-model.js');
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('properties.json', { encoding: 'utf-8' }));

async function uploadProperties() {
    const promises = data.map(async (property) => {
        try {
            await Property.create(property);
            console.log(`Property with address "${property.address}" uploaded successfully.`);
        } catch (error) {
            console.error(`Error uploading property with address "${property.address}":`, error.message);
        }
    });

    await Promise.all(promises);
}

module.exports = uploadProperties;