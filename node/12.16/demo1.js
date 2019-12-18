var mysql=require("mysql");

//创建链接
var connection=mysql.createConnection({
    host:'localhost',
    user:'me',
    pssword:'secret',
    database:'users' //数据库名和表名一样
});

//连接数据库
connection.connect();

//执行数据操作
// connection.query('SELECT * FROM `users`',function(error,results,fields){
//     if(error){
//         throw error;//抛出异常，阻止进一步执行
//     }
//     // console.log('The solution is:',results[0].solution);
//     console.log(results);
// });

//执行添加数据
connection.query(`INSERT INTO users VALUES(NULL,"admin","123")`,function(error,results,fields){
    if(error){
        throw error;
    }
    console.log(results);
})

//关闭连接
connection.end();