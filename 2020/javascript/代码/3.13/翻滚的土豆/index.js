

//蓄力条
var bar={
    dom:document.getElementsByClassName("bar-content")[0],
    value:0,
    timer:null,
    init(){
        this.start();
    },
    render(){
        this.dom.style.width=this.value+"%";
    },
    start(){
        if(this.timer){
            return ;
        }
        var self=this;
        var step=2;
        this.timer=setInterval(function(){
            self.value+=step;
            if(self.value>=100){
                self.value=100;
                step=-step;
            }else if(self.value<=0){
                self.value=0;
                step=-step;
            }      
            self.render();
        },16);
    },
    stop(){
        clearInterval(this.timer);
        this.timer=null;
        // console.log(this.timer);
    },
    clearWidth(){
        this.value=0;
        this.render()
    }
}

// bar.init();
//大地
var land={
    dom:document.getElementsByClassName("land")[0],
    left:0,
    timer:null,
    render(){
        this.dom.style.marginLeft=this.left+"px";
    },
    move(distance,time){
        this.dom.style.transition=time+'ms linear';
        var self=this;
        self.left-=distance;
        self.render();
        setTimeout(function(){
            if(self.left<=-640){
                self.dom.style.transition='';
                self.left=self.left+640;
                self.render();
            }
        },time)
    }
}

land.move(200,100)

//土豆
var tudou={
    dom:document.getElementsByClassName("tudou")[0],
    top:466,
    maxTop:466,
    timer:null,
    rotate:'',
    jump(v){
        if(this.timer){
            return ;
        }
        var self=this;
        this.rotate+=90;
        var t=0.016;
        var a=2000;
        var runTime=(2*Math.abs(v)/a)*1000;
        this.dom.style.transition='tranform'+ runTime +'ms linear';
        var lv=Math.abs(v)/2;
        var lanX=lv*runTime/1000;
        land.move(lanX,runTime);
        this.timer=setInterval(function(){
            var dis=v*t+0.5*a*t*t;
            self.top+=dis;
            v=v+a*t;
            if(self.top>=self.maxTop){
                self.top=self.maxTop;
                clearInterval(self.timer);
                self.timer=null;
                bar.clearWidth();
            }
            self.render();
        },t*1000);
    },
    render(){
        this.dom.style.transform='rotate('+this.rotate+')deg';
        this.dom.style.top=this.top+"px";
    }
}

function bindEvent(){
    window.onmousedown=function(){
        bar.start();
    }

    window.onmouseup=function(){
        bar.stop();
        var speed=(bar.value/100)*(1000-300)+300;
        tudou.jump(-speed);
    }
}

bindEvent();