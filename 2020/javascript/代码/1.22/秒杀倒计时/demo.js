var times = document.getElementsByClassName("time")[0];
var endDec = document.getElementsByClassName("end")[0];
var hours = document.getElementsByClassName("hour")[0];
// console.log(hour);
var minutes = document.getElementsByClassName("minute")[0];
var seconds = document.getElementsByClassName("second")[0];
var timeData={
    startTime:1579611600000,
    continueTime:14400
};

function setTime(){
    var result={};
    var curTime=new Date();
    var start=new Date(timeData.startTime);
    hour=start.getHours();
    minute=start.getMinutes();
    second=start.getSeconds();
    // console.log(hour,minute);
    times.innerHTML=(hour>=10?hour:"0"+hour)+":"+(minute>=10?minute:"0"+minute)+"场";
    // console.log(times.innerHTML);
    //比较的是秒数
    if(curTime.getTime()<start.getTime()){
        // console.log(cur  Time.getTime()<start.getTime());
        endDec.innerHTML='距离活动开始还有';
        var minTime=(start.getTime()-curTime.getTime())/1000;
        hours.innerHTML=Math.floor(minTime/3600);
        minutes.innerHTML=Math.floor((minTime%3600)/60);
        seconds.innerHTML=Math.floor((minTime%3600)%60);
        console.log(hours.innerHTML);
    }else{
        if(curTime.getTime()<start.getTime() + timeData.continueTime * 1000){
            endDec.innerHTML="距离活动结束还有";
            var minTime=(start.getTime()+timeData.continueTime*1000-curTime.getTime());
            hours.innerHTML=Math.floor(minTime/3600>=10?minTime/3600:"0"+minTime/3600);
            minutes.innerHTML=Math.floor(minTime%60/60>=10?minTime%60/60:"0"+minTime%60/60);
            seconds.innerHTML=Math.floor(minTime%3600%60?minTime%3600%60:"0"+minTime%3600%60);
            console.log(seconds.innerHTML);
        }else{
            endDec.innerHTML='活动已经结束';
            hours.innerHTML=minutes.innerHTML=seconds.innerHTML=0;
        }
    }
}

setTime();
