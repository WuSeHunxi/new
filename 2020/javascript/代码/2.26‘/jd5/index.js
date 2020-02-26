$('#shortcut').load('./shortcut/index.html');
// 同源的才可以进行网络请求
// https://www.jd.com:443/ 
// 
$('#header').load('./header/index.html');
$('#fs1').load('./fs/fs1.html');
$('.fs3').load('./fs/fs3.html');
$('.slider-list').swiper({
    list: $('.slide-list-item'),
    width: 190,
    height: 470,
    isAuto: true,
    autoTime: 6000,
    showChangeBtn: false,
    showSpotBtn: false,
    type:'animate'
})