const express = require('express');
const userCtrl = require('../controllers/user');
const artistCtrl = require('../controllers/artist');
const md_auth = require('../middelwares/authenticated');

const api = express.Router();

const multipart = require('connect-multiparty');
const md_upload = multipart({uploadDir: './uploads/users'});

api.get('/testController',md_auth.validationAuth, userCtrl.test);
api.post('/register', userCtrl.saveUser);
api.post('/login', userCtrl.loginUser);
api.put('/update-user/:id', md_auth.validationAuth, userCtrl.updateUser);
api.post('/upload-image-user/:id', [md_auth.validationAuth, md_upload], userCtrl.uploadImage);
api.get('/get-image-user/:imageFile', userCtrl.getImageFile);



module.exports = api;