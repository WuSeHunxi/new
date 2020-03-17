function Puzzle(options) {
    this.el = options.el;
    this.width = options.data.width;
    this.height = options.data.height;
    this.row = options.data.row;
    this.col = options.data.col;
    this.img = options.data.img;
    this.init();
}

Puzzle.prototype = {
    init() {
        this.initData();
        this.render();
        this.handle()
    },
    initData() {
        this.dom = document.createElement("div");
        this.dom.style.width = this.width + "px";
        this.dom.style.height = this.height + "px";
        this.positionArr = this.getImagePosition();
        this.randomPosition = this.getRandomPosition()
    },
    getImagePosition() {
        var arr = [];
        var height = this.height / this.row;
        var width = this.width / this.col;
        for (var i = 0; i < this.row; i++) {
            for (var j = 0; j < this.col; j++) {
                arr.push({
                    x: j * width,
                    y: i * height
                })
            }
        }
        // console.log(arr);
        return arr;
    },
    getRandomPosition() {
        var newArr = [];
        for (var i = 0; i < this.positionArr.length; i++) {
            newArr[i] = this.positionArr[i];
        }

        var lastEle = newArr[this.positionArr.length - 1];
        newArr.length = this.positionArr.length - 1;
        newArr.sort(function () {
            return Math.random() - 0.5
        });
        newArr.push(lastEle);
        console.log(newArr)
        return newArr;
    },
    render() {
        var length = this.row * this.col;
        console.log(length)
        for (var i = 0; i < length; i++) {
            block = document.createElement("div");
            block.className = "block";
            block.style.height = this.width / this.row + "px";
            block.style.width = this.height / this.col + "px";
            block.style.left = this.randomPosition[i].x + "px";
            block.style.top = this.randomPosition[i].y + "px";
            block.style.backgroundImage = "url(" + this.img + ")";
            block.style.backgroundPosition = -this.positionArr[i].x + "px  " + -this.positionArr[i].y + "px";
            if (i == length - 1) {
                block.setAttribute('ref', 'empty');
            }
            this.dom.appendChild(block);
        }
        this.dom.className = "puzzle";
        this.el.appendChild(this.dom);
        var empty = document.querySelector("div[ref='empty']");
        empty.style.opacity = '0';
    },
    handle() {
        var self = this;
        this.dom = onclick = function (e) {
            var dom = e.target;
            if (dom.className == "block") {
                self.handleMore(dom);
            } else {
                return;
            }
        }
    },
    handleMore(dom) {
        var canmove = this.checkMove(dom);
        // if (!canmove) {
        // return;
        // }
        this.moveBlock(dom);
        this.isWin();//先判断是不是赢了然后才能进行游戏的结果处理
    },
    checkMove(dom) {
        var empty = document.querySelector("div[ref='empty']");
        var row = this.getIndex(empty).row;
        var col = this.getIndex(empty).col;
        var blockRow = this.getIndex(dom).row;
        var blockCol = this.getIndex(dom).col;
        return row == blockRow && Math.abs(col - blockCol) == 1 || col == blockCol && Math.abs(row - blockRow) == 1

    },
    getIndex(dom) {
        var row = Math.round(dom.offsetLeft / dom.offsetWidth);
        var col = Math.round(dom.offsetTop / dom.offsetHeight);
        return {
            row: row,
            col: col
        }
    },
    moveBlock(dom) {
        var blockLeft = dom.style.left;
        var blockTop = dom.style.top;
        console.log(blockTop)
        var empty = document.querySelector("div[ref='empty']");
        dom.style.left = empty.style.left;
        dom.style.top = empty.style.top;
        empty.style.left = blockLeft;
        empty.style.top = blockTop;
    },
    isWin() {
        var winGame = true;
        var blockList = document.getElementsByClassName("block");
        for (var i = 0; i < blockList.length; i++) {
            var block = blockList[i];
            var blockLeft = parseInt('-' + block.style.left);
            var blockTop = parseInt('-' + block.style.top);
            var blockImageLeft = parseInt(block.style.backgroundPositionX);
            var blockImageTop = parseInt(block.style.backgroundPositionY);
            console.log(blockLeft, blockImageLeft)
            if (!(blockLeft === blockImageLeft && blockTop === blockImageTop)) {
                winGame = false;
                break;
            }
        }
        if (winGame) {
            this.gameResult();
        }
    },
    gameResult() {
        this.dom.onclick = null;
        setTimeout(function () {
            alert("你赢了~~~");
            var empty = document.querySelector("div[ref='empty']");
            empty.style.opacity = 1;
        }, 300);
    }
}