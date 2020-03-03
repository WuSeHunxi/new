jQuery.prototype.queue = function () {
    var queueObj = this;
    // 默认队列名称 fx 是animate使用的队列
    var queueName = arguments[0] || 'fx';
        addFunc = arguments[1] || null;
        len = arguments.length;

        // 参数为1个 根据名称获取队列
        if (len == 1) {
            return queueObj[0][queueName];
        }

        // 原生jQuery 有同学问老师不是在dom上效率不高嘛
        // 这里主要是了解队列的机制， 真正内部实现使用Data的jQuery内的全局构造函数来缓存的
        //其实内部有一个id 
        // 最终也是需要使用原生dom作为标记的

        //队列赋值 赋值到dom的身上
        queueObj[0][queueName] != undefined ? queueObj[0][queueName].push(addFunc) :  queueObj[0][queueName] = [addFunc];
        return this;
}

jQuery.prototype.dequeue = function () {
    var self = this;
    var queueName = arguments[0] || 'fx';

    // 获取该DOM 对应的队列数组
    var queueArr = self.queue(queueName);

    //弹出数组中第一个函数
    var currfunc = queueArr.shift();

    if (currfunc == undefined) {
        return;
    };       

    // 获得next函数 该函数为递归dequeue
    var next = function () {
        self.dequeue(queueName);
    };
    currfunc(next);                
    return this;
}
