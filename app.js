require('dotenv').config();
const mongoose = require('mongoose');
const Property = require('./properties-model');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors')

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const uri = process.env.uri;
const port = 4880;

app.use(cors({ origin: '*' }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, maxPoolSize: 10 })
    .then((data) => {
        server.listen(port, () => {
            console.log('app listening on port %d', port);
        });
    });

// Endpoint for HTTP-based auto-suggestions
app.get('/autocomplete', async (req, res) => {
    try {
        const { address } = req.query;

        // Use a regular expression to perform a case-insensitive search for addresses starting with the user input
        const suggestions = await Property.distinct('address', {
            address: { $regex: new RegExp(`^${address}`, 'i') },
        }).limit(20);

        res.json(suggestions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Socket.IO connection event
io.on('connection', (socket) => {
    console.log('Client connected');

    // Listen for messages from the client
    socket.on('search', async (data) => {
        try {
            const { address } = data;

            // Perform a case-insensitive search for addresses starting with the user input
            const suggestions = await Property.find({
                address: { $regex: new RegExp(`^${address}`, 'i') },
            }).select('address').limit(10);

            // Extract the addresses from the result
            const addressSuggestions = suggestions.map((property) => property.address);

            // Emit the address suggestions to the client
            socket.emit('suggestions', addressSuggestions);
        } catch (error) {
            console.error(error);
            socket.emit('error', 'Internal Server Error');
        }
    });

    // Disconnect event
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});
