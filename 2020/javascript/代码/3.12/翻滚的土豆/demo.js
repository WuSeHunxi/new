//全局配置
var config={
    width=640,
    mixSpeed:400,
    maxSpeed:1000
}

//蓄力条
var bar={
    dom:document.querySelector(".bar-content"),
    value:0,
    timerId:null,
    render:function(){
        this.dom.style.width=this.value+"%";
    },
    start:function(){
        if(this.timerId){
            return ;
        }
        var step=2;
        var self=this;
        this.timerId=setInterval(function(){
            self.value+=step;
            if(self.value>=100){
                self.value=100;
                step=-step;
            }else if(self.value<=0){
                self.value=0;
                step=-step;
            }
            self.render();
        },16)
    },
    clear:function(){
        clearInterval(this.timerId);
        this.timerId=null;
    }
}

//大地
var land={
    dom:document.querySelector(".land"),
    left:0,
    timerId:null,
    render:function(){
        this.dom.style.left=this.left+"px";
    },
    move:function(distance,duration){
        this.dom.style.tranisition=duration+"ms linear";
        this.left-=distance;
        this.render();
        setTimeout(function(){
            if(that.left<-config.width){
                that.dom.style.tranisition="";
                this.left=config.width;
                that.render();
            }

        },duration);
    }
}

//土豆
var tudou={
    dom:document.querySelector(".tudou"),
    top:446,
    maxTop:446,
    
}
