'use strict'

// upload && save image
const fs = require('fs');
const path = require('path');

const Artist = require('../models/artist');
const Album = require('../models/album');
const Song = require('../models/song');

function testArtist(req,res){
    res.status(200).send({message: "Controllador artist Ok"})
}

function saveArtist(req, res){
    var artist = new Artist();

    var params = req.body;
    artist.name = params.name;
    artist.description = params.description;
    artist.image = 'null';
    artist.style = params.style;

    artist.save((err, artistStored) => {
        if(err){
            res.status(500).send({message: "Error en sauvegardant artiste"})
        }else{
            if(!artistStored){
                res.status(404).send({message: "Artiste non enregistre"})
            }else{
                res.status(200).send({artist: artistStored })
            }
        }
    })
}

function getArtist(req,res){
    var artistId = req.params.id;

   Artist.findById(artistId, (err, artist) => {
    if(err){
        res.status(500).send({message: "Erreur requete"})
    }else{
        if(!artist){
            res.status(404).send({message: "Artiste non existant"})
        }else{
            res.status(200).send({artist})
        }
    }
   })
}


module.exports = {
    testArtist,
    saveArtist,
    getArtist
}