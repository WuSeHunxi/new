var fs=require("fs");
//通常情况下path和fs是成对引入的

//这里面的./a.txt不是相对于当前执行文件的路径，而是相对于当前执行的node命令所处的路径
//为了更好地运行，将相对路径改为绝对路径


//__dirname+'/a.txt' <---> path.join(__dirname,'/a.txt')
fs.readFile(path.join(__dirname,'/a.txt'),'utf8',function(err,data){
    if(err){
        throw err;
    }
    console.log(data);
})