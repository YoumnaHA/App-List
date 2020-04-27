const express = require("express");
const helpers = require("./helpers");
const utils = require("../db/utils");

const router = express.Router();

//router.get('/hello', (req, res) => {
//    res.status(200).json({status: 'OK'});
//});

//Mise à jour de l'adresse mail 
router.post("/update/mail", (req, res) => {

    //Variables pour récupérer les paramètres
    const mail1 = req.body.mail1;
    const mail2 = req.body.mail2;
    const user_id = 1;

    //Vérification de format de l'adresse mail
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail1)) {
        res.status(400).json({status:'error', cause: 'L\'adresse mail n\'est pas valide'});
        return;
    }
    //Vérification de la correspondance entre les 2 adresses mail
    if (mail1 != mail2) {
        res.status(400).json({status:'error', cause: 'Les adresses mail doivent être identiques'});
        return;
    }

    //Requête de mise à jour de l'adresse mail
    const query = "UPDATE users SET usermail=$1 WHERE user_id=$2";
    utils.executeQuery(query, [mail1, user_id], (err, result) => {
        if (err) {
            res.status(500).json({errorCause: 'Erreur server'})
        } else {
            res.status(200).json({status: 'success', msg: `L'adresse mail ${mail1} a été mise à jour.`});
        }
    });
});


// Mise à jour de du mot de passe
router.post('/update/password', (req, res) => {
        const user_id = 1;
        const password1 = req.body.password1;
        const password2 = req.body.password2;
        const password3 = req.body.password3;

        //Vérification de la correspondance entre les deux champs
    if (password2 != password3) {
        res.status(400).json({status:'error', cause: 'Les deux champs doivent être identiques'});
        return;
    }

    //Requête de mise à jour du mot de passe
    const query = "UPDATE users SET password=$1 WHERE user_id=$2";
    utils.executeQuery(query, [password2, user_id], (err, result) => {
        if (err) {
            res.status(500).json({errorCause: 'Erreur server'})
        } else {
            res.status(200).json({status: 'success', msg: `Le mot de passe a été mis à jour.`});
        }
    });
}); 

module.exports = router; 