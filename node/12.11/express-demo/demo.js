var express=require("express");
var app=express();

app.use('/public/',express.static("./public/"));
app.use('/static/',express.static("./public/"));

app.get('/',function(req,res){

})

app.get('/about',function(req,res){

})

app.listen(3000,function(){
    console.log("app is running...");
})