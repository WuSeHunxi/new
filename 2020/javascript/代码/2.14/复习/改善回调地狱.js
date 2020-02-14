(function(){
    return $.ajax({
        url:'',
        type:'POST',
        data:{
            username:'cst',
            password:'123123'
        }
    })
})().then(function(res){
    var data=res.data;
    if(data.power=='root'){
        return $.ajax({
            url:'',
            type:'GET'
        })
    }
}).then(function(res){
    var data=res.data;
    var $Wrapper=$('.wrapper');
    var innerDf=$.Deferred();
    $.each(data,function(index,ele){
        var $MovieSection=$('.tpl').clone().removeClass('tpl').addClass('movieSection');
        $MovieSection.data({id:ele.id}).on('click',function(){
            innerDf.resolve($(this));
        }).children()
            .eq(0).attr('src',ele.poster)
                .next().text(ele.name);
        $MovieSection.appendTo($Wrapper);
    })
    return innerDf.promise();
}).then(function(dom){
    return $.ajax({
        url:'',
        type:'GET',
        data:{
            movieId:dom.data("id")
        }
    })
}).then(function(res){
    var data=res.data;
    var direct=data.direct;
    var gut=data.gut;
    var mainActor=data.mainActor;
    var screenWriter=data.screenWriter;
    var htmlStr='<div class="mask">\
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
        </div>';
    $(htmlStr)
        .appendTo('body')
            .css({position:'absolute',left:$(window).outerWdith/2,bottom:100,width:400,marginLeft:-200});
})