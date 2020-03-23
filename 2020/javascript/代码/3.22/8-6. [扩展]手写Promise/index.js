const MyPromise = (() => {
    const PENDING = "pending",
        RESOLVED = "resolved",
        REJECTED = "rejected",
        PromiseValue = Symbol("PromiseValue"),
        PromiseStatue = Symbol("PromiseStatus"),
        thenables = Symbol("thenables"),
        catchables = Symbol("catchbles"),
        changeStatus = Symbol("changeStatus"),
        settleHandle = Symbol("settHandle"),
        linkPromise = Symbol("linkPromise");

    //状态完事之后就要进行后续处理了

    return class MyPromise {

        [changeStatus](newStatus, newValue, queue) {
            if (this[PromiseStatue] !== PENDING) {
                return;
            }
            this[PromiseStatue] = newStatus;
            this[PromiseValue] = newValue;

            queue.forEach(handler => {//handle是forEach中的每一项
                handler(newValue);
            });
        }

        constructor(exector) {
            this[PromiseStatue] = PENDING;
            this[PromiseValue] = undefined;
            this[thenables] = [];
            this[catchables] = [];

            const resolve = (data) => {
                this[changeStatus](RESOLVED, data, this[thenables]);
            }

            const reject = (err) => {
                this[changeStatus](REJECTED, err, this[catchables]);
            }

            try {
                exector(resolve, reject);
            } catch{
                reject(err);
            }
        }

        [settleHandle](handler, immediatelyStatus, queue) {
            if (typeof handler != "function") {
                return;
            }
            if (immediatelyStatus === this[PromiseStatue]) {
                setTimeout(() => {
                    handler(this[PromiseValue]);
                }, 0);
            } else {
                queue.push(handler)
            }
        }

        [linkPromise](thenable, catchable) {
            return new MyPromise((resolve, reject) => {
                this[settleHandle](data => {
                    const result = thenable(data);
                    resolve(result);
                }, RESOLVED, this[thenables])

                this[settleHandle](err => {
                    const result = catchable(err);//上一个Promise的后续处理函数
                    resolve(result);//该处的原理就是这么写的
                }, REJECTED, this[catchables])
            })
        }

        //在then的时候将函数加入队列
        then(thenable, catchable) {//thenables和catchables是在使用的时候传入的参数
            this[settleHandle](thenable, RESOLVED, this[thenable])//this[thenables]是函数队列
            this.catch(catchable);
            //需要返回新的Promise
        }

        catch(catchable) {
            this[settleHandle](catchable, REJECTED, this[catchable])
        }
    }
})