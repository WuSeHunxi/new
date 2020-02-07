

jQuery.myCallbacks = function () {
    // 'once' 'memory' 'once memory' null
    // 存储参数
    var options = arguments[0] || '';
    // 存储通过add 来加入的方法
    var list = [];

    // 记录当前要执行的函数的索引
    var fireIndex = 0;//fire执行

    // 记录是否有被fire过
    var fired = false;

    // 实际参数列表--->fire执行的时候需要传参
    var args = [];
    
    var fire = function () {
        //初始化的条件在前面  列表中有几个回调函数就执行几次
        for (; fireIndex < list.length; fireIndex++) {
            //函数执行的时候需要传参，但是参数不固定，因此需要使用apply方法中的第二个参数不固定的特征
            list[fireIndex].apply(window, args);
        }
        if (options.indexOf('once') != -1) {
            list = [];
            fireIndex = 0;//为了能够使相同函数多次执行，因此需要使索引遍历一遍完成后归0
        }
    }


    return {
        add: function (func) {
            list.push(func);
            //记忆功能--->后添加的也能被fire
            if (options.indexOf('memory') != -1 && fired) {
                fire();
            }
            return this;
        },
        fire: function () {
           fireIndex = 0;
           args = arguments;
           fired = true;
           fire();
        }
    }
}


jQuery.myDeferred = function () {
    // callback 
    // 3个callback
    // done resolve    fail reject     progress notify
    //三个Callbacks对象
    var arr = [
        [
            //once--->代表的就是只能执行一次 memory--->表示的是新注册的回调函数也能够执行
            jQuery.myCallbacks('once memory'), 'done', 'resolve'
        ],[
            jQuery.myCallbacks('once memory'), 'fail', 'reject'
        ],[
            jQuery.myCallbacks('memory'), 'progress', 'notify'
        ]
    ];

    var pendding = true;

    var deferred = {};//创建一个deferred对象，并在该对象上添加方法

    //给deffer添加属性
    for (var i = 0; i < arr.length; i++) {
        // arr[0][1]

        // 注册
        // deferred['done'] = function () {}
        // deferred['fail'] = function () {}
        // deferred['progress'] = function () {}
        deferred[ arr[i][1] ] = (function (index) {
            //立即执行函数执行完返回一个方法，构造符合注册构造函数的方法
            return function (func) {
                //回调对象的add方法
                arr[index][0].add(func)//在这里发生了闭包，因此使用了立即函数来解决
            }
        })(i);//使用立即执行函数解决闭包


        // 触发
        // deferred['resolve'] = function () {}
        // deferred['reject'] = function () {}
        // deferred['notify'] = function () {}

        //同样的方法处理闭包     立即执行函数执行完之后要返回一个函数
        deferred[ arr[i][2] ] =  (function (index) {
           return function () {
                var args = arguments;
                if (pendding) {
                    arr[index][0].fire.apply(window, args);
                    //如果是resolve或者是reject都不能再继续执行了
                    arr[index][2] == 'resolve' || arr[index][2] == 'reject' ? pendding = false : '';
                }
                
           }
        })(i);
    }


    return deferred;
}