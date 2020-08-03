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

function saveAlbum(req, res){
    var album = new Album();
    var params = req.body;
    album.title = params.title;
    album.description = params.description;
    album.year = params.year;
    album.image = 'null';
    album.artist = params.artist;

    album.save((err, albumStored) => {
        if(err){
            res.status(500).send({message: 'Server error'});
        }else{
            if(!albumStored){
                res.status(404).send({message: 'Album cannot be stored'});
            }else{
                res.status(200).send({album: albumStored});
            }
        }
    });
}

function getAlbum(req, res){
    var albumId = req.params.id;

    Album.findById(albumId).populate({path: 'artist'}).exec((err, album) => {
        if(err){
            res.status(500).send({message: 'Server error'});
        }else{
            if(!album){
                res.status(404).send({message: 'Album not exist'});
            }
            res.status(200).send({album});
        }
    })
}

module.exports = {
    testAlbum,
    saveAlbum,
    getAlbum
}
