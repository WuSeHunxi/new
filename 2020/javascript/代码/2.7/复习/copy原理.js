

jQuery.myCallbacks=function(){
    //参数
    var options=arguments[0]||'';
    //函数执行的顺序表--->当有多个函数能够同时执行的话，那么一定是将函数放在数组中依次调用
    var list=[];
    //当前执行函数的索引
    var fireIndex=0;
    //fire执行时传入的参数
    var args=[];
    //是否执行过--->拥有记忆功能的话，直接添加就能够执行
    fired=false;

    var fire=function(){
        for(;fireIndex<list.length;fireIndex++){
            list[fireIndex].apply(window,args);
        }
        if(options.indexOf('once')!=-1){
            list=[];
            fireIndex=0;
        }
    }

    //返回对象
    return {
        add:function(func){
            list.push(func);
            if(options.indexOf("memory")!=-1&&fired){
                fire();
            }
            //返回对象，进行链式操作
            return this;//this-->{add: ƒ, fire: ƒ}
        },
        //每次fire都会重新执行一遍
        fire:function(){
            fireIndex=0;//重新执行回调函数
            args=arguments;
            fired=true;
            fire();
        }
    }
} 


jQuery.myDeferred=function(){
    //创建回调函数
    var arr=[
        [jQuery.myCallbacks('once memory'),'done','resolve'],
        [jQuery.myCallbacks('once memory'),'fail','reject'],
        [jQuery.myCallbacks('memory'),'progress','notify']
    ];
    var df={};//向该对象中添加回调函数
    var pendding=true;
    
    for(var i=0;i<arr.length;i++){
        df[arr[i][1]]=(function(index){
            return function(func){
                arr[index][0].add(func);
            }
        }(i));

        df[arr[i][2]]=(function(index){
            return function(){
                var args=arguments;
                //此两种情况只能执行一次
                if(pendding){
                    //fire()-->函数执行，可以传递参数
                    arr[index][0].fire.apply(window,args);
                    arr[index][2]=='resolve'||arr[index][2]=='reject'?pendding=false:'';
                }
            }
        }(i))

    }
}