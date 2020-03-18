var game = {
    el: null,
    main: null,
    startBtn: null,
    num: 0,
    init() {
        this.initData();
        this.startGame();
    },
    initData() {
        this.el = document.getElementsByClassName("container")[0];
        this.main = document.getElementsByClassName("main")[0];
        this.startBtn = document.getElementsByTagName("a")[0];
    },
    start() {
        var go = document.getElementsByClassName("game")[0];
        go.style.display = "none";
    },
    createEle() {
        var row = document.createElement("div");
        row.className = 'row';
        var randomNum = Math.floor(Math.random() * 4);
        for (var i = 0; i < 4; i++) {
            var div = document.createElement("div");
            row.appendChild(div);
        }
        var box = row.children[randomNum];
        // console.log(box);
        // console.log(row.children)
        box.setAttribute("class", 'i');
        box.style.backgroundColor = "#000";
        if (this.el.children.length == 0) {
            this.el.appendChild(row);
        } else {
            this.el.insertBefore(row, this.el.children[0]);
        }
    },
    move() {
        var step = 5;
        this.timer = setInterval(() => {
            // this.createEle()
            this.el.style.top = this.el.offsetTop + step + "px";
            if (this.el.offsetTop >= 0) {
                this.createEle();
                this.el.style.top = "-150px"
            }
            this.checkDiv()
        }, 100);
    },
    handle() {
        this.el.onclick = e => {
            // console.log(e.target)
            var target = e.target;
            this.changeDom(target);
        }
    },
    changeDom(tar) {
        if (tar.className == 'i') {
            tar.style.backgroundColor = "#ddd";
            tar.addClassName = '';
            this.num++;
        } else {
            this.overGame();
        }
    },
    checkDiv() {
        var length = this.el.children.length;
        // var arr = this.el.children[length - 1].children;
        // var lastEle = this.el.children[length - 1];
        if (length == 6) {
            for (var i = 0; i < length; i++) {
                console.log((this.el.children[length - 1]).children[i])
                // if ((this.el.children[length - 1]).children[i].contains('i')) {
                //     this.overGame();
                //     console.log(0)
                // } else {
                //     this.num++;
                //     lastEle.remove()
                // }
            }
        }
    },
    startGame() {
        this.startBtn.onclick = () => {
            this.start();
            // this.createEle()
            this.move();
            this.handle();
        }
    },
    overGame() {
        clearInterval(this.timer);
        alert("游戏结束！，得分为：" + this.num);
        this.el.onclick = null;
    }
}

game.init();