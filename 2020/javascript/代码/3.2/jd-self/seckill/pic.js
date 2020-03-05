$(function(){
    //倒计时通常利用秒数来计算，这样可以实时得到变化
    var seckillTime=new Date('2020-03-05 12:00:00').getTime();
    var timer=null;
    timer=setInterval(function(){
        var nowTime=new Date().getTime();
        if(seckillTime-nowTime>0){
            var hour = Math.floor(( seckillTime - nowTime ) / 1000 / 60 / 60);
            var minute = Math.floor((seckillTime - nowTime) / 1000 / 60 - hour * 60);
            var second = Math.floor((seckillTime - nowTime) / 1000 - hour * 60 * 60 - minute * 60 )
            if(hour<10){
                hour='0'+hour;
            }
            if(minute<10){
                minute='0'+minute;
            }
            if(second<10){
                second='0'+second;
            }
            $('.hour').text(hour);
            $('.minute').text(minute);
            $('.second').text(second);
        }else{
            $('.hour').text('00');
            $('.minute').text('00');
            $('.second').text('00');
            clearInterval(timer);
        }
    },500);
}())