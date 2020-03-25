class MySet {
    //在创建的时候可以传参也可以不传参，因此传入的参数利用了参数的默认值
    constructor(iterator = []) {
        //验证是否是可迭代的对象  直接判断属性是不是Symbol.iterator函数
        if (typeof iterator[Symbol.iterator] !== "function") {
            throw new TypeError(`你提供的${iterator}不是一个可迭代的对象`)
        }
        this._datas = [];
        for (const item of iterator) {
            this.add(item);//创建的时候就是内部的添加
        }
    }

    get size() {//不需要写括号就能够读取
        return this._datas.length;
    }

    add(data) {
        if (!this.has(data)) {
            this._datas.push(data);
        }
    }

    has(data) {
        for (const item of this._datas) {
            if (this.isEqual(data, item)) {
                return true;
            }
        }
        return false;
    }

    delete(data) {
        for (let i = 0; i < this._datas.length; i++) {
            const element = this._datas[i];
            if (this.isEqual(element, data)) {
                //删除  相同的话就删除
                this._datas.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    clear() {//直接数组的长度为0，清空数组
        this._datas.length = 0;
    }

    //Set是一个可迭代的对象，因此需要有Symbol.iterator属性
    *[Symbol.iterator]() {
        for (const item of this._datas) {
            yield item;
        }
    }

    //forEach的参数是一个回调函数
    forEach(callback) {
        for (const item of this._datas) {
            callback(item, item, this);//此处的回调函数用的妙啊~~~
        }
    }

    /**
     * 判断两个数据是否相等
     * @param {*} data1 
     * @param {*} data2 
     */
    isEqual(data1, data2) {
        if (data1 === 0 && data2 === 0) {
            return true;
        }
        return Object.is(data1, data2);
    }
}