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
            callback: "renderDom"
        },
        // 使用者希望拿到的数据类型  
        dataType: 'jsonp',
        // success: function (data) {//使用两种方法传递后端请求回来的数据
        //     console.log(data)
        //     var datal = data.result;
        //     str = '';
        //     datal.forEach(function (item, index) {
        //         str += `<li><a href="#">${item[0]}</a></li>`;
        //     })
        //     $('#search-list').html(str).show()
        // }
    })
}
$('#search-inp').on('input', function () {
    var val = $(this).val();
    if (val) {
        clearTimeout(timer);
        timer = setTimeout(function () {
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
    hideTimer = setTimeout(function () {
        $('#search-list').hide()
    }, 500)
})
// jsonp   --->  json and padding
// script src

$('.logo').mouseenter(function () {
    $('.logo-img').css({
        backgroundImage: 'url(https://img1.360buyimg.com/da/jfs/t1/16134/5/11584/77878/5c90a4bdE5ae12937/38714fb6679b8daf.gif?v=' + Math.random() + ')'
    }).show()
}).mouseleave(function () {
    setTimeout(function () {
        $('.logo-img').hide()
    }, 1000);
})