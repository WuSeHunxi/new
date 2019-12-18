var http=require("http");
var fs=require("fs");
http.createServer(function(req,res){
    fs.readFile('./index.html',function(err,data){
        if(err){
            return res.end(error);
        }else{
            res.end(data);
        }
        res.setHeader("Content-Type","text/html;charset=UTF-8");
    })
}).listen(3000,function(){
    console.log("success");
})