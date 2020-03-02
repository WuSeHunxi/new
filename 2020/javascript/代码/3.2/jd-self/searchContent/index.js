$("#search-inp").on('input',function () {
    var val=$(this).val();
    console.log(val);
    $.ajax({
        url:'https://suggest.taobao.com/sug',
        type:'get',
        data:{
            area: 'c2c',
            code: 'utf-8',
            q: val,
        },
        dataType:'jsonp',
        success:function (res) {
            // console.log(res);
            render(res);
        }
    })
})

function render(res) {
    var result=res.result;
    var str=''
    $.each(result,function (index,item) {
        // console.log(item);
        str+=`<li><a href="#">${item[0]}</a></li>`
        console.log(item);
    })
    $('.inp-list').html(str).show();
}

$('.inp-list').mouseleave(function () {
    var self = this;
    setTimeout(function () {
        $(self).hide();
    }, 1000)
})