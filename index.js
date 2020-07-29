'use strict'

const mongoose = require('mongoose');
const { MongoClient } = require("mongodb");
const app = require('./app');
const port = process.env.port || 3977

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27011/spotify", { useNewUrlParser: true,useUnifiedTopology: true }, (err, res )=> {
    if(err){
        throw err
    }else {
        app.listen(port, () => {
            console.log('Serveur OK')
        })
    }

})
