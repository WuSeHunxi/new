(function () {
    function jQuery (selector) {
        return new jQuery.prototype.init(selector);
    }
    jQuery.prototype.init = function (selector) {
        // this = {};
        // 选出 dom 并且包装成jQuery对象  返回
        // id class
        this.length = 0;
        // null undefined dom
        if (selector == null) {
            return this;
        }

        if (typeof selector == 'string' && selector.indexOf('.') != -1) {
            var dom = document.getElementsByClassName( selector.slice(1) );
        }else if (typeof selector == 'string' && selector.indexOf('#') != -1) {
            var dom = document.getElementById( selector.slice(1) );
        }

        if (selector instanceof Element || dom.length == undefined) {
            this[0] = dom || selector;
            this.length++;
        }else {
            // 基础铺垫
            for (var i = 0; i < dom.length; i++) {
                this[i] = dom[i];
                this.length++
            }
        }
        // return this;
    }

    jQuery.prototype.css = function (config) {
        // 循环操作每一个dom
        // 循环操作
        for (var i = 0; i < this.length; i++) {
            for (var attr in config) {
                this[i].style[attr] = config[attr];
            }
        }

        // 链式操作
        return this;
    }

    jQuery.prototype.pushStack = function (dom) {
        // dom newObj
        if (dom.constructor != jQuery) {
            dom = jQuery(dom);
        }
        dom.prevObject = this;
        return dom;
    }


    jQuery.prototype.get = function (num) {
        return num != null ? (num >= 0 ? this[num] : this[num + this.length]) : [].slice.call(this, 0);
    }

    jQuery.prototype.eq = function (num) {
        var dom = num != null ? (num >= 0 ? this[num] : this[num + this.length]) : null;
        return this.pushStack(dom);
    }

    jQuery.prototype.add = function (selector) {
        var curObj = jQuery(selector);
        var baseObj = this;
        var newObj = jQuery();

        for (var i = 0; i < curObj.length; i++) {
            newObj[newObj.length++] = curObj[i];
        }
        for (var i = 0; i < baseObj.length; i++) {
            newObj[newObj.length++] = baseObj[i];
        }

        console.log(newObj);

        this.pushStack(newObj);

        return newObj;
    }

    jQuery.prototype.end = function () {
        return this.prevObject;
    }


    jQuery.prototype.myOn = function (type, handle) {
        for (var i = 0; i < this.length; i++) {
            if (!this[i].cacheEvent) {
                this[i].cacheEvent = {};
            }
            if ( !this[i].cacheEvent[type] ) {
                this[i].cacheEvent[type] = [handle];
            }else {
                this[i].cacheEvent[type].push(handle);
            }
        }
    }

    jQuery.prototype.myTrigger = function (type) {
        var params = arguments.length > 1 ? [].slice.call(arguments, 1) : [];
        var self = this;
        for (var i = 0; i < this.length; i++) {
            if ( this[i].cacheEvent[type] ) {
                this[i].cacheEvent[type].forEach(function (ele, index) {
                    ele.apply(self, params)
                });
            }
        }
    }

    jQuery.prototype.myQueue = function () {
        var queueObj = this;
        var queueName = arguments[0] || 'fx';
        var addFunc = arguments[1] || null;
        var len = arguments.length;

        // 获取队列
        if (len == 1) {
            return  queueObj[0][queueName];
        }

        // queue dom {chain: } 添加队列 或 往已有队列中添加内容
        queueObj[0][queueName] == undefined ? queueObj[0][queueName] = [addFunc] : queueObj[0][queueName].push(addFunc);
        return this;
    }

    jQuery.prototype.myDequeue = function (type) {
        var self = this;
        var queueName = arguments[0] || 'fx';
        var queueArr = this.myQueue(queueName);
        var currFunc = queueArr.shift();
        if (currFunc == undefined) {
            return;
        }
        var next =  function () {
            self.myDequeue(queueName);
        }
        currFunc(next);
        return this;
    }

    jQuery.prototype.myDelay = function (duration) {
        var queueArr = this[0]['fx'];
        queueArr.push(function (next) {
            setTimeout(function () {
                next();
            }, duration);
        });
        return this;
    }


    jQuery.prototype.myAnimate = function (json, callback) {
        var len = this.length;
        var self = this;
        // 最后添加到队列里的内容函数

        var baseFunc = function (next) {
            var times = 0;
            for (var i = 0; i < len; i++) {
                startMove(self[i], json, function () {
                    times++;
                    if (times == len) {
                        callback && callback();
                        next();
                    }
                });
            }
        }        

        this.myQueue('fx', baseFunc);

        if ( this.myQueue('fx').length == 1 ) {
            this.myDequeue('fx');
        }


        function getStyle (obj, attr) {
            if (obj.currentStyle) {
                return obj.currentStyle[attr];
            }else {
                return window.getComputedStyle(obj,false)[attr];
            }
        }
                
        function startMove (obj, json, callblack) {
            clearInterval(obj.timer);
            var iSpeed;
            var iCur;
            var name;
            obj.timer = setInterval(function () {
                var bStop = true;
                for (var attr in json) {                            
                    if (attr === 'opacity') {                                
                        name = attr;
                        iCur = parseFloat(getStyle(obj, attr)) * 100;
                    }else {
                        iCur = parseInt(getStyle(obj, attr));
                    }                            
                    iSpeed = (json[attr] - iCur) / 7;
                    if (iSpeed > 0) {
                        iSpeed = Math.ceil(iSpeed);
                    }else {
                        iSpeed = Math.floor(iSpeed);
                    }
                    if (attr === 'opacity') {
                        obj.style.opacity = (iCur + iSpeed) / 100;
                    }else {
                        obj.style[attr] = iCur + iSpeed + 'px';
                    }
                    if (json[attr] - iCur !== 0) {
                        bStop = false;
                    }
                }
                if (bStop) {
                    clearInterval(obj.timer);
                    callblack();
                }
            }, 30);
        }

        return this;   
    }



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
                console.log(this);
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
    

    jQuery.prototype.init.prototype = jQuery.prototype;
    window.$ = window.jQuery = jQuery;
})();