const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Routes
app.get('/test', (req, res) => {
    res.status(200).send({message: "OK route test"});
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Cors

module.exports = app;