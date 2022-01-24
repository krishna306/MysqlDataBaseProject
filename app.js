const express = require('express');
const mysql = require('mysql');
const faker = require('faker');
const bodyParser = require('body-parser');
const res = require('express/lib/response');
const { cookie } = require('express/lib/response');

const app = express();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/Public"));


const connection = mysql.createConnection({
    user : 'root',
    password : 'password',
    database : 'dbms',
    host : 'localhost'
});

app.post("/register" , function(req,res){
    var person = {email : req.body.email }; 
     connection.query("insert into users set ?",person,function(error,results){
        if(error) throw error
     res.redirect("/");
     });
 });


app.get("/",function(req,res){
    var q = 'select count(*) as total_users from users';
    connection.query(q,function(error,results){
        if(error) throw error ; 
        var count = results[0].total_users;
        res.render("home",{count : count});
    });
});



app.listen(3000,function(){
    console.log('App listening on port 3000');
});