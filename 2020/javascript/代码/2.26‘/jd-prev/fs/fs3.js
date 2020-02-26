(function () {


    $('.service_frame').mouseenter(function () {
        $('.service').addClass('service-expend');
        $('.service_frame_on').removeClass('service_frame_on')
        $(this).addClass('service_frame_on');
        // console.log($(this).find('.service_txt').text())
    })

    console.log($('.service_item'))
    // $('.service_item').mouseenter(function(){
    //     console.log(000);
    //     $(this).css({
    //         opacity:0,
    //         // visibility:'hidden'
    //     })
    //     $(this).next().css({
    //         // opacity:1,
    //         // visibility:'visible',
    //         left:17
    //     })
    // }).mouseleave(function(){
    //     console.log(11);
    //     $(this).css({
    //         opacity:1,
    //         // visibility:'visible'
    //     })
    //     $(this).next().css({
    //         opacity:0,
    //         left:0
    //         // visibility:'hidden'
    //     })
    // })

    //关闭按钮
    $('.close').click(function () {
        $('.service').removeClass('service-expend');
        $('.service_frame_on').removeClass('service_frame_on')
    })

} ())