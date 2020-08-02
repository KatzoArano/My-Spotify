'use strict'

// upload && save image
const fs = require('fs');
const path = require('path');

const Artist = require('../models/artist');
const Album = require('../models/album');
const Song = require('../models/song');

function getArtist(req,res){
    res.status(200).send({message: "Controllador artist Ok"})
}


module.exports = {getArtist}