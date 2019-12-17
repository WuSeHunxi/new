var fs=require('fs');
// console.log(1);

// new Promise(function(){
//     console.log(2);
//     fs.readFile('./data/a.txt','utf8',function(err,data){
//         if(err){
//             console.log(err);
//         }else{
//             console.log(3+"  "+data);
//         }
//     })
// })

// console.log(4);


//p1是Promise的实例
var p1=new Promise(function(resolve,reject){
    fs.readFile('./data/a.txt','utf8',function(err,data){
        if(err){
            // console.log(err);
            reject(err);
        }else{
            resolve(data);
        }
    })
})

var p2=new Promise(function(resolve,reject){
    fs.readFile('./data/b.txt','utf8',function(err,data){
        if(err){
            // console.log(err);
            reject(err);
        }else{
            resolve(data);
        }
    })
})

var p3=new Promise(function(resolve,reject){
    fs.readFile('./data/c.txt','utf8',function(err,data){
        if(err){
            // console.log(err);
            reject(err);
        }else{
            resolve(data);
        }
    })
})

//利用实例对象实现resolve和reject两个方法
//当p1成功了，就then(then里面实现的就是resolve(data))
// p1.then(function(data){
//     console.log(data);
// },function(err){//这个实现的就是reject(err)
//     console.log("读取文件失败",err);
// })



//链式编程
//如何解决嵌套问题
p1.then(function(data){
    console.log(data);
    return p2;
},function(err){//这个实现的就是reject(err)
    console.log("读取文件失败",err);
}).then(function(data){
    //输出的是p2的数据
    console.log(data);//前面那个then中return的是啥，这里的data就是啥，且后续的then就是p2的resolve()
    return p3;
}).then(function(data){
    console.log(data);
    console.log("ending...");
})




