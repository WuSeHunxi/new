(function () {

    var nowIndex = 0;
    var timer = null;
    var len = $('.item').length - 1;
    var width = $('.item').width();

    $('.lbtn').click(function () {
        if (nowIndex == 0) {
            $('.item').animate({
                left: -width * len
            })
            nowIndex=len-1;
        } else {
            nowIndex--;     
        }
        change();
    })

    $('.rbtn').click(function () {
        if(nowIndex==len){
            $('.item').animate({
                left:0
            })
            nowIndex=1;
        }else{
            nowIndex++;    
        }
        change();
    })

    $('.spots span').mouseenter(function () {
        spotsChange();
    })

    $('.wrapper').mouseenter(function () {

    })

    $('.wrapper').mouseleave(function () {

    })

    function spotsChange() {
        nowIndex = $(this).index();
        $('.spots span').removeClass("active").eq(nowIndex).addClass("active");
    }

    function change() {
        $('.list').animate({
            left: nowIndex * width
        })
    }

}())