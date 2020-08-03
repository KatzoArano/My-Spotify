'use strict'

// upload && save image
const fs = require('fs');
const path = require('path');
const mongoosePaginate = require('mongoose-pagination')

const Artist = require('../models/artist');
const Album = require('../models/album');
const Song = require('../models/song');

function testAlbum(req,res){
    res.status(200).send({message: "Controllador album Ok"})
}

function getAlbum(req,res){

}

module.exports = {
    testAlbum
}
