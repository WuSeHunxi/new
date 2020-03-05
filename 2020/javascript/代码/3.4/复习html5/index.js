(function(){

    var btn=document.getElementsByClassName("btn")[0];
    var radio=document.getElementsByClassName("radio")[0];
    var add=document.getElementsByClassName("add")[0];
    var ins=document.getElementsByClassName("ins")[0];
    var video=document.getElementsByTagName("video")[0];
    var liList=document.getElementsByTagName("li");
    var ulBtn=document.getElementsByTagName("ul")[0];

    function bindEvent(){
        btn.onclick=function(){
            if(video.paused){
                video.play();
                this.innerHTML='暂停';
            }else{
                video.pause();
                this.innerHTML='播放';
            }
        }

        radio.onclick=function(){
            ulBtn.style.display="block";
        }

        ulBtn.onmouseleave=function(){
            this.style.display='none';
        }

        for(var i=0;i<liList.length;i++){
            
            (function(index){
                liList[index].onclick=function(){
                    if(index==0){                           
                        video.playbackRate=1;
                        radio.innerHTML='倍速';
                    }else if(index==1){
                        video.playbackRate=1.25;
                        radio.innerHTML='x1.25';
                    }else if(index==2){
                        video.playbackRate=1.5;
                        radio.innerHTML='x1.5';
                    }else{
                        video.playbackRate=2;
                        radio.innerHTML='x2';
                    }
                }
            }(i))
        }

        add.onclick=function(){
            video.volume=video.volume+0.1>=1?1:video.volume+0.1;
        }

        ins.onclick=function(){
            video.volume=video.volume-0.1<=0?0:video.volume-0.1;
        }
    }

    bindEvent();

}())