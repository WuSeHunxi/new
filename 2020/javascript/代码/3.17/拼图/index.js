//利用对象完成编程
Puzzle.prototype = {
    init() {//在该函数中调用功能
        this.initData();
        this.render();
        this.handle();
    },
    initData() {
        this.puzzle = document.createElement("div");
        this.puzzle.style.width = this.width + "px";
        this.puzzle.style.height = this.height + "px";
        this.puzzle.className = "puzzle";
        this.imgPositionArr = this.getImagePosition();
        this.randArr = this.getRandomPosition();
    },
    getImagePosition() {
        //得到一个装着图片背景的位置的数组
        var arr = [];
        var width = this.width / this.row;
        var height = this.height / this.col;
        for (var i = 0; i < this.row; i++) {
            for (var j = 0; j < this.col; j++) {
                arr.push({
                    x: j * width,
                    y: i * height
                });
            }
        }
        return arr;
    },
    getRandomPosition() {
        var newArr = [];
        for (var i = 0; i < this.imgPositionArr.length; i++) {
            newArr[i] = this.imgPositionArr[i];
        }
        var lastEle = newArr[this.imgPositionArr.length - 1];
        newArr.length = this.imgPositionArr.length - 1;
        //打乱数组
        newArr.sort(function () {
            return Math.random() - 0.5;
        })
        newArr.push(lastEle);
        console.log(newArr)
        return newArr;
    },
    render() {
        this.el.appendChild(this.puzzle);
        var length = this.row * this.col;
        for (var i = 0; i < length; i++) {
            this.block = document.createElement("div");
            this.block.className = "block";
            this.block.style.width = this.width / this.col + "px";
            this.block.style.height = this.height / this.row + "px";
            this.block.style.backgroundImage = "url(" + this.img + ")";
            this.block.style.backgroundPosition = -this.imgPositionArr[i].x + "px " + -this.imgPositionArr[i].y + "px";
            this.block.style.left = this.randArr[i].x + "px";
            this.block.style.top = this.randArr[i].y + "px";
            this.puzzle.appendChild(this.block);
            if (i == length - 1) {
                this.block.setAttribute('ref', 'empty');
            }
        }
        var empty = document.querySelector("div[ref='empty']");
        empty.style.opacity = '0';
    },
    handle() {
        var self = this;
        this.puzzle.onclick = function (e) {
            var dom = e.target;
            if (dom.className == 'block') {
                self.handleClick(dom);
            } else {
                return;
            }
        }
    },
    handleClick(dom) {
        var canMove = this.checkMove(dom);
        if (!canMove) {
            return;
        }
        this.moveBlock(dom);
        this.gameResult();
    },
    checkMove(dom) {
        var empty = document.querySelector("div[ref='empty']");
        var blockRow = Math.round(this.getIndex(dom).row);
        var blockCol = Math.round(this.getIndex(dom).col);
        var emptyRow = Math.round(this.getIndex(empty).row);
        var emptyCol = Math.round(this.getIndex(empty).col);
        // console.log(emptyCol)
        if (blockCol == emptyCol && Math.abs(blockRow - emptyRow) == 1 || blockRow == emptyRow && Math.abs(blockCol - emptyCol) == 1) {
            return true;
        }
    },
    getIndex(dom) {
        var row = dom.offsetLeft / (this.width / this.row);
        var col = dom.offsetTop / (this.height / this.col);
        return {
            row: row,
            col: col
        }
    },
    moveBlock(dom) {
        var blockLeft = dom.style.left;
        var blockTop = dom.style.top;
        var empty = document.querySelector("div[ref='empty']");
        var emptyLeft = empty.style.left;
        var emptyTop = empty.style.top;
        dom.style.left = emptyLeft;
        dom.style.top = emptyTop;
        empty.style.left = blockLeft;
        empty.style.top = blockTop;
        //二者有的时候不相等
        // console.log(dom.style.left, dom.offsetLeft)
    },
    gameResult() {
        var isWin = true;
        var blockList = document.getElementsByClassName("block");
        for (var i = 0; i < blockList.length; i++) {
            var block = blockList[i];
            var blockLeft = parseInt('-' + block.style.left);
            var blockTop = parseInt('-' + block.style.top);
            var blockImageLeft = parseInt(block.style.backgroundPositionX);
            var blockImageTop = parseInt(block.style.backgroundPositionY);
            console.log(blockLeft, blockImageLeft)
            if (!(blockLeft === blockImageLeft && blockTop === blockImageTop)) {
                isWin = false;
                break;
            }
        }
        if (isWin) {
            this.winGame()
        }
    },
    winGame() {
        this.puzzle.onclick = null;
        console.log(0)
        var empty = document.querySelector("div[ref='empty']");
        setTimeout(function () {
            alert("你赢了~");
            empty.style.opacity = '1';
        }, 300);
    }
}

function Puzzle(options) {
    this.el = options.el;
    this.row = options.data.row;
    this.col = options.data.col;
    this.width = options.data.width;
    this.height = options.data.height;
    this.img = options.data.img;
    this.init();
}