var pokers = [];//扑克牌的数组
var Poker = require("./porker");
var util = require("./util")

for (var i = 0; i <= 13; i++) {
    for (var j = 0; j <= 4; j++) {
        pokers.push(new Poker(j, i))
    }
}

pokers.push(new Poker(null, 14), new Poker(null, 15));
util.sortRandom(pokers)

var player1 = pokers.slice(0, 17);
var player2 = pokers.slice(17, 34);
var player3 = pokers.slice(34, 51);

var desk = pokers.slice(51);

console.log("玩家1：")
util.print(player1);

console.log("玩家2：")
util.print(player2);

console.log("玩家3：")
util.print(player3);

console.log("桌面：")
util.print(desk);