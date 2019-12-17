var express=require("express");

var app=express();

/**
 * 
 * path路径操作模块
 * path.basename-->获取文件名部分(包含后缀名)
 * path.dirname-->获取路径中的目录部分
 * path.extname-->获得后缀名
 * path.isAbsolute-->判断是否是绝对路径
 * path.parse(路径)-->把一个路径解析成对象(包含上面几个)
 * path.join()-->添加路径分隔符(当要进行路径拼接时使用)
 */

/**
 * _dirname
 */

//path.join()-->将相对路径改成绝对路径
app.use('/public/',express.static(path.join(_dirname,'./public/')));
app.use('/node_modules/',express.static(path.join(_dirname,'public')));

app.get('/',function(req,res){
    res.send();
})

app.listen(3000,function(){
    console.log('running......');
})