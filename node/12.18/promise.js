var fs=require("fs");
var path=require("path");

new Promise(function(){
    fs.readFile('./a.txt','utf8',function(err,data){
        if(err){
            console.log(err);
        }else{
            console.log(data);
        }
    })
})