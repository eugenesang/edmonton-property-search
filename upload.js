const Property = require('./properties-model.js');
const fs = require('fs');
const JSONStream = require('JSONStream');

async function uploadProperties() {
    const fileStream = fs.createReadStream('properties.json', { encoding: 'utf-8' });
    const jsonStream = JSONStream.parse('*');

    fileStream.pipe(jsonStream);

    let batch = [];
    jsonStream.on('data', (property) => {
        batch.push(property);
        if (batch.length >= 100) {
            processBatch(batch);
            batch = [];
        }
    });

    jsonStream.on('end', () => {
        if (batch.length > 0) {
            processBatch(batch);
        }
    });

    return new Promise((resolve, reject) => {
        jsonStream.on('end', resolve);
        jsonStream.on('error', reject);
    });
}

async function processBatch(batch) {
    try {
        await Property.insertMany(batch);
        console.log(`${batch.length} properties uploaded successfully.`);
    } catch (error) {
        console.error('Error uploading batch:', error.message);
    }
}


module.exports = uploadProperties;