const express = require('express');
const artistCtrl = require('../controllers/artist');
const md_auth = require('../middelwares/authenticated');

const api = express.Router();

api.get('/artist',md_auth.validationAuth, artistCtrl.getArtist);

module.exports = api;