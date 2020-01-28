//游戏全局配置
var gameConfig = {
    width: 640, //游戏面板的宽度
    maxSpeed: 1000, //跳跃最大速度
    minSpeed: 300 //跳跃最小速度
}

//大地
var land = {
    left: 0, //横坐标
    dom: document.querySelector(".land"), //对应的dom元素
    //移动方法，distance：向左移动的距离， duration：移动的时间（秒）
    move: function (distance, duration) {
        //如果没有动画
        this.left -= distance;
        this.dom.style.marginLeft = this.left + "px";
        this.dom.style.transition = duration + "s linear"; //让css的变化有一个过渡过程
        var that = this;
        setInterval(function () {
            //移动结束了--->通过取余的方法解决土地不够的情况
            that.left = that.left % gameConfig.width;
            that.dom.style.marginLeft = that.left + "px";
            //取消过渡--->土地往回运动的时候不需要过渡了
            that.dom.style.transition = "";
        }, duration * 1000)
    }
};

//蓄力条
var bar = {
    dom: document.querySelector(".bar-content"),
    width: 0, //宽度百分比
    timer: null, //蓄力计时器的id
    start: function () { //开始蓄力
        //防止叠加蓄力
        if (this.timer) {
            //正在蓄力中。。。。
            return;
        }
        var dis = 2; //每次改变2%的宽度
        var that = this;
        this.timer = setInterval(function () {
            //每隔16毫秒，改变一点点宽度
            that.width += dis;
            //在两边的边界宽度需要进行处理
            if (that.width >= 100) {
                dis = -dis;
                that.width = 100;
            }
            else if (that.width <= 0) {
                dis = -dis;
                that.width = 0;
            }
            that.dom.style.width = that.width + "%";
        }, 16);
    },
    stop: function () {//停止蓄力
        clearInterval(this.timer);
        this.timer = null;
    },
    clear: function () {//清空蓄力条
        this.width = 0;
        this.dom.style.width = this.width + "%";
    }
}

//土豆
var tudou = {
    dom: document.querySelector(".tudou"),
    //y轴向下为正方向
    maxTop: 466, //最大纵坐标
    top: 466,//记录土豆的纵坐标
    timer: null, //计时器的id
    rotate: 0, //目前旋转的角度
    // v： 表示向上的速度，该速度单位是“像素/秒”，而且，向上的速度是负数
    jump: function (v) { //跳，实际上就是给一个向上的速度
        if (this.timer) {
            return; //已经在跳了
        }
        var that = this;

        //利用到物理学的运动公式因此需要用到a和t

        var a = 2000; //向下的加速度: 像素/秒²
        var t = 0.016; //每次运动的时间（秒）

        /**
         * 物体移动距离 = vt + 1/2at²
           物体移动后的速度 = gt + v
           上抛落地时间 = 2v / g 
         */

        var time = 2 * Math.abs(v) / a; // 运动总时间（秒）

        this.dom.style.transition = "transform " + time + "s linear";
        //旋转
        this.rotate += 90;
        this.dom.style.transform = "rotate(" + this.rotate + "deg)"

        //大地跟着移动--->大地运动的速度是实际测出来的
        var horV = Math.abs(v / 2);//横向速度
        var horDis = horV * time;  //横向移动距离
        land.move(horDis, time);

        this.timer = setInterval(function () {
            //每隔16毫秒，改变一次top值---传入的速度是负值
            var dis = v * t + 0.5 * a * t * t; //每次运动的距离
            that.top += dis;

            //这一段距离运动完了之后，新的速度（下一段的初速度）
            v = a * t + v;
            //限制纵坐标的最大值
            if (that.top >= that.maxTop) {
                that.top = that.maxTop;
                //落地了，清空计时器
                clearInterval(that.timer);
                that.timer = null;
                bar.clear();//蓄力条清空
            }

            that.dom.style.top = that.top + "px"; //更新dom对象
        }, t * 1000)
    }
}

//事件
window.onmousedown = function () {
    //蓄力
    bar.start();
}

window.onmouseup = function () {
    bar.stop();
    //跳
    var v = bar.width / 100 * (gameConfig.maxSpeed - gameConfig.minSpeed)  +  gameConfig.minSpeed;
    console.log(v);
    tudou.jump(-v);
}