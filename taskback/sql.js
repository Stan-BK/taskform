var mysql  = require('mysql');  
 
var connection = mysql.createConnection({     
  host     : 'localhost',       
  user     : 'root',              
  password : 'admin',       
  port: '3306',                   
  database: 'task' 
}); 

module.exports =  connection