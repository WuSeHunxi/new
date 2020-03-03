
$('div').on('read',function(){

})


jQuery.prototype.on = function (type, handle) {//type-->自定义的事件类型 handle-->事件处理函数
    for (var i = 0; i < this.length; i++) {
        if (!this[i].cacheEvent) {
            this[i].cacheEvent = {};//type:handle
        }
        if (!this[i].cacheEvent[type]) {                        
            this[i].cacheEvent[type] = [handle];//属性=值
        }else {
            this[i].cacheEvent[type].push(handle);
        } 
    }
}

//trigger的第二个参数是数组的形式
jQuery.prototype.trigger = function (type) {
    // [].slice.call(arguments, 1)的意思是arguments.slice(1)--->将参数从第一位截取(返回数组中的某一段)
    var params = arguments.length > 1 ? [].slice.call(arguments, 1) : [];
    var self = this;
    for (var i = 0; i < this.length; i++) {
        if( this[i].cacheEvent[type] ) {                        
            this[i].cacheEvent[type].forEach(function (ele, index) {
                //事件函数里面的this谁调用的就是谁
                ele.apply(self, params);
            }); 
        }
    }
}
