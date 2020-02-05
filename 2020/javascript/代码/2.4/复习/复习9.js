jQuery.prototype.myQueue = function () {
    var queueObj = this;
    //根据传入的参数来看
    var queueName = arguments[0] || 'fx';
    var addFunc = arguments[1] || null;//将它放在对应的数组之中
    var len = arguments.length;

    // 获取队列
    if (len == 1) {
        return  queueObj[0][queueName];
    }
    //queueObj[0]--->是一个对象
    // queue dom {chain: } 添加队列 或 往已有队列中添加内容
    //判断在queueObj[0]这个对象中是否有queueName名字的队列
    queueObj[0][queueName] == undefined ? queueObj[0][queueName] = [addFunc] : queueObj[0][queueName].push(addFunc);
    return this;
}

//全部都出队的方法
jQuery.prototype.myDequeue = function (type) {
    var self = this;
    var queueName = arguments[0] || 'fx';//队列名称
    var queueArr = this.myQueue(queueName);//取队列数组
    var currFunc = queueArr.shift();//拿出数组中的第一个元素(该元素不一定是什么类型的)
    if (currFunc == undefined) {
        return;
    }
    var next =  function () {
        //回调函数 出队函数
        self.myDequeue(queueName);
    }
    currFunc(next);//函数执行，为了取到数组中的第一个元素
    return this;
}