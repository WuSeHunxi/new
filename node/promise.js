var fs=require('fs');
console.log(1);

new Promise(function(){
    console.log(2);
    fs.readFile('./data/a.txt','utf8',function(err,data){
        if(err){
            console.log(err);
        }else{
            console.log(3+data);
        }
    })
})

console.log(4);