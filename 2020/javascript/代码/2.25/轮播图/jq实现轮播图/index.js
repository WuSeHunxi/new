(function () {

    var nowIndex = 0;
    var timer = null;
    var len = $('li.item').length-1;
    var width = $('li.item').width();
    var lock=false;

    $('.lbtn').click(function () {
        if(lock){
            return false;
        }
        lock=true;
        if (nowIndex == 0) {
            $('.list').css({
                left: -len*width
            })
            nowIndex=len-1;
        } else {
            nowIndex--;     
        }
        $('.spots span').removeClass("active").eq(nowIndex).addClass("active");
        change();
        // spotsChange();
    })


    $('.rbtn').click(function () {
        if(lock){
            return false;
        }
        lock=true;
        if(nowIndex==len){
            $('.list').css({
                left:0
            })
            nowIndex=1;
        }else{
            nowIndex++;    
        }
        change();
    })

    $('.spots span').mouseenter(function () {
        if(lock){
            return false;
        }
        lock=true;
        nowIndex = $(this).index();
        change();

    })

    $('.wrapper').mouseenter(function () {
        clearInterval(timer);
    })

    $('.wrapper').mouseleave(function () {
        autoChange();
    })

    // function spotsChange() {
    
    // }

    function change() {
        $('.list').animate({
            left: -nowIndex * width
        },function(){
            lock=false;
        })
        $('.spots span').removeClass("active").eq(nowIndex%len).addClass("active");
    }

    function autoChange(){
        timer=setInterval(function(){
            $('.rbtn').click();
        },2000);
    }

    autoChange();

}())