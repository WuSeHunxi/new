/**
 * npm i art-template express-art-template
 */

var express=require("express");
var path=require("path");
var app=express();
var router=require("./router");
var bodyParser=require("body-parser");

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
 * Node中的其他成员
 *      在每个模块中，除了require,exports等模块相关的API之外，还有两个特殊的成员：
 *             _dirname-->获取当前文件模块所属目录的绝对路径(获取路径是动态的)
 *             _filename-->获取当前文件的绝对路径(获取路径是动态的)
 * 在文件中，相对路径是不可靠的，因为文件操作的路径被设计为node命令所处的路径中，为了解决该问题，需要把相对路径变为绝对路径，
 * 需要使用_dirname和_filename
 * 
 * 
 * 模块中的路径标识和文件操作中的相对路径标识不一致，
 *      模块路径中的路径标识就是相对于当前文件模块，不受执行node命令所处路径影响
 */

//path.join()-->将相对路径改成绝对路径
app.use('/public/',express.static(path.join(_dirname,'./public/')));
app.use('/node_modules/',express.static(path.join(_dirname,'./node_modules/')));

app.engine('html',require('express-art-template'));
app.set('views',path.join(_dirname,'./views/'));

app.use(bodyParser.json());

//把路由挂在到app中
app.use(router);

app.listen(3000,function(){
    console.log('running......');
})