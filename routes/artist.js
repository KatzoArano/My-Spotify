const express = require('express');
const artistCtrl = require('../controllers/artist');
const md_auth = require('../middelwares/authenticated');

const api = express.Router();

api.get('/testArtist',md_auth.validationAuth, artistCtrl.testArtist);
api.post('/artist',md_auth.validationAuth, artistCtrl.saveArtist);
api.get('/artist/:id', md_auth.validationAuth, artistCtrl.getArtist);
api.get('/artists/:page?', md_auth.validationAuth, artistCtrl.getAllArtists);
api.put('/artist/:id', md_auth.validationAuth, artistCtrl.updateArtist);
api.delete('/artist/:id', md_auth.validationAuth, artistCtrl.deleteArtist);
api.get('/get-image-artist/:imageFile', artistCtrl.getImageFile);


module.exports = api;