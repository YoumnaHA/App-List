const utils = require("../db/utils");

// Fonction que l'on souhaite rendre visible à l'exterieur du module
module.exports = {
  updateMail,
  updatePassword
};

function updateMail ({ user_id, mail1, mail2 }, callback) {
    //Gestion des erreurs
    //Vérification de format de l'adresse mail
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail1)) {
        callback({code: 400, error: { cause: 'L\'adresse mail n\'est pas valide'}}, undefined);
        return;
    } 
    
    //Vérification de la correspondance entre les 2 adresses mail
    if (mail1 != mail2) {
        callback({code: 400, error: { cause: 'Les adresses mail doivent être identiques'}}, undefined);
        return;
    }

    //Requête de mise à jour de l'adresse mail
    const query = "UPDATE users SET usermail=$1 WHERE user_id=$2";
    utils.executeQuery(query, [mail1, user_id], (err, result) => {
        if (err) {
            console.log('jfndkjfnsdfnsifnsdfn')
            callback({code: 500, error: {cause: 'Erreur serveur'}}, undefined);
        } else {
            callback(undefined, {msg : `L'adresse mail ${mail1} a été mise à jour.`});
        }
    }); 
}

function updatePassword ({ user_id, password1, password2, password3 }, callback) {
    //gestion des erreurs
    //Vérification que le mot de passe actuel correspond bien au compte associé
    utils.executeQuery("SELECT password FROM users where user_id=$2 and password=$1", [password1, user_id], (err, result) => {
        if (err) {
            callback({code: 500, error: { cause: 'Erreur server'}}, undefined);
        } else {
            const oldPassword = result.rows[0];
            if (oldPassword == undefined) {
                callback({code: 400, error: { cause: 'Le mot de passe actuel est incorrect'}}, undefined);
                return;
                
            } else {
                //Vérification de la correspondance entre les deux champs
                if (password2 != password3) {
                    callback({code: 400, error: { cause: 'Les mots de passe doivent être identiques'}}, undefined);
                    return;
                }
                
                //Requête de mise à jour du mot de passe
                const query = "UPDATE users SET password=$1 WHERE user_id=$2";
                utils.executeQuery(query, [password2, user_id], (err, result) => {
                    if (err) {
                        callback({code: 500, error: { cause: 'Erreur server'}}, undefined);
                    } else {
                        callback(undefined, {msg : `Le mot de passe a été mis à jour.`});
                    }
                });
            }
        }      
    });
    
};
