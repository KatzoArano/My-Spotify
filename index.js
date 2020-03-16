'use strict'

const mongoose = require('mongoose');

mongoose.connect('mogodb://localhost:27017/spotify', (err,res) => {
    if(err){
        throw err
    }else {
        console.log("Database connected");
    }
});