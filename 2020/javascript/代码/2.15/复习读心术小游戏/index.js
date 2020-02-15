var back=document.getElementsByClassName("back")[0];
var table=document.getElementsByClassName("table")[0];
var show=document.getElementsByClassName("show")[0];
var lTop=document.getElementsByClassName('l-top')[0];

function getRandom(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}

var result=getRandom(0,16);
back.src="img/values/" + result + ".png";

function styleRandom(){
    for(var i=0;i<100;i++){
        var tableContent=document.createElement('div');
        tableContent.className='item';
        if(i%9===0){
            tableContent.innerHTML='<span>' + i + '</span><img src="img/values/' + result + '.png">';
        }else{
            tableContent.innerHTML='<span>' + i + '</span><img src="img/values/' + getRandom(0, 16) + '.png">';
        }
        table.appendChild(tableContent);
    }
}

styleRandom();


show.onclick=function(){
    lTop.style.transform='rotate(1800deg)';
    lTop.addEventListener('transitionend',function(){
        show.style.display='none';
        back.style.display='block';
    })
}

