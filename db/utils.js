const utils = {};
const { Pool } = require("pg");

// Inialisation de la connexion
const pool = new Pool({
    user: "lxnqjoas",
    host: "kandula.db.elephantsql.com",
    database: "lxnqjoas",
    password: "tAA1DRiRI3gIvcfd1ZvpOTUyyusoqZ3q",
    port: 5432
  });
  
  utils.executeQuery = (sql, params, callback) => {
    pool.query(sql, params, callback);
  };
  
  module.exports = utils;