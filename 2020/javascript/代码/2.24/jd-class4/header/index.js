var timer = null;
$('#search-btn').click(function () {
    console.log('跳转页面')
})

function getSearchData(val) {
    $.ajax({
        url: 'https://suggest.taobao.com/sug',
        type: 'get',
        data: {
            area: 'c2c',
            code: 'utf-8',
            q: val,
            //这个索引本身自带的callback参数不处理请求到的数据，因此自己设置一个
            callback: "renderDom"
        },
        // 使用者希望拿到的数据类型  
        dataType: 'jsonp'
    })
}
$('#search-inp').on('input', function () {
    var val = $(this).val();
    if (val) {
        clearTimeout(timer);
        //倒计时500ms
        timer = setTimeout(function () {
            //500ms之后才能获取到数据，防止因请求的时间不同造成返回的信息不是本来要获取的。
            getSearchData(val);
        }, 500)
    }
})
function renderDom(res) {
    console.log(res)
    var data = res.result;
    str = '';
    data.forEach(function (item, index) {
        str += `<li><a href="#">${item[0]}</a></li>`;
    })
    $('#search-list').html(str).show()
}

var hideTimer = null;
$('#search-list').mouseleave(function () {
    //鼠标移出后延迟隐藏
    hideTimer = setTimeout(function () {
        $('#search-list').hide()
    }, 500)
})
// jsonp   --->  json and padding
// script src

$('.logo').mouseenter(function () {
    $('.logo-img').css({
        //gif图片直接引入的话只会运动一次，最后保存的是图片的最后一帧，为了保证能够正常显示，给gif图片设置一个随机数，是每次请求道德图片都不是同一个
        backgroundImage: 'url(https://img1.360buyimg.com/da/jfs/t1/16134/5/11584/77878/5c90a4bdE5ae12937/38714fb6679b8daf.gif?v=' + Math.random() + ')'
    }).show()
}).mouseleave(function () {
    setTimeout(function () {
        $('.logo-img').hide()
    }, 1000);
})