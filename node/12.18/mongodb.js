/**
 * 检验是否安装成功：mongod --version
 * 开启数据库：mongod+回车
 * 关闭数据库：ctrl+c
 * 连接数据库：另外打开一个新的cmd,敲 mongo
 * 关闭连接：exit
 * 默认的链接地址：127.0.0.7:27017
 * 
 * 
 * 
 * 基本命令：
 *      show dbs-->查看显示所有数据库
 *      db-->查看当前连接的数据库(默认连接的是test)
 *      use 数据库名称-->切换到指定的数据库(如果没有的话会新建)
 *      db.students.insertOne({"name":"jack"})-->插入数据
 *      db.students.find()-->查找所有的
 * 
 * 
 * node与MongoDB
 */