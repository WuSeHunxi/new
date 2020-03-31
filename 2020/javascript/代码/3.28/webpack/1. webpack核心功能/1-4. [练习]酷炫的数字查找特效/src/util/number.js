import isPrime from "./isPrime"

export default class NumberTimer {

    constructor(duration = 500) {
        this.duration = duration;
        this.number = 1; //当前的数字
        this.onNumberCreated = null; //当一个数字产生的时候，要调用的回调函数
        this.timerId = null;
    }

    start() {
        if (this.timerId) {
            return;
        }
        this.timerId = setInterval(() => {
            //在一件事请完成后，要进行接下来的操作，通常需要使用回调函数（要使得功能更加通用）
            this.onNumberCreated && this.onNumberCreated(this.number, isPrime(this.number))
            this.number++;
        }, this.duration)
    }

    stop() {
        clearInterval(this.timerId);
        this.timerId = null;
    }
}