var pool = require('./databaseConfig.js');
var paymentDB = {
    getData: function (callback) {
        pool.getConnection(function (err, conn) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT * FROM tb_bayar';
                conn.query(sql, function (err, result) {
                    conn.release();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        console.log(result);
                        return callback(null, result);
                    }
                });
            }
        });
    }
,
addPayment: function(name, status, callback){
    pool.getConnection(function(err, conn){
        if(err){
            console.log(err);
            return callback(err, null);
        }
        else {
            console.log("Connected");
            var sql = 'INSERT INTO tb_bayar (name, status) values (?,?)';
            conn.query(sql, [name, status], function(err, result){
                conn.release();
                if(err){
                    console.log(err);
                    return callback(err, null);
                } else {
                    console.log(result);
                    return callback(null, result);
                }
            });
        }
    });
}
/* end function addUser */
,

// Delete
deletePayment: function(userid, callback){
    pool.getConnection(function(err, conn){
        if(err){
            console.log(err);
            return callback(err, null);
        }
        else {
            console.log("Connected");
            var sql = 'DELETE FROM tb_bayar WHERE id = ?';
            conn.query(sql, [userid], function(err, result){
                conn.release();
                if(err){
                    console.log(err);
                    return callback(err, null);
                } else {
                    console.log(result);
                    return callback(null, result);
                }
            });
        }
    });
}
,
// END DELETE

 getPaymentById: function (userid, callback) {
    pool.getConnection(function (err, conn) {
    if (err) {
        console.log(err);
        return callback(err, null);
    }
    else {
        console.log("Connected!");
        var sql = 'SELECT * FROM tb_bayar where id = ?';
        conn.query(sql, [userid], function (err, result) {
            conn.release();
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                console.log(result);
                return callback(null, result);
            }
        });
    }
    });
 }
 ,

 // UPDATE
 updateUser: function(name, status, userid, callback){
    pool.getConnection(function(err, conn){
        if(err){
            console.log(err);
            return callback(err, null);
        }
        else {
            console.log("Connected");
            console.log(name+", "+status);
            var sql = 'UPDATE tb_bayar SET name=?, status=? WHERE id = ?';
            conn.query(sql, [name, status, userid], function(err, result){
                conn.release();
                if(err){
                    console.log(err);
                    return callback(err, null);
                } else {
                    console.log(result);
                    return callback(null, result);
                }
            });
        }
    });
    }
};
module.exports = paymentDB