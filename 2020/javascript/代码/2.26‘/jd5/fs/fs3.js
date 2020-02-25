(function () {


    $('.service_frame').mouseenter(function () {
        $('.service').addClass('service-expend');
        $('.service_frame_on').removeClass('service_frame_on')
        $(this).addClass('service_frame_on');
        console.log($(this).find('.service_txt').text())
    })
    $('.close').click(function () {
        $('.service').removeClass('service-expend');
        $('.service_frame_on').removeClass('service_frame_on')
    })

} ())