
$('#send-btn').click(function () {
    var val = $('#send-text').val();
    if (val) {
        renderText('mine', val);//先渲染自己的
        $('#send-text').val('');
        $.ajax({
            url: 'https://developer.duyiedu.com/edu/turing/chat',
            type: 'get',
            data: {
                text: val,
            },
            dataType: 'json',//用户希望得到的数据类型
            success: function (res) {
                console.log(res)
                renderText('robot', res.text)//请求成功再渲染机器人的
            }
        })
    }
})

$('#send-text').on('keyup', function (e) {
    console.log(e.keyCode)
    if (e.keyCode == 13) {//回车按键是13
        $('#send-btn').click();
    }
})
function renderText(className, text) {
    //scrollIntoView()方法：让当前的元素滚动到浏览器窗口的可视区域内。但是该方法的兼容性差
    $(` <div class="${className}">
    <div class="avator"></div>
    <div class="text">${text}</div>
    </div>`).appendTo($('.container'))[0].scrollIntoView();//是滚动条滚到最下端
    // scrollHeight - contentHeight

    // 滚动条要滚动的距离
    // var scrollTop = $('.container')[0].scrollHeight - $('.container').innerHeight();
    // $('.container').scrollTop(scrollTop);//设置滚动条垂直方向滚动的距离
}
/**
 * 
 * 笔记：
 *     offsetHeight:返回的高度是内容高+padding+边框
 *     clientHeight:返回的可视高度不包括边框，边距或滚动条
 *     scrollHeight:返回整个元素的高度，包括滚动条（只读属性）
 *        没有垂直滚动条的情况下，scrollHeight值与元素视图填充所有内容所需要的最小值clientHeight相同，
 *        即：包括padding，但是不包括border和margin。
 *     scrollTop():可读可写
 * 
 */