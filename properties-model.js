const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    accountNumber: {
        type: Number
    },
    value: {
        type: String
    },
    type: {
        type: String
    },
    neighbourhood: {
        type: String
    },
    garage: {
        type: String
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
    address: {
        type: String,
        index: true  // Create an index on the 'address' field
    }
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
