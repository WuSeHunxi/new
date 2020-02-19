$.fn.extend({
    myFullPage:function(config){
        var colorsArray=config.colorsArray;
        var $Wrapper=$(this);
        var $Section=$Wrapper.find(".section");
        var commonStyle={
            width:"100%",
            height:"100%"
        };
        var clientWidth=$(window).outerWidth();
        var clientHeight=$(window).outerHeight();
        var curIndex=0;
        var lock=true;
        $("html").add("body").css({
            position:"relative",
            overflow:'hidden',
            margin:0
        }).add($Wrapper).add($Section).css(commonStyle);
        $Wrapper.css({position:"absolute",left:0,top:0})
                    .find('.section')
                        .each(function(index,ele){
                            $(ele).css({
                                backgroundColor:colorsArray[index],
                                position:'relative'
                            }).find('.slide')
                                .css({float:"left",width:clientWidth,height:clientHeight})
                                    .wrapAll('<div class="alideWrappper></div>')
                        });
        $Section.find(".slideWrapper").each(function(index,ele){
            $(ele).css({width:$(ele).find('.slide').size()*clientWidth,height:clientHeight});
        });

        $Section.eq(0)
            .addClass("active")
                
        $(document).on('keydown',function(e){
            if(e.which==38||e.which==40){
                if(lock){
                    lock=false;
                    var newTop=$Wrapper.offset().top;
                    var director='';
                    if(e.which==38&&curIndex!=0){
                        director='top';
                        curIndex--;
                        newTop+=clientHeight;
                    }else if(e.which==40&&curIndex!=$Section.size()-1){
                        director='bottom';
                        curIndex++;
                        newTop-=clientHeight;
                    }
                    $Wrapper.animate({
                        top:newTop
                    },350,'swing',function(){
                        lock=true;
                        $Section.eq(curIndex).addClass("active");
                        if(director=='top'){
                            $Section.eq(curIndex+1).removeClass('active');
                        }else{
                            $Section.eq(curIndex-1).removeClass("active");
                        }

                    })
                }
            }
        })
    }
})