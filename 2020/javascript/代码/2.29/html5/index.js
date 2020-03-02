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

videoPlay.onmouseenter = function () {
    menu.style.display = 'block';
}
videoPlay.onmouseleave = function () {
    menu.style.display = 'none';
}

play.onclick = function () {
    if (video.paused) {//如果当前的状态是暂停
        //播放方法play()
        video.play();
        play.innerHTML = '暂停';
    }
    else {
        video.pause();
        play.innerHTML = '播放';
    }
}

progressBar.onmouseenter = function () {
    progressBar.style.height = "16px";
    progressBar.style.top = "-14px";
    progressBar.getElementsByTagName("div")[0].style.height = "16px";
    progressBar.getElementsByTagName("i")[0].style.height = "18px";
}

progressBar.onmouseleave = function () {
    progressBar.style.height = "2px";
    progressBar.style.top = "-2px";
    progressBar.getElementsByTagName("div")[0].style.height = "2px";
    progressBar.getElementsByTagName("i")[0].style.height = "6px";
}

//progressBar相对的坐标系是menu
progressBar.onclick = function (e) {
    //e.layerX——相对当前坐标系的border左上角开始的坐标
    var location = e.layerX;
    console.log(location);
    var width = progressBar.clientWidth;
    var targetTime = location / width * video.duration;
    //进度条的时间进行跳转，但是只有http协议具有Content-Range这个属性才能设置时间进行跳转，
    //因此视频需要用服务器开启
    video.currentTime = targetTime;
}

quick.onclick = function () {
    quickList.style.display = 'block';
}

quickList.onmouseleave = function () {
    quickList.style.display = 'none';
}

var liList = quickList.getElementsByTagName("ul")[0].getElementsByTagName("li");
// console.log(liList);
for (var i = 0; i < liList.length; i++) {
    liList[i].index = i;
    liList[i].onclick = function () {
        if (this.index == 0) {//正常
            video.playbackRate = 1;//视频的播放速率
            quick.innerHTML = '倍速';
        } else if (this.index == 1) {//1.25
            video.playbackRate = 1.25;
            quick.innerHTML = "x1.25";
        } else if (this.index == 2) {//1.5
            video.playbackRate = 1.5;
            quick.innerHTML = 'x1.5';
        } else {//2
            video.playbackRate = 2;
            quick.innerHTML = 'x2';
        }
    }
}

//音量加和减控制的属性是volume
volAdd.onclick = function () {
    video.volume = video.volume + 0.1 > 1 ? 1 : video.volume + 0.1;
}

volIns.onclick = function () {
    video.volume = video.volume - 0.1 <= 0 ? 0 : video.volume - 0.1;
}

fullScreen.onclick = function () {
    var dom = document.documentElement;
    dom.requestFullscreen();//使页面全屏
    //页面中的元素全屏是自己算出来的
    videoPlay.style.width = window.screen.width + "px";
    videoPlay.style.height = window.screen.height + "px";
    video.style.width = window.screen.width + "px";
    video.style.height = window.screen.height + "px";
}

setInterval(function () {
    var total = video.duration;//video的总时间，单位是秒数
    var nowTime = video.currentTime;//当前时间，单位是秒数
    time.innerHTML = parseInt(nowTime / 60) + ":" + parseInt(nowTime % 60) + " / " + parseInt(total / 60) + ":" + parseInt(total % 60);
    var width = nowTime / total * progressBar.clientWidth;
    progressBar.getElementsByTagName("div")[0].style.width = width + "px";
    progressBar.getElementsByTagName("i")[0].style.left = width + "px";
}, 1000)