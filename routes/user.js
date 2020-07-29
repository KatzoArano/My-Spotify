const express = require('express');
const userCtrl = require('../controllers/user');

const api = express.Router();

api.get('/testController', userCtrl.test);
api.post('/register', userCtrl.saveUser);

module.exports = api;