import { playerMove, isWin } from "./play.js"
import showUI from "./ui.js"

showUI();
var over = false//游戏结束之后按键就不能再继续反应了
//完成整个游戏

window.onkeydown = function (e) {
    if (over) {
        return;
    }
    var result = false;
    if (e.key === "ArrowUp") {
        result = playerMove("up");
    }
    else if (e.key === "ArrowDown") {
        result = playerMove("down")
    }
    else if (e.key === "ArrowLeft") {
        result = playerMove("left")
    }
    else if (e.key === "ArrowRight") {
        result = playerMove("right")
    }

    if (result) {
        showUI();
        if (isWin()) {
            console.log("游戏胜利！");
            over = true;
        }
    }
}