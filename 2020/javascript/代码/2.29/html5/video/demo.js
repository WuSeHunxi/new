var videoPlay = document.getElementsByClassName('video_player')[0];
var video = videoPlay.getElementsByTagName("video")[0];
var menu = document.getElementsByClassName("menu")[0];
var play = document.getElementsByClassName("play")[0];
var time = document.getElementsByClassName("time")[0];
var progressBar = document.getElementsByClassName("progress_bar")[0];
var quick = document.getElementsByClassName("quick")[0];
var quickList = document.getElementsByClassName("quick_list")[0];
var volAdd = document.getElementsByClassName("vol_add")[0];
var volIns = document.getElementsByClassName("vol_ins")[0];
var fullScreen = document.getElementsByClassName("full_screen")[0];
var liList=quickList.getElementsByTagName('ul')[0].getElementsByTagName("li");

videoPlay.onmouseenter=function(){
    menu.style.display='block';
}

videoPlay.onmouseleave=function(){
    menu.style.display='none';
}

play.onclick=function(){
    if(video.paused){
        video.play();
        play.innerHTML='暂停';
    }else{
        video.pause();
        play.innerHTML='播放';
    }
}

quick.onclick=function(){
    quickList.style.display='block';
}

for(var i=0;i<liList.length;i++){
    (function(j){
        liList[j].onclick=function(){
            if(j==0){
                quick.innerHTML='倍速';
                video.playbackRate=1;
            }else if(j==1){
                quick.innerHTML='x1.25';
                video.playBackRate=1.25;
            }else if(j==2){
                quick.innerHTML='x1.5';
                video.playBackRate=1.5;
            }else{  
                quick.innerHTML='x2';
                video.playBackRate=2;
            }
        }
    }(i))
}

volAdd.onclick=function(){
    video.volume=video.volume+0.1>=1?1:video.volume+0.1;
}

volIns.onclick=function(){
    video.volume=video.volume-0.1<=0?0:video.volume-0.1;
}

progressBar.onmouseenter=function(){
    progressBar.style.height="16px";
    progressBar.style.top='-14px';
    progressBar.getElementsByTagName('div')[0].style.height='16px';
    progressBar.getElementsByTagName("i")[0].style.height='18px';
}

progressBar.onmouseleave=function(){
    progressBar.style.height = "2px";
    progressBar.style.top = "-2px";
    progressBar.getElementsByTagName("div")[0].style.height = "2px";
    progressBar.getElementsByTagName("i")[0].style.height = "6px";
}

progressBar.onclick=function(e){
    var locationX=e.pageX-this.offsetLeft;
    console.log(locationX);
    var width=this.offsetWidth;
    console.log(width);
    var targetTime=locationX/width*video.duration;
    video.currentTime=targetTime;
    // pTime();
}

var timer=null;
function pTime(){
    timer=setInterval(function(){
        var pWidth=video.currentTime/video.duration*progressBar.offsetWidth;
        progressBar.getElementsByTagName("div")[0].style.width=pWidth+"px";
        progressBar.getElementsByTagName("i")[0].style.left=pWidth+"px";
        var nT=(parseInt(video.currentTime/60)<10?"0"+parseInt(video.currentTime/60):parseInt(video.currentTime/60));
        var tT=(parseInt(video.duration/60)<10?"0"+parseInt(video.duration/60):parseInt(video.duration/60));
        console.log(tT,nT);
        var nTs=(parseInt(video.currentTime%60)<10?"0"+parseInt(video.currentTime%60):parseInt(video.currentTime%60));
        var tTs=(parseInt(video.duration%60)<10?"0"+parseInt(video.duration%60):parseInt(video.duration%60));
        // console.log(nTs);
        // time.innerHTML= parseInt(video.currentTime / 60) + ":" + parseInt(video.currentTime % 60) + " / " + parseInt(video.duration / 60) + ":" + parseInt(video.duration % 60);
    },1000)     
}
pTime();

fullScreen.onclick=function(e){
    
}

