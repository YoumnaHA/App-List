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
        // callback(true, 'Le mail n\'est pas valide');
        res.status(400).json({status:'error', cause: 'L\'adresse mail n\'est pas valide'});
        return;
    }
    //Vérification de la correspondance entre les 2 adresses mail
    if (mail1 != mail2) {
        // callback(true, 'Les mails ne correspondent pas');
        res.status(400).json({status:'error', cause: 'Les mails ne correspondent pas'});
        return;
    }
    
    //Requête de mise à jour de l'adresse mail
    const query ="UPDATE users SET usermail=$1 WHERE user_id=$2";
    utils.executeQuery(query, [mail1, user_id], (err, result) => {
        if (err) {
            // callback(true, err);
            res.status(500).json({errorCause: 'Pb BDD'})
        } else {
            // callback(undefined, result.rows[0]);
            res.status(200).json({status: 'success', msg: 'yes'})
        }
    });
});
// updateMail(params, (err, msg) => {
//     if (err) {
//         res.status(500).send(msg);
//         return;
//     }

//     //Si la MAJ a été effectuée
//     req.session.infoMessage = `L'adresse mail ${params.mail1} a été mis à jour.`;
//     res.status(200).json({status: 'success', msg: `L'adresse mail ${params.mail1} a été mis à jour.`});
// });
// });


// Mise à jour de du mot de passe
router.post('/update/password', helpers.limitAccessToAuthentificatedOnly, (req, res) => {
    const params = {
        user_id: req.session.userId,
        password1: req.body.password1,
        password2: req.body.password2,
        password3: req.body.password3
    };
    updatePassword(params, (err, msg) => {
        if (err) {
            res.status(500).send(msg);
            return;
        }
        
        //Si la MAJ a été effectuée
        req.session.infoMessage = `Le mot de passe a été mis à jour.`;
        res.redirect("/settings");
    });
});

// Fonction de mise à jour de l'adresse mail
function updateMail({ user_id, mail1, mail2 }, callback) {  
    
    //Vérification de format de l'adresse mail
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail1)) {
        callback(true, 'Le mail n\'est pas valide');
        return;
    }
    //Vérification de la correspondance entre les 2 adresses mail
    if (mail1 != mail2) {
        callback(true, 'Les mails ne correspondent pas');
        return;
    }
    //Vérification de l'adresse mail
    const compte = "SELECT COUNT(*) FROM users WHERE usermail=$1";
    utils.executeQuery(compte, [mail1, user_id], (err, result) => {
        if(err) {
            callback(true, err);
        } else {
            if (compte > 0) {
                callback(true, 'L\'adresse mail est déjà utilisée');
                return;
            }
        };
        //Requête de mise à jour de l'adresse mail
        const query ="UPDATE users SET usermail=$1 WHERE user_id=$2";
        utils.executeQuery(query, [mail1, user_id], (err, result) => {
            if (err) {
                callback(true, err);
            } else {
                callback(undefined, result.rows[0]);
            }
        });
    });
}

// Fonction de mise à jour du mot de passe
function updatePassword({ user_id, password1, password2, password3 }, callback) {
    //Vérification que le mot de passe correspond bien à l'adrese mail connectée
    //if (password1 != )
    
    
    //Vérification de la correspondance entre les deux champs
    if (password2 != password3) {
        callback(true, 'Les deux champs doivent être identiques !');
        return;
    }
    
    
    //Requête de mise à jour du mot de passe
    const query = "UPDATE users SET password=$1 WHERE user_id=$2";
    utils.executeQuery(query, [password2, user_id], (err, result) => {
        if (err) {
            callback(true, err);
        } else {
            callback(undefined, result.rows[0]);
        }
    });
} 

module.exports = router;