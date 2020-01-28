var btns=document.getElementsByClassName("btn")[0].getElementsByTagName("li");
var pic=document.getElementsByClassName("pic")[0];
var wrapper=document.getElementsByClassName("wrapper")[0];
var css=document.getElementsByTagName("style")[0];
var num=100;

//创建元素
function createDom(){
    var allWdith=wrapper.offsetWidth;
    var width=allWdith/num;
    for(var i=0;i<num;i++){
        var oLi=document.createElement("li");
        oLi.style.transitionDelay=(3*i)/100+"s";
        oLi.style.width=width+"px";
        for(var j=0;j<4;j++){
            var oDiv=document.createElement("div");
            oDiv.style.backgroundPosition=-i*width+"px";
            oLi.appendChild(oDiv);
        }
        pic.appendChild(oLi);
    }
    bindEvent();
}

createDom();

function bindEvent(){
    for(var i=0;i<btns.length;i++){
        btns.index=i;
        btns[i].onclick=function(){
            for(var i=0;i<btns.length;i++){
                btns[i].className="";
            }
            this.className="active";
            css.innerHTML+='.wrapper .pic li{transform:rotate('+ btns.index*90+'deg)}';
        }
        
    }    
}

function play(){

}