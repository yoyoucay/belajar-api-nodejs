var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
var path = require('path');
var cors = require("cors")
var cor = cors();
app.use(cor);
app.use(express.static(path.join(__dirname, "../public")));
var furniture = require('../model/payment.js');

app.get('/api/bayar', function (req, res) {
    furniture.getData(function (err, result) {
        if (!err) {
            res.send(result);
        }
        else {
            console.log(err);
            res.status(500).send(err);
        }
    });
});

app.get('/api/bayar/:userid', function (req, res) {
 var userid = req.params.userid;
 furniture.getPaymentById(userid, function (err, result) {
    if (!err) {
        res.send(result);
    }
    else {
        console.log(err);
        res.status(500).send(err);
    }
 });
});

// POST
app.post('/api/bayar', urlencodedParser, jsonParser, function (req, res) {
    var name = req.body.name;
    var status = req.body.status;
    furniture.addPayment(name, status, function (err, result) {
        if (!err) {
            console.log(result);
            res.send(result.affectedRows + ' Data berhasil dimasukkan :)');
        }
        else {
            console.log(err);
            res.status(500).send(err.code);
        }
    })
})

app.delete('/api/bayar/:userid', function (req, res) {
    var userid = req.params.userid;

    furniture.deletePayment(userid, function (err, result) {
        if (!err) {
            console.log(result);
            res.send(result.affectedRows + ' Data dihapus');
        }
        else {
            console.log(err);
            res.status(500).send(err.code);
        }
    });
});

app.post('/api/bayar/:userid', urlencodedParser, jsonParser, function (req, res) {
    var name = req.body.name;
    var status = req.body.status;
    var userid = req.params.userid;

    furniture.updateUser(name, status, userid, function (err, result) {
        if (!err) {
            console.log(result);
            res.send(result.affectedRows + ' Data diubah');
        }
        else {
            console.log(err);
            res.status(500).send(err.code);
        }
    });
});

module.exports = app
