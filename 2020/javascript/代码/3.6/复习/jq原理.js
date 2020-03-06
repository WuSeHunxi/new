
var cb=$.Callbacks('once');
cb.add(a,b,c);
cb.fired('la');

$.Callbacks=function(){
    var options=arguments[0]||'';
    var list=[];
    var index=0;
    var args;
    var fired=false;
    var fire=function(){
        for(;index<list.length;index++){
            list[index].apply(window,args);
        }
        if(options.indexOf('once')!=-1){
            index=0;
            list=[];
        }
    }
    return {
        add:function(addFunc){
            if(options.indexOf('memory')!=-1&&fired){
                fire();
            }
            list.push(addFunc);
        },
        fire:function(){
            args=arguments;
            index=0;
            list=[];
            fired=true;
            fire();
        }
    }
}


$.Deferred=function(){
    var arr=[
        [jQuery.myCallbacks('once memory'),'done','resolve'],
        [jQuery.myCallbacks('once memory'),'fail','reject'],
        [jQuery.myCallbacks('memory'),'progress','notify']
    ];
    var df={};
    var pedding=true;

    for(var i=0;i<arr.length;i++){
        // df.done(function(){})
        df[arr[i][1]]=(function(index){
            return function(func){
                //参数就是函数
                arr[index][0].add(func);
            }
        }(i));

        //df.resolve('oo')
        df[arr[i][2]]=(function(){
            return function(args){
                if(pedding){
                    arr[i][0].fire.apply(window,args);
                    arr[i][2]='resolve';
                    pedding=false;
                }else{
                    arr[i][0].fire.apply(window,args);
                    arr[i][2]='reject';
                    pedding=true;
                }
            }
        }(i))
    }
}