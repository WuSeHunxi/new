class Person {

    [Symbol.toStringTag] = "Person"
}

const p = new Person();

const arr = [32424, 45654, 32]

/***
 * 在js中，toString()方法在处理Number类型的值时情况是特殊的。
 * 想要判断某个对象值属于哪种内置类型,最靠谱的做法就是通过Object.prototype.toString方法.
 */

console.log(Object.prototype.toString.apply(p));
console.log(Object.prototype.toString.apply(arr))