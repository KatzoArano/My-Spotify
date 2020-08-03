const express = require('express');
const albumCtrl = require('../controllers/album');
const md_auth = require('../middelwares/authenticated');

const api = express.Router();

api.get('/testAlbum',md_auth.validationAuth, albumCtrl.testAlbum);
api.get('/album/:id',md_auth.validationAuth, albumCtrl.getAlbum);
api.get('/albums/:artist?', md_auth.validationAuth, albumCtrl.getAlbums);
api.post('/album',md_auth.validationAuth, albumCtrl.saveAlbum);
api.put('/album/:id', md_auth.validationAuth, albumCtrl.updateAlbum);
api.delete('/album/:id', md_auth.validationAuth, albumCtrl.deleteAlbum);

module.exports = api;