
const obj = {
    a: 1,
    b: 2,
    [Symbol.for("c")]: 3
}

console.log(obj[Symbol.for("c")]);

const s1 = Symbol.for("1");
const a2 = Symbol.for("1");
console.log(s1 === a2);//true 

