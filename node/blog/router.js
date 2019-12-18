/**
 * 设计路由
 */

var express=require("express");
var router=express.Router();

router.get('/',function(req,res){
    res.render('index.html');
})

router.get('/login',function(req,res){
    res.render('login.html');
})

router.post('/login',function(req,res){

})

router.get('/register',function(req,res){
    res.render('register.html');
})

router.post('/register',function(req,res){
    //获取表单提交的数据
    //操作数据库
    //发送响应
    // console.log(req.body);//get的时候请求，post的时候提交
    
})

module.exports=router;