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
                            console.log('user', userStored)
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

function loginUser(req, res){
    const params = req.body;

    const email = params.email;
    const password = params.password;

    User.findOne({email: email.toLowerCase()}, (err, user) => {
        if(err){
            res.status(500).send({message: "Erreur lors de la requete"});
        }else{
            if(!user){
                res.status(404).send({message: "User non existant"});
            }else{
                bcrypt.compare(password, user.password, (err, check) => {
                    if(check){
                        // retourner l'user logged
                        if(params.gethash){
                            // retourner un toker JWT
                        }else {
                            res.status(200).send({user});
                        }
                    }else{
                        res.status(404).send({message: "User non logger"});
                    }
                })
            }
        }
    })
}

module.exports = {
    test,
    saveUser,
    loginUser
};