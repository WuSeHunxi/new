var solid = document.getElementsByClassName('solid')[0];
var btn = document.querySelectorAll('ol li');
var oUl = document.getElementsByClassName('oUl')[0];
var css = document.getElementsByTagName('style')[0];
var timer;

var timer, n = 0;
// 创建元素插入到ul中
function createDom() {
    var num = 100;
    var allWidth = solid.offsetWidth;
    var width = allWidth / num;
    // 创建一排li  每一个li中有4个div
    //li是容器,div存放的是图片
    for (var i = 0; i < num; i++) {
        var oLi = document.createElement('li');
        oLi.style.width = width + 'px';
        //delay这个属性必须得是作用在不同元素上的
        //每一个li的延迟的时间是不同的
        oLi.style.transitionDelay = (0.3 * i / num) + 's';
        for (var j = 0; j < 4; j++) {
            var oDiv = document.createElement('div');
            oDiv.style.backgroundPositionX = (-i) * width + 'px';
            oLi.appendChild(oDiv);
        }
        oUl.appendChild(oLi);
    }
    bindEvent();
    play();
}
createDom();

function bindEvent() {
    //实现小红点和图片的变换功能
    for (var i = 0; i < btn.length; i++) {
        btn[i].index = i;
        // 点击时获取到当前点击索引
        btn[i].onclick = function () {
            n = this.index;
            for (var i = 0; i < btn.length; i++) {
                btn[i].className = '';
            }
            this.className = 'on';
            //给css添加内容
            css.innerHTML += '.solid ul li{transform: translateZ(-180px) rotateX(' + (n * 90) + 'deg);}';
        }
    };
    // 鼠标覆盖清除定时器
    solid.onmouseenter = function () {
        clearInterval(timer);
    };
    solid.onmouseleave = function () {
        play();
    };
}

function play() {
    clearInterval(timer);
    // 定时器  自己进行轮播  相当于每次比上一次多转90deg

    //索引和图片的变换要对应，因此时间必须得是4秒
    timer = setInterval(function () {
        n++;
        n %= 4;
        // 设置按钮变化
        for (var i = 0; i < btn.length; i++) {
            btn[i].className = '';
        }
        btn[n].className = 'on';
        css.innerHTML += '.solid ul li{transform: translateZ(-180px) rotateX(' + (n * 90) + 'deg);}';
    },4000);
}