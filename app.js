require('dotenv').config();
const mongoose = require('mongoose');

const express = require('express');
const uploadProperties = require('./upload');

const app = express();


const uri = process.env.uri;
const port = 4880;

app.use(express.json());

mongoose.connect(uri,{useNewUrlParser:true, useUnifiedTopology:true, maxPoolSize: 10})
.then(data=>{
    app.listen(port, ()=>{console.log("app listening on port %d", port)});
    // uploadProperties();
});

