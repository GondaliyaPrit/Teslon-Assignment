const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
var mysql = require('mysql');
var multer = require('multer');
var upload = multer();

const app = express();

// for parsing application/json
app.use(express.json());
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
app.use(cors(corsOptions));
// for parsing application/x-www-form-urlencoded
app.use(upload.array());
app.use(express.static('public'));

//create database connection
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'prit-teslon'
});

//connect to database
conn.connect((err) => {
    if (err) throw err;
    console.log('Mysql Connected...');
});


//add new user
app.post('/store-data', (req, res) => {
    console.log(req.body.fname)
    console.log(req.body.lname)
    console.log(req.body.gender)
    console.log(req.body.age)
    var fname = req.body.fname;
    var lname = req.body.lname;
    var gender = req.body.gender;
    var age = req.body.age;
    var sql = `INSERT INTO user (fname, lname, gender, age) VALUES ("${fname}", "${lname}", "${gender}", "${age}")`;
    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log('record inserted');
        res.json({ message: "Hello from server!" });
    });
});


app.post('/search', (req, res) => {
    console.log(req.body.search)
    var search = req.body.search;
    var sql = `select * from user WHERE fname LIKE"${search}%" OR lname LIKE"${search}%"`;
    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.json(result);
    });
});





app.get('/store-data', (req, res) => {
    console.log(req.body.age)
    // var fname = req.body.fname;
    // var lname = req.body.lname;
    // var gender = req.body.gender;
    // var age = req.body.age;

    // var fname = "dsds";
    // var lname = "dsds";
    // var gender = "dsds";
    // var age = 10;
    // var sql = `INSERT INTO user (id,fname, lname, gender, age) VALUES ("${fname}", "${lname}", "${gender}", "${age}", NOW())`;
    // conn.query(sql, function (err, result) {
    //     if (err) throw err;
    //     console.log('record inserted');
    //     res.json({ message: "Hello from server!" });
    // });
});

app.get('/', (req, res) => {
    // var fname = req.body.fname;
    // var lname = req.body.lname;
    // var gender = req.body.gender;
    // var age = req.body.age;

    var fname = "dsds";
    var lname = "dsds";
    var gender = "dsds";
    var age = 10;
    var sql = `select * from user`;
    var data = conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.json(result);
    });
});

app.listen(3003, () => {
    console.log("Server running successfully on 3003");
});