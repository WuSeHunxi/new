var oLi = document.getElementsByClassName('col');
var lock = false;
var page = 1;
var size = 5;

//获取数据
function getData() {
    if (lock) {
        return false;
    }
    lock = true;
    ajax('GET', './data.json', '' + size, function (res) {
        // console.log(res)
        var data = JSON.parse(res);
        renderDom(data)
        lock = false;
        page ++;
    }, true);
}
getData();
function renderDom(data) {
    var imgWidth = oLi[0].offsetWidth - 40;
    data.forEach(function (item, index) {
        var oDiv = document.createElement('div');
        oDiv.className = 'item';
        var img = new Image();
        img.src = item.img;
        img.height = imgWidth * item.height / item.width;
        oDiv.appendChild(img);
        var oP = document.createElement('p');
        oP.innerText = item.desc;
        oDiv.appendChild(oP);
        var minIndex = getMinLi().minIndex;
        oLi[minIndex].appendChild(oDiv)
    })
}


// 获取最短的列
function getMinLi() {
    var minIndex = 0;
    var minHeight = oLi[0].offsetHeight;
    for (var i = 1; i < oLi.length; i++) {
        if (minHeight > oLi[i].offsetHeight) {
            minHeight = oLi[i].offsetHeight;
            minIndex = i;
        }
    }
    return {
        minIndex: minIndex,
        minHeight: minHeight
    }
}

var timer = null;
function bindEvent() {
    window.onscroll = function () {
        clearTimeout(timer);
        var minHeight = getMinLi().minHeight;
        var clientHeight = document.documentElement.clientHeight;
        var scrollTop = document.documentElement.scrollTop;
        if (minHeight < scrollTop + clientHeight) {
            timer = this.setTimeout(function () {
                getData();
            }, 500)
           
        }
    }
}
bindEvent()
