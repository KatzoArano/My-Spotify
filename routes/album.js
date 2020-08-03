const express = require('express');
const albumCtrl = require('../controllers/album');
const md_auth = require('../middelwares/authenticated');

const api = express.Router();

api.get('/testAlbum',md_auth.validationAuth, albumCtrl.testAlbum);
api.post('/album',md_auth.validationAuth, albumCtrl.saveAlbum);

module.exports = api;