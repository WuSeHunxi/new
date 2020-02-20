(function(){

    var btn=document.getElementsByClassName("btn")[0];
    var a=document.getElementsByTagName("a")[0];
    var hrefStr=location.href;
    if(hrefStr.indexOf('#clock')>0){
        getClock();
        btn.removeChild(a);
    }else{
        btn.onclick=function(){
            getClock();
            btn.removeChild(a);
        }
    }


    function getClock(){
        var hourDom=document.getElementsByClassName("hour")[0],
            minuteDom=document.getElementsByClassName("minute"),
            secondDom=document.getElementsByClassName("second");

        var date=new Date();
        var h=date.getHours()>12?(date.getHours()-12):date.getHours();
        var m=date.getMinutes();
        var s=date.getSeconds();
        hourDom.style.transform="rotate("+h*30+"deg)";
        minuteDom.style.transform="rotate("+m*6+"deg)";
        secondDom.style.transform="rotate("+s*6+"deg)";
    }

}())