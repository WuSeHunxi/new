(function(){

    var nowIndex=0;
    var lock=false;
    var timer=null;
    var len=$("li.item").length-1;
    var width=$("li.item").width();

    function autoChange(){
        timer=setInterval(function(){
            $('.rbtn').click();
        },2000);
    }

    function bindEvent(){

        $('.lbtn').on('click',function(){
            if(lock){
                return false;
            }
            lock=true;
            if(nowIndex==0){
                $('.list').css({
                    left:-width*len
                })
                nowIndex=len-1;
            }else{
                nowIndex--;
            }
            $('.list').css({
                left:-nowIndex*width
            })
            $('.spots span').removeClass('active').eq(nowIndex%len).addClass('active');
            lock=false;
        })

        $('.rbtn').on('click',function(){
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
            $('.list').css({
                left:-nowIndex*width
            })
            $('.spots span').removeClass('active').eq(nowIndex%len).addClass('active');
            lock=false;
        })

        $('.spots span').on('mouseenter',function(){
            if(lock){
                return false;
            }
            lock=true;
            nowIndex=$(this).index();
            $('.spots span').removeClass('active').eq(nowIndex%len).addClass('active');
            $('.list').css({
                left:-nowIndex*width
            })
            lock=false;
        })

        $('.wrapper').on('mouseleave',function(){
            autoChange();
        })

        $('.wrapper').on('mouseenter',function(){
            clearInterval(timer);
        })

    }

    autoChange();
    bindEvent();

}())