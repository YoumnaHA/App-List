// const utils = require("../db/utils");

// // Fonction que l'on souhaite rendre visible à l'exterieur du module
// module.exports = {
//   updateMail,
//   updatePassword
// };

// function updateMail ({ user_id, mail1, mail2 }, callback) {
//     //Gestion des erreurs

//     //Requête de mise à jour de l'adresse mail
//     const query ="UPDATE users SET usermail=$1 WHERE user_id=$2";
//     utils.executeQuery(query, [mail1, user_id], (err, result) => {
//         if (err) {
//             callback(true, err);
//           } else {
//             callback(undefined);
//           }
//     });   
// }

// function updatePassword ({ user_id, password1, password2, password3 }, callback) {
//     //gestion des erreurs

//     //Requête de mise à jour du mot de passe
//     const query = "UPDATE users SET password=$1 WHERE user_id=$2";
//     utils.executeQuery(query, [password2, user_id], (err, result) => {
//         if (err) {
//             callback(true, err);
//           } else {
//             callback(undefined);
//           }
//   });
// }