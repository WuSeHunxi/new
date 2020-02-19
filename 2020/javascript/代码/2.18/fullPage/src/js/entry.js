$('.wrapper').myFullPage({
    colorsArray:['red','blue','green'],
    onLeave:function(index,direction){
        // console.log(index,direction);
        //根据index找到离开的页面
        $('.section').eq(index).trigger('_leave');
    },
    afterLoad:function(index,direction){
        // console.log(index,direction);
        //根据index找到来的页面
        $('.section').eq(index).trigger('_load');
    }
});



$('.section').each(function(index,ele){
    //在每一个页面添加动画
    $(ele).append(ComponentFactory(
        {
            // type: 'base',
            className: 'duyi',
            width: 552,
            height: 336,
            text: '渡一教育创立于2015年！ 在成哥 邓哥 彤哥的带领下已经向着高端编程教育公司大踏步的，渡一 Dream Factory',
            center: true,
            css: {
                position: 'absolute',
                opacity: 0,
                bottom: 0,
                backgroundImage: 'url(./src/img/dialog.jpg)',
                backgroundSize: '100% 100%',                        
                padding: '10px 15px 10px 15px',
                textAlign: 'justify',
                fontSize: '18px',
                fontWeight: '900',
                lineHeight: '25px'
            },
            animateIn: {
                opacity: 1,
                bottom: 140,
            },
            animateOut: {
                opacity: 0,
                bottom: 0
            },
            delay: 200,
            event: {
                click: function () {
                    alert($(this).text());
                },
                mouseenter:function(){
    
                }
            }
        }
    )
    );
})

$('.section').on('_leave',function(){
    $(this).find('.component').trigger('cpLeave');
});

$('.section').on('_load',function(){
    $(this).find('.component').trigger('cpLoad');
})