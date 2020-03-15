
var wolfStartArr = [
    { left: "98px", top: "115px" },
    { left: "17px", top: "160px" },
    { left: "15px", top: "220px" },
    { left: "30px", top: "293px" },
    { left: "122px", top: "273px" },
    { left: "207px", top: "295px" },
    { left: "200px", top: "211px" },
    { left: "187px", top: "141px" },
    { left: "100px", top: "185px" }
];

function bindEvent(){
    $('#menu').click(function(e){
        // console.log(e.target)
        if(e.target.id=='start'){
            $(this).hide()
            listenTime()
            wolfCreate();
        }else{
            alert("规则如下");
        }
    })
}

bindEvent();
var timer=null;
function listenTime(){
    var barWidth=$("#countDown").width();
    timer=setInterval(function(){
        // console.log(barWidth)
        $("#countDown").width(barWidth--)
        if($("#countDown").width()==0){
            
            clearInterval(timer);
            clearInterval(wolfCreateTimer);
            setTimeout(function(){
                
                $("#gameOver").show()
                alert("游戏结束");
            },500);
        }
    },100);
}

var wolfCreateTimer=null;
// var wolfUpTimer=null;
//     var wolfDownTimer=null;
    
function wolfCreate(){
    var num=-1;
    wolfCreateTimer=setInterval(function(){
        var img=new Image();
        // img.index=0;
        //每次定时器的时候都需要重新初始化
        // var index=0;
        img.index=0;
        var ranNum=Math.floor(Math.random()*wolfStartArr.length);
        var ranType=Math.floor(Math.random()*100);
        if(ranNum==num){
            return;
        }
        num=ranNum;
        if(ranType>90){
            img.type='x';
        }else{  
            img.type='h';
        }

        img.style.left=wolfStartArr[ranNum].left;
        img.style.top=wolfStartArr[ranNum].top;
        img.src="img/"+img.type+img.index+".png";
        $("#wolfs").append(img)
        
        img.wolfUpTimer=setInterval(function(){
            img.index++;
            if(img.index<=5){
                img.src='img/'+img.type+ img.index +'.png';
            }else{
                clearInterval(img.wolfUpTimer);
                img.wolfDownTimer=setInterval(function(){
                    img.index--;
                    if(img.index<=0){
                        clearInterval(img.wolfDownTimer);
                        img.remove()
                    }
                    img.src='img/'+img.type+ img.index +'.png';
                    
                },100);
            }
        },150);

        var bol=true;
        $("#wolfs").click(function(){
            img.index=5;
            if(bol==true){
                clearInterval(img.wolfUpTimer);
                clearInterval(img.wolfDownTimer);
                img.hitTimer=setInterval(function(){
                    img.index++;
                    if(img.index>=9){
                        clearInterval(img.hitTimer);
                        img.remove();
                    }
                    img.src="img/"+img.type+img.index+".png";
                },100);
            }
            bol=false;
            if(img.type="x"){
                $("#scoring").html(parseInt($("#scoring").html())-10);
            }else{
                $("#scoring").html(parseInt($("#scoring").html())+10);
            }
        })

        
    },800);
}

document.onmousedown=function(e){
    e.preventDefault()
}