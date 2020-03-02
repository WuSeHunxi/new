$('#shortcut').load('./shortcut/index.html');
// 同源的才可以进行网络请求
// https://www.jd.com:443/ 
// 
$('#header').load('./header/index.html');
$('#fs1').load('./fs/fs1.html');
$('#slider-wrapper').swiper({
    list: $('#slider-wrapper > .slider-banner-img'),
    width: 590,
    height: 470,
    autoTime: 5000
})
$('.slider-recommend-wrapper').swiper({
    list: $('.focus-item__recommend'),
    width: 190,
    height: 470,
    showChangeBtn: false,
    showSpotBtn: false,
    autoTime: 6000
});
$('.seckill-wrapper').swiper({
    list: $('.seckill-wrapper-item'),
    width: 800,
    height: 260,
    type: 'animate',
    showSpotBtn: false,
    // autoTime: 5000,
    isAuto: false,
});
$('.seckill-brand').swiper({
    list: $('.seckill-brand-item'),
    width: 180,
    height: 240,
    showChangeBtn: false,
    type: 'animate',
    autoTime: 3000,
})
$('.fs3').load('./fs/fs3.html');


// 京东秒杀  截至时间
var seckillTime = new Date('2020-02-26 12:00:00').getTime();
var seckillTimer = setInterval(function () {
    var newTime = new Date().getTime();
    if (seckillTime - newTime > 0) {
        var hour = Math.floor(( seckillTime - newTime ) / 1000 / 60 / 60);
        var minute = Math.floor((seckillTime - newTime) / 1000 / 60 - hour * 60);
        var second = Math.floor((seckillTime - newTime) / 1000 - hour * 60 * 60 - minute * 60 )
        if (hour < 10) {
            hour = '0' + hour;
        }
        if (minute < 10) {
            hour = '0' + minute;
        }
        if (second < 10) {
            hour = '0' + second;
        }
        $('.timmer__unit--hour').text(hour)
        $('.timmer__unit--minute').text(minute)
        $('.timmer__unit--second').text(second)
        // console.log(hour, minute, second)
    } else {
        $('.timmer__unit--hour').text('00')
        $('.timmer__unit--minute').text('00')
        $('.timmer__unit--second').text('00')
        clearInterval(seckillTimer)
    }
}, 500)