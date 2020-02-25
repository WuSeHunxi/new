(function(){

    var nowIndex=0;
    var timer=null;
    var lock=false;
    var list=document.getElementsByClassName("list")[0];
    var itemLi=document.getElementsByTagName("li");
    var wrapper=document.getElementsByClassName("wrapper")[0];
    var rBtn=document.getElementsByClassName("rbtn")[0];
    var lBtn=document.getElementsByClassName("lbtn")[0];
    var spot=document.getElementsByTagName('span');
    var len=itemLi.length-1;
    var width=itemLi[0].offsetWidth;

    autoChange();

    function autoChange(){
        timer=setInterval(function(){
            rBtn.onclick();
        },2000);
    }

    function change(){
        list.style.left=-nowIndex*width+"px";
        for(var i=0;i<spot.length;i++){
            spot[i].className='';
        }
        spot[nowIndex%len].className='active';
    }

    function bindEvent(){

        rBtn.onclick=function(){
            if(nowIndex==len){
                list.style.left=0+"px";
                nowIndex=1;
            }else{
                nowIndex++;
            }
            change();
        }

        lBtn.onclick=function(){
            if(nowIndex==0){
                list.style.left=-len*width+"px";
                nowIndex=len-1;
            }else{
                nowIndex--;
            }
            change();
        }

        for(var i=0;i<spot.length;i++){
            (function(j){
                spot[j].onmouseenter=function(){
                    nowIndex=j;
                    change();
                }
            }(i))
        }

        wrapper.onmouseenter=function(){
            clearInterval(timer);
        }

        wrapper.onmouseleave=function(){
            autoChange();
        }

    }

    bindEvent();


}())