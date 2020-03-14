function start(){
    $("#go").click(function(){
        $(this).hide();
        move();
    })
}

start()

var step=5;
var flag=true;
var timer=null;
var num=0;

function move(){
    clearInterval(timer);
    
    timer=setInterval(function(){
        $('#main').css({
            top:parseInt($("#main").css("top") )+step+"px"
        })
        // console.log($("#main").css("top"))-->得到的是带单位的
        if(parseInt($("#main").css("top"))>=0){
            createRow()
            $("#main").css({
                top:"-150px"
            })
        }
        var len=$("#main").children().length;
        // console.log(len)
        if(len==6){
            for(var i=0;i<len;i++){
                if($($("#main").children()[len-1]).children().hasClass('i')){
                    alert("游戏结束");
                    clearInterval(timer);
                    flag=false;
                }
            }
            $("#main").children()[len-1].remove();
        }
    },20)
    bindEvent()
}

function bindEvent(){
    $("#main").click(function(e){
        if(e.target.className=='i'){
            $(e.target).css({
                backgroundColor:"#bbb"
            })
            $(e.target).removeClass();
            num++;
            if(num%10==0){
                step++;
            }
        }else{
            alert("游戏结束");
            clearInterval(timer);
            flag=false;
        }
    })
}


var colors = ['red', 'green', 'black', 'blue'];

function createRow(){
    var row=$("<div class='row'></div>");
    for(var i=0;i<4;i++){
        $('<div></div>').appendTo(row)
    }
    if($("#main").children().length==0){    
        row.appendTo($("#main"));
    }else{
        row.insertBefore($("#main").children()[0]);
    }
    var len=row.children().length;
    // console.log(len)
    var ranNum=Math.floor(Math.random()*len);
    // console.log(row.children()[ranNum])
    $(row.children()[ranNum]).css({
        backgroundColor:colors[ranNum]
    })
    $(row.children()[ranNum]).attr("class","i");
}
