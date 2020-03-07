var oLi = document.getElementsByClassName('col');
var lock = false;
var page = 1;
var size = 5;

//获取数据
function getData() {
    if (lock) {
        return false;
    }
    lock = true;//加锁，为了防抖
    //http://127.0.0.1:3000/data  "page="+page+'&size'
    ajax('GET', './data.json', '' + size, function (res) {
        // console.log(res)
        var data = JSON.parse(res);//将json字符串转化成json格式的数据。
        renderDom(data)
        lock = false;//打开
        page ++;
    }, true);
}
getData();
function renderDom(data) {
    var imgWidth = oLi[0].offsetWidth - 40;
    data.forEach(function (item, index) {

        //item是数据中的每一项
        var oDiv = document.createElement('div');
        oDiv.className = 'item';
        var img = new Image();
        img.src = item.img;//图片没有加载出来的时候有默认的高度，为了解决这种情况，在最开始就给图片设置好高度
        //直接在加载出来之前就把图片的大小设置出来---固定宽高的延迟加载
        img.height = imgWidth * item.height / item.width;//根据图片的宽高比计算图片在页面的高度
        oDiv.appendChild(img);
        var oP = document.createElement('p');
        oP.innerText = item.desc;
        oDiv.appendChild(oP);
        //向 最短那一列进行插入
        var minIndex = getMinLi().minIndex;
        oLi[minIndex].appendChild(oDiv)
    })
}

// 获取最短的列
function getMinLi() {
    var minIndex = 0;//默认最短列为第0列
    var minHeight = oLi[0].offsetHeight;
    //利用循环找到最短列
    for (var i = 1; i < oLi.length; i++) {
        if (minHeight > oLi[i].offsetHeight) {
            minHeight = oLi[i].offsetHeight;
            minIndex = i;//记录最短列的索引
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
        //页面出现空白的时候加载数据
        if (minHeight < scrollTop + clientHeight) {
            timer = this.setTimeout(function () {//定时器也是防抖
                getData();
            }, 500)
           
        }
    }
}
bindEvent()


/**
 *  页可见区域宽： document.body.clientWidth;
    网页可见区域高： document.body.clientHeight;
    网页可见区域宽： document.body.offsetWidth (包括边线的宽);
    网页可见区域高： document.body.offsetHeight (包括边线的宽);
    网页正文全文宽： document.body.scrollWidth;
    网页正文全文高： document.body.scrollHeight;
    网页被卷去的高： document.body.scrollTop;
    网页被卷去的左： document.body.scrollLeft;
    网页正文部分上： window.screenTop;
    网页正文部分左： window.screenLeft;
    屏幕分辨率的高： window.screen.height;
    屏幕分辨率的宽： window.screen.width;
    屏幕可用工作区高度： window.screen.availHeight;
 */