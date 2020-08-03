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

function getAlbums(req, res){
    var artistId= req.params.artist;

    if(!artistId){
        // Get all albums
        var find = Album.find().sort('title');
    }else{
        // Get all artist's albums
        var find = Album.find({artist: artistId}).sort('year');
    }

    find.populate({path: 'artist'}).exec((err, albums)=>{
        if(err){
            res.status(500).send({message: "Server error"});
        }else{
            if(!albums){
                res.status(404).send({message: "This artist has no albums"});
            }else{
                res.status(200).send({albums});
            }
        }
    });
}

function updateAlbum(req, res){
    var albumId = req.params.id;
    var update = req.body;

    Album.findByIdAndUpdate(albumId, update, (err, albumUpdated)=>{
        if(err){
            res.status(500).send({message: 'Server Error'});
        }else{
            if(!albumUpdated){
                res.status(404).send({message: 'Album cannot be updated'});
            }else{
                res.status(200).send({album: albumUpdated});
            }
        }
    });
}

function deleteAlbum(req, res){
    var albumId = req.params.id;

    Album.findByIdAndRemove(albumId, (err, albumRemoved)=>{
        if(err){
            res.status(500).send({message:"Album cannot be deleted"});
        }else{
            if(!albumRemoved){
                res.status(404).send({message:"Album wasn't deleted"});
            }else{
                //res.status(404).send({message: "Album removed"});
                // Delete all songs
                Song.find({album: albumRemoved._id}).deleteOne((err, songRemoved) =>{
                    if(err){
                        res.status(500).send({message:"Server Error"});
                    }else{
                        if(!songRemoved){
                            res.status(404).send({message:"Song wasn't deleted"});
                        }else{
                            res.status(200).send({album: albumRemoved});
                        }
                    }
                });
            }
        }
    });
}

module.exports = {
    testAlbum,
    saveAlbum,
    getAlbum,
    getAlbums,
    updateAlbum,
    deleteAlbum
}
