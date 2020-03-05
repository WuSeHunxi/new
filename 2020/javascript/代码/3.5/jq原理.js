

$.Callbacks=function(){
    var options=arguments[0]|'';
    var list=[];
    var index=0;
    var fired=false;
    var fire=function(){
        for(;index<list.length;index++){
            list[index].call(window,args);
        }
        if(options.indexOf('once')>0){
            list=[];
        }
    }
    return {
        add:function(addFunc){
            list.push(addFunc);
            if(options.indexOf('memory')!=-1&&fired){
                fire();
            }
            return this;
        },
        fire:function(){
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
        df[arr[i][1]]=(function(index){
            return function(func){
                arr[i][0].add(func)
            }
        }(i));

        df[arr[i][2]]=(function(index){
            return function(){
                var agrs=arguments;
                if(pedding){
                    arr[index][0].fire.apply(window,args);
                    arr[index][2]=='resolve'||arr[index][2]=='reject'?pedding=false:'';
                }
            }
        }(i))
    }

}