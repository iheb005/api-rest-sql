let mysql= require('mysql');
let dbconfig = require("../config/dbconfig.js");

let connection = mysql.createConnection({
   host: dbconfig.HOST,
   user: dbconfig.USER ,
   password: dbconfig.PASSWORD,
   database: dbconfig.DB
  });

//open MySQL connection
connection.connect(error => {
    if (error) throw error;
    console.log('connected successfully to the database');

var req="CREATE TABLE IF NOT EXISTS USERS (id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, email varchar(60) NOT NULL, firstname varchar(30) NOT NULL,lastname varchar(30) NOT NULL, active BOOLEAN DEFAULT false) ENGINE=InnoDB DEFAULT CHARSET=utf8"
 
connection.query(req,function(err,result){
    if (err) throw err;
    console.log("table created");
});
});

module.exports=connection;