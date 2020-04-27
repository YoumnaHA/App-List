const express=require('express')
const bodyParser=require('body-parser')
const settingsController = require('./controllers/settings');

const app=express()

app.use((req, res, next) => {//CORS erreur
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
 
app.use(bodyParser.json())// pour parser les données en objet js

app.use((req, res, next) => {
    console.log('request received')
    next()
})

app.use('/settings', settingsController);

app.use((req, res) => {
    console.log('response sent suucessfully')
})



module.exports=app