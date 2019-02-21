var mysql = require ('mysql');
var dbconnect = mysql. createPool({
        host: "localhost",
        user: "root",
        password: "",
        database: "db_pembayaran"
});
module.exports = dbconnect