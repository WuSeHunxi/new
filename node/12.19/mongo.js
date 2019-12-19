// var mongoose=require("mongoose");
// var Schema=mongoose.Schema;
// mongoose.connect('mongodb://localhost/student');

// var studentSchema=new Schema({
//     name:{
//         type:String,
//         required:true
//     },
//     sex:{
//         type:String,
//         required:true
//     },
//     age:{
//         type:String,
//         required:true
//     }
// })

// var Student=mongoose.model('Student',studentSchema);

// var st1=new Student({
//     name:"pap",
//     sex:"男",
//     age:10
// })

// st1.save(function(err,ret){
//     if(err){
//         console.log("保存失败");
//     }else{
//         console.log("保存成功"+ret);
//     }
// })




var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/ST");
var adSchema=new adSchema({
    name:{
        type:String,
        required:true
    },
    sex:{
        type:String,
        enum:[-1,0,1],
        default:-1
    },
    age:{
        type:String 
    }
})

var Admin=mongoose.model('Admin',adSchema);

var admin=new Admin({
    name:"apa",
    sex:1,
    age:10
});

admin.save(function(err,ret){
    if(err){
        console.log(err)
    }else{
        console.log(ret);
    }
})