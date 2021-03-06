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
                //可以多次绑定同一个事件名的事件
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
                    //在执行时可能会传参
                    ele.apply(self, params)
                });
            }
        }
    }
    
    jQuery.prototype.myQueue = function () {
        var queueObj = this;//调用该方法的对象
        //根据传入的参数来看
        var queueName = arguments[0] || 'fx';
        var addFunc = arguments[1] || null;
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
        //拿完第一个之后就变成了新数组
        var currFunc = queueArr.shift();//拿出数组中的第一个元素(该元素不一定是什么类型的)
        if (currFunc == undefined) {
            return;
        }
        var next =  function () {
            //回调函数
            self.myDequeue(queueName);
        }
        currFunc(next);//函数执行，为了取到数组中的第一个元素
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
        var baseFunc = function (next) {//将其添加到队列中
            var times = 0;//用它判断什么时候才能到达目标点
            for (var i = 0; i < len; i++) {
                //self[i]--->每一个dom
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


    jQuery.prototype.init.prototype = jQuery.prototype;


    window.$ = window.jQuery = jQuery;
})();