var mysql=require("mysql");

var connection=mysql.createConnection({
    host:'localhost',
    user:'name',
    password:'root',
    database:"users"
})

//建立连接
connection.connect();

connection.query(`INSERT INTO users VALUES(NULL,"admin","123")`,function(error,result,fields){
    if(error){
        throw error;
    }
    console.log(results);
})

//关闭连接
connection.end();