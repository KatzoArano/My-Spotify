const express = require('express');
const userCtrl = require('../controllers/user');

const api = express.Router();

api.get('/testController', userCtrl.test);
api.post('/register', userCtrl.saveUser);
api.post('/login', userCtrl.loginUser);

module.exports = api;