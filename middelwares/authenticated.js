'use strict';

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'armatiropunk!'

exports.validationAuth = (req, res, next) => {

    if(!req.headers.authorization){
        return res.status(403).send({message: "La requete non complete. Manque authorization."})
    }
    // supprimer les guillements simples et doubles du token remplacer par RIEN
    var token = req.headers.authorization.replace(/['"]+/g, ''); 

    try {
        var payload = jwt.decode(token, secret);

        if(payload.exp <= moment().unix()){
            return res.status(401).send({message: "Token expiree."})
        }
    }
    catch (ex) {
        console.log(ex);
        return res.status(404).send({message: "Token non valide."})
    }

    req.user = payload;
    
    next();
}