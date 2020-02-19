$.fn.extend({
    myFullPage:function(config){
        //初始化变量--->将需要的提前写出来减少不必要的操作
        var colorsArray=config.colorsArray;
        var $Wrapper=$(this);//谁调用这个工具方法谁就是this
        var $Section=$Wrapper.find('.section');
        var commonStyle={
            width:'100%',
            height:'100%',
        };
        var clientWidth=$(window).outerWidth();
        var clientHeight=$(window).outerHeight();
        var curIndex=0;//当前显示的页面的索引
        var lock=true;//避免重复运动

        //第一步：赋予样式--->初始化样式
        $('html').add('body').css({
            position:'relative',
            overflow:'hidden',
            margin:0
        }).add($Wrapper).add($Section).css(commonStyle);
        $Wrapper.css({position:'absolute',left:0,top:0})
                    .find('.section')
                        .each(function(index,ele){//给每一个section进行处理
                            $(ele).css({
                                backgroundColor:colorsArray[index],
                                position:'relative'
                            }).find('.slide')//找到每一个section的slide添加样式并添加一个统一的父级
                                .css({float:'left',width:clientWidth,height:clientHeight})
                                    .wrapAll('<div class="slideWrapper"></div>')
                        });
        $Section.find('.slideWrapper').each(function(index,ele){
            $(ele).css({width:$(ele).find('.slide').size()*clientWidth,height:clientHeight});
        });
     
        //js控制移动
        //给section添加和删除active，给内部的添加或删除innerActive

        //类名初始化
        $Section.eq(0)
            .addClass('active')
                .end().find('.sliderWrapper')
                    .css({position: 'absolute', left: 0, top: 0})
                        .each(function (index, ele) {
                            console.log("p");
                            $(ele).find('.slide').eq(0).addClass('innerActive')
                        });
                        
        //控制移动
        $(document).on('keydown',function(e){
            //e.which--->记录键盘的acsii
            //left--37 top--38 right--39 bottom--40
            if(e.which==38||e.which==40){
                if(lock){ 
                    lock=false;//运动开始后就需要加锁
                    var newTop=$Wrapper.offset().top;
                    var direction='';//通过方向切换类名
                    //垂直移动
                    if(e.which==38&&curIndex!=0){//向上运动
                        direction='top';
                        config.onLeave(curIndex,direction);
                        curIndex--;
                        newTop+=clientHeight;
                    }else if(e.which==40&&curIndex!=$Section.size()-1){
                        direction='bottom';
                        config.onLeave(curIndex,direction);
                        curIndex++;
                        newTop-=clientHeight;
                    }
                    //运动 .wrapper向上的话高度增加，向下的话高度减小
                    $Wrapper.animate({
                        top:newTop
                    },350,'swing',function(){
                        lock=true;
                        //表示向上或向下运动成功的话要添加类名
                        //切换完事之后
                        $Section.eq(curIndex).addClass('active');
                        if(direction=='top'){
                            //如果向上的话，当前索引的下一个需要去掉active类名
                            $Section.eq(curIndex+1).removeClass('active');
                        }else{
                            $Section.eq(curIndex-1).removeClass('active');
                        }
                        config.afterLoad(curIndex,direction);
                    })
                }
               
            }
            if(e.which==39||e.which==37){
                //控制水平移动
                if(lock){
                    lock=false;
                    var $SW=$('.active').find('.sliderWrapper');
                    // console.log($SW);
                    var curShowDom=$SW.find('.innerActive');
                    var newLeft=$SW.offset().left;
                    var direction=null;
                    //进行左右的判断，以及两边不能进行左移或者右移
                    if(e.which==37&&curShowDom.index()!=0){//通过index()方法获取索引
                        newLeft+=clientWidth;
                        direction='left';
                    }else if(e.which==39&&curShowDom.index()!=$SW.find('.slide').size()-1){
                        newLeft-=clientWidth;
                        direction='right';
                    }
                    $SW.animate({
                        left:newLeft
                    },200,'swing',function(){
                        lock=true;
                        //在两边的时候不能删除innerActive类名
                        direction!=null?curShowDom.removeClass('inndeActive'):'';
                        if(direction=='left'){
                            curShowDom.prev().addClass('innerActive');
                        }else{
                            curShowDom.next().addClass('innerActive'); 
                        }
                    })
                }
            }
        })

    }
})