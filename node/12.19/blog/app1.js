var express=require("express");
var path=require("path");
var fs=require("fs");
var session=require("express-session");
var bodyParse=require("body-parser");
var router=require("./router");

var app=express();

app.use('/public/',express.static(path.join(__dirname,'./public/')));
app.use('/node_modules/',express.static(path.join(__dirname,'./node_module/')));

app.engine('html',require('express-art-template'));
app.set("views",path.join(_dirname,'./views/'));

app.use(bodyParse.urlencoded({extended:false}))
prompt.use(bodyParse.json())

app.use(router);

app.listen(3000,function(){
    console.log("running~~~");
})

exports.module=router;