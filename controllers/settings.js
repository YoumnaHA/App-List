const express = require("express");
const helpers = require("./helpers");
const utils = require("../db/utils");
const bcrypt = require('bcrypt');
const settingService = require('../services/settings');

const router = express.Router();

//Mise à jour de l'adresse mail 
router.post("/update/mail", (req, res) => {
    
    //Variables pour récupérer les paramètres
    const mail1 = req.body.mail1;
    const mail2 = req.body.mail2;
    const user_id = 1;

    //Appel au service pour la fonction updateMail
    settingService.updateMail({user_id, mail1, mail2}, (err, result) => {
        if (err) {
            res.status(err.code).json(err.error)
        } else {
            res.status(200).json(result);
        }
    });
});


// Mise à jour de du mot de passe
router.post('/update/password', (req, res) => {

    //Variables pour récupérer les paramètres
    const user_id = 2;
    const password1 = req.body.password1;
    const password2 = req.body.password2;
    const password3 = req.body.password3;

    //Appel au service pour la fonction updatePassword
    settingService.updatePassword({user_id, password1, password2, password3}, (err, result) => {
        if (err) {
            res.status(err.code).json(err.error)
        } else {
            res.status(200).json(result);
        }
    });
}); 

module.exports = router; 