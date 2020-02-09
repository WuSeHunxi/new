(function(data){
    $Wrapper=$(".wrapper");
    var $ShowSection=$Wrapper.find('.showSection');
    var colorsArray=['#f54545','#ff8547','#ffac38'];
    var curPage=0;
    var totalPage=Math.ceil(data.length/10);
    $ShowSection.hide();
   
    function bindEvent(){
        $Wrapper.find('.change').on('click',function(){
            curPage=++curPage%totalPage;
            renderPage(data);
        })
    }

    function renderPage(data){
        //将原来的隐藏
        $ShowSection.hide().find('.showItem').remove();
        var len=(data.length-curPage*10)>=10?10:data.length-curPage*10;
        for(var i=0;i<len;i++){
            var $Clone=$Wrapper.find('.tpl').clone().removeClass('tpl').addClass("showItem");
            //保存数据
            var ele=data[i+curPage*10];
            $Clone.children('span').eq(0)
                .text()
                    .next()
                        .text(ele.title)
                            .next(ele.search)
                                .addClass(ele.search>ele.hisSearch?'up':'down');
            $ShowSection.fadeIn();
        }
    }

    bindEvent();
    renderPage(data);

}(data))