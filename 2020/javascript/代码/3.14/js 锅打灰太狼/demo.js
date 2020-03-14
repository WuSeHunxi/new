
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
        if($("#countDown").width==0){
            
            clearInterval(timer);
            setTimeout(function(){
                clearInterval(wolfCreateTimer);
                $("#gameOver").show()
                alert("游戏结束");
            },500);
        }
    },100);
}

var wolfCreateTimer=null;
var wolfUpTimer=null;
    var wolfDownTimer=null;
    
function wolfCreate(){
    var num=-1;
    var index=0;
    wolfCreateTimer=setInterval(function(){
        var img=new Image();
        
        var ranNum=Math.floor(Math.random()*wolfStartArr.length);
        if(ranNum==num){
            return;
        }
        num=ranNum;
        img.style.left=wolfStartArr[ranNum].left;
        img.style.top=wolfStartArr[ranNum].top;
        $("#wolfs").append(img)
        
        wolfUpTimer=setInterval(function(){
            index++;
            if(index<=5){
                img.src='img/h'+ index +'.png';
            }else{
                clearInterval(wolfUpTimer);
                wolfDownTimer=setInterval(function(){
                    index--;
                    if(index<=0){
                        clearInterval(wolfDownTimer);
                        // img.remove()
                    }else{
                        // console.log(index)
                        img.src='img/h'+ index +'.png';
                    }
                    
                },100);
            }
        },150);

        
    },800);
}