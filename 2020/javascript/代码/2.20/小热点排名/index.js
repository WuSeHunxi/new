(function(data){

    var colorArr=['#f54545','#ff8547','#ffac38'];
    var curPage=0;
    var totalPage=Math.ceil(data.length/10);
    var $wrapper=$(".wrapper");
    var $showSection=$wrapper.find('.showSection');
    $showSection.hide();

    function render(data){
        $showSection.hide().find('.showItem').remove();
        var len=(data.length-curPage*10)>=10?10:(data.length-curPage*10);
        for(var i=0;i<len;i++){
            var $clone=$wrapper.find('.tpl').clone().removeClass("tpl").addClass("showItem");
            var ele=data[i+curPage*10];
            $clone.children('span')
                    .eq(0)
                        .text(i+curPage*10+1).css({"backgroundColor":curPage==0&&colorArr[i+curPage]})
                            .next()
                                .text(ele.title)
                                    .next(ele.search)
                                        .text(ele.search)
                                            .addClass(ele.search>ele.hisSearch?'up':'down');
            $showSection.append($clone);
        }
        $showSection.fadeIn();
    }

    function bindEvent(){
        $wrapper.find('.change').on('click', function () {
            // 4
            curPage =  ++curPage % totalPage;

            render(data);
        });
    }
    
    bindEvent();
    render(data);

}(data))