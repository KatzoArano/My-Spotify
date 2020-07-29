'use strict'

const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user'); 

function test(req, res){
    res.status(200).send({
        message: "Phase de test depuis le controller user"
    })
}

function saveUser(req, res){
    const user = new User();

    let params = req.body;

    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_ADMIN';
    user.image = null;

    if (params.password){
        // cryptage password
        bcrypt.hash(params.password, null, null, function(error, hash) {
            user.password = hash;
            if(user.name != null && user.surname != null && user.email != null) {
                // enregistrer user
                user.save((err, userStored ) => {
                    if(err){
                        res.status(500).send({message: "Erreur en enregistrant user"});
                    }else{
                        if(!userStored){
                            res.status(404).send({message: "User non enregistré"});
                        }else{
                            res.status(200).send({user:userStored});
                        }
                    }
                })
            } else {
                res.status(200).send({message: "Introduire tous les champs user"});
            }
        })
    } else {
        res.status(500).send({message: "Introduire le password"});
    }
}

module.exports = {
    test,
    saveUser
};