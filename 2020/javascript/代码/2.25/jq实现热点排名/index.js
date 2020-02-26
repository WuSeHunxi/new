(function(data){

    var colorArr=['#f54545','#ff8547','#ffac38'];
    var page=Math.ceil(data.length/10);
    var curIndex=0;
    function bindEvent(){
        $(".change").on('click',function(){
            curIndex=curIndex++%page;
            renderDom(data);
        })
    }

    function renderDom(data){
        var eachLen=data.length-curIndex*10>10?10:data.length-curIndex;
        console.log(eachLen);
        for(var i=0;i<eachLen;i++){
            var res=data[i+curIndex*10];
            console.log(res);
            var $clone=$('.item').clone().removeClass('tpl').addClass('showSection');
            $clone.children('span')
                .find('.number')
                .text(i+curIndex*10+1).next().text(res.title).next().text(res.search)
                .appendTo($('.list'));
        }
    }
    renderDom(data);
    bindEvent();


}(data))