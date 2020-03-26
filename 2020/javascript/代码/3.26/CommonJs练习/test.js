var util = require("./util")

var arr = [1, 2, 4, 5, 6, 1, 6];

util.sortRandom(arr);
console.log(arr)

var Poker = require("./porker");
var p = new Poker(1, 11);
console.log(p.toString());