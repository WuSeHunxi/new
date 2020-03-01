$('#search-btn').click(function (e) {
    var val = $('#search-inp').val();
    if (val) {
        $.ajax({
            url: 'https://suggest.taobao.com/sug',
            type: 'get',
            data: {
                area: 'c2c',
                code: 'utf-8',
                q: val,
                callback: 'renderDom'
            },
            dataType: 'jsonp'
        })
    }
})

function renderDom(res) {
    console.log(res)
    var data = res.result;
    var str = '';
    data.forEach(function (item) {
        str += `<li><a href="#">${item[0]}</a></li>`
    });
    $('#search-list').html(str)
}