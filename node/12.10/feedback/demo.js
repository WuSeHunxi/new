var fs = require("fs");
var template = require("art-template");
var http = require("http");
var url = require("url");

var comments = [{
    name: "张三",
    message: "哇哦",
    dataTime: "2019-12-10"
},
{
    name: "张三2",
    message: "哇哦",
    dataTime: "2019-12-10"
},
{
    name: "张三3",
    message: "哇哦",
    dataTime: "2019-12-10"
}, {
    name: "张三4",
    message: "哇哦",
    dataTime: "2019-12-10"
},
{
    name: "张三5",
    message: "哇哦",
    dataTime: "2019-12-10"
}
];

http.createServer(function(req,res){
    var pathname=url.parse(req.url,true).pathname;
    if(pathname==='/'){
        fs.readFile('./views/index.html','utf8',function(err,data){
            if(err){
                return res.end('404 Not Found');
            }else{
                var str=template.render(data.toString(),{
                    comments:comments
                })
                res.end(str);
            }
        })
    }
    if(pathname==='/post'){
        fs.readFile('./views/post.html',function(err,data){
            if(err){
                return res.end('404 Not Found');
            }
            res.end(data);
        })
    }
}).listen(3000,function(){
    console.log("http is running ....");
})