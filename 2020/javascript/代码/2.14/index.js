(function(){
    return $.ajax({
        url: 'https://easy-mock.com/mock/5c09f40d3c098813c612cce6/movie/power',
        data: {
            password: '123456',
            username: 'cst'
        },
        type: 'POST',
    });
})().then(function(res){
    if(res.data.power=='root'){
        return $.ajax({
            url:'https://open.duyiedu.com/jq/movie/movieList',
            type:'GET'
        });
    }
}).then(function(res){
    var data=res.data;
    var $Wrapper=$('.wrapper');
    var df=$.Defferred();
    $.each(data,function(index,ele){
        var $MovieSection=$('.tpl').clone().removeClass('tpl');
        $MovieSection.data({id:ele.id})
            .on('click',function(){
                df.resolve($(this));
            }).children()
                .eq(0).attr('src',ele.poster)
                    .next().text(ele.name);
        $Wrapper.append($MovieSection);
    })
    return df.promise();
}).then(function(dom){
    return $.ajax({
        url:'https://open.duyiedu.com/jq/movie/movieInfo',
        type:'GET',
        data:{
            movieId:dom.data('id')
        }
    });
}).then(function(res){
    var data = res.data;
    var direct = data.direct;
    var gut = data.gut;
    var mainActor = data.mainActor;
    var screenWriter = data.screenwriter;

    var htmlStr = '<div class="mask">\
        <p>导演: ' + direct + '</p>\
        <p>剧情: ' + gut + '</p>\
        <p>主演: ' + mainActor.reduce(function (prev, curv) {
            prev += curv + ' ';
            return prev;
        }, '') + '</p>\
        <p>编剧: ' + screenWriter.reduce(function (prev, curv) {
            prev += curv + ' ';
            return prev;
        }, '') + '</p>\
    </div>'

    $(htmlStr)
        .appendTo('body')
            .css({position: 'absolute', left: $(window).outerWidth() / 2, bottom: 100, width: 400, marginLeft: -200});            
    })
