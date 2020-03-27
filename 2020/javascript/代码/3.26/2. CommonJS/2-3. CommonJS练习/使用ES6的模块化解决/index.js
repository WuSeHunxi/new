import { Poker } from "./poker.js"
import util from "./util.js";

let pokers = [];
for (var i = 1; i <= 13; i++) {
    for (var j = 1; j <= 4; j++) {
        pokers.push(new Poker(j, i))
    }
}
pokers.push(new Poker(null, 14), new Poker(null, 15))

util.sortRandom(pokers);

let player1 = pokers.slice(0, 17);
let player2 = pokers.slice(17, 34);
let player3 = pokers.slice(34, 51);
let desk = pokers.slice(51);

console.log("玩家1：")
util.print(player1);

console.log("玩家2：")
util.print(player2);

console.log("玩家3：")
util.print(player3);

console.log("桌面：")
util.print(desk);