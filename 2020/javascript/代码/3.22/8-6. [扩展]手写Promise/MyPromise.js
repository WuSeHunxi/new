const MyPromise = (() => {
    //将内容放在立即执行函数中
    const PENDING = "pending",
        RESOLVED = "resolved",
        REJECTED = "rejected",//这行以上的状态都是上一个Promise的状态
        PromiveValue = Symbol("PromiseValue"), //状态数据
        PromiseStatus = Symbol("PromiseStatus"),
        thenables = Symbol("thenables"), //thenable
        catchables = Symbol("catchbles"), //catchables
        changeStatus = Symbol("changeStatus"),//当前状态
        settleHandle = Symbol("settleHandle"), //后续处理的通用函数
        linkPromise = Symbol("linkPromise");  //创建串联的Promise

    return class MyPromise {

        /**
         * 改变当前Promise的状态
         * @param {*} newStatus 
         * @param {*} newValue 
         * @param {*} queue 执行的作业队列
         */
        [changeStatus](newStatus, newValue, queue) {
            if (this[PromiseStatus] !== PENDING) {
                //状态无法变更
                return;
            }
            this[PromiseStatus] = newStatus;
            this[PromiveValue] = newValue;
            //执行相应队列中的函数
            queue.forEach(handler => handler(newValue));//当状态发生变化的时候，需要执行相应队列里面的函数
        }

        /**
         * 
         * @param {*} executor 未决阶段（pending状态）下的处理函数
         */
        constructor(executor) {
            this[PromiseStatus] = PENDING;
            this[PromiveValue] = undefined;
            this[thenables] = []; //后续处理函数的数组 -> resolved
            this[catchables] = []; //后续处理函数的数组 -> rejected

            //改变状态
            const resolve = data => {
                this[changeStatus](RESOLVED, data, this[thenables]);
            }

            const reject = reason => {
                this[changeStatus](REJECTED, reason, this[catchables]);
            }
            try {
                executor(resolve, reject)
            }
            catch (err) {
                reject(err);
            }
        }

        /**
         * 处理 后续处理函数
         * @param {*} handler 后续处理函数(catchables或者是thenables)
         * @param {*} immediatelyStatus 需要立即执行的状态(resolved或者是reject)
         * @param {*} queue 作业队列
         */
        [settleHandle](handler, immediatelyStatus, queue) {
            //为了解决只传了then的第一个参数，没传第二个参数的情况
            if (typeof handler !== "function") {//err那个状态没有传参
                return;
            }
            if (this[PromiseStatus] === immediatelyStatus) {
                //直接运行 模拟加入微队列
                setTimeout(() => {
                    handler(this[PromiveValue]);
                }, 0);
            }
            else {
                queue.push(handler);
            }
        }

        //需要得到当前的处理函数，才能准确的判断到底是resolved还是rejected状态
        [linkPromise](thenalbe, catchable) {
            function exec(data, handler, resolve, reject) {
                try {
                    const result = handler(data); //得到当前Promise的处理结果
                    if (result instanceof MyPromise) {//如果当前的返回结果是Promise对象
                        result.then(d => {
                            resolve(d)
                        }, err => {
                            reject(err);
                        })
                    }
                    else {
                        resolve(result);
                    }
                }
                catch (err) {
                    reject(err);
                }
            }

            //正常使用形式
            return new MyPromise((resolve, reject) => {
                //必须得知道thenables和catchables什么时候执行才能确定新返回的Promise对象什么时候改变状态
                this[settleHandle](data => {
                    exec(data, thenalbe, resolve, reject);
                }, RESOLVED, this[thenables])

                this[settleHandle](reason => {
                    exec(reason, catchable, resolve, reject);
                }, REJECTED, this[catchables])
            })
        }

        then(thenable, catchable) {
            return this[linkPromise](thenable, catchable);
        }

        catch(catchable) {

            return this[linkPromise](undefined, catchable);
        }


        static all(proms) {
            return new Promise((resolve, reject) => {
                const results = proms.map(p => {
                    const obj = {
                        result: undefined,
                        isResolved: false
                    }
                    p.then(data => {
                        obj.result = data;
                        obj.isResolved = true;
                        //判断是否所有的全部完成
                        const unResolved = results.filter(r => !r.isResolved)
                        if (unResolved.length === 0) {
                            //全部完成
                            resolve(results.map(r => r.result));
                        }
                    }, reason => {
                        reject(reason);
                    })
                    return obj;
                })
            })
        }

        static race(proms) {
            return new Promise((resolve, reject) => {
                proms.forEach(p => {
                    p.then(data => {
                        resolve(data);
                    }, err => {
                        reject(err);
                    })
                })
            })
        }

        static resolve(data) {
            if (data instanceof MyPromise) {
                return data;
            }
            else {
                return new MyPromise(resolve => {
                    resolve(data);
                })
            }
        }

        static reject(reason) {
            return new MyPromise((resolve, reject) => {
                reject(reason);
            })
        }
    }
})();