const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:  // le mot de passe
  database: 'doctorcomp', // le nom de la base de données
});
module.exports = connection;
