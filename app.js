const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const user_routes = require('./routes/user');
const artist_routes = require('./routes/artist');
const album_routes = require('./routes/album');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Routes
app.use('/api', user_routes);
app.use('/api', artist_routes);
app.use('/api', album_routes);



// Configure HTTP Headers
// CORS
app.use((req, res, next)=>{
    // Allow access to all domains
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});

module.exports = app;