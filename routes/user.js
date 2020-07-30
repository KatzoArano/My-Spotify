const express = require('express');
const userCtrl = require('../controllers/user');
const md_auth = require('../middelwares/authenticated');

const api = express.Router();

api.get('/testController',md_auth.validationAuth, userCtrl.test);
api.post('/register', userCtrl.saveUser);
api.post('/login', userCtrl.loginUser);

module.exports = api;