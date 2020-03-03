$('.close').mouseenter(function(){
    $(this).css({
        backgroundColor:'red',
        color:'#fff'
    })
}).mouseleave(function(){
    $(this).css({
        backgroundColor:'#fefefe',
        color:'#666'
    })
})

$('.service .frame').mouseenter(function(){
    $('.service-pop').animate({
        top: '258px'
    })
})

$('.close').click(function(){
    $('.service-pop').animate({
        top: '470px'
    })
})