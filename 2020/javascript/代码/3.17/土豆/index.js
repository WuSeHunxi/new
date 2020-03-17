//三个对象

//蓄力条
var bar={
    dom:document.getElementsByClassName("bar")[0],
    el:document.getElementsByClassName("barcontent")[0],
    width:0,
    render(){
        this.el.style.width=this.width+"%";
    },
    start(){
        if(this.runTimer){
            return ;
        }
        var self=this;
        var step=2;
        //xxx.style.xxx--->只能设置不能获取
        this.runTimer=setInterval(function(){
            self.width+=step;
            if(self.width>=100){
                self.width=100;
                step=-step;
                
            }
            if(self.width<=0){
                self.width=0;
                step=-step;
            }
            self.render();
        },16);
    },
    stop(){
        clearInterval(this.runTimer);
        this.runTimer=null;
    },
    clear(){
        this.width=0;
        this.render();
    }
}

// bar.start()

//大地
var land={
    el:document.getElementsByClassName("land")[0],
    left:0,
    render(){
        this.el.style.left=this.left+"px";
    },
    move(distance,time){
        this.left-=distance;
        this.el.style.transition=time+"ms linear";
        // console.log(this.left)
        this.render();
        var self=this;
        setTimeout(function(){
            if(self.left<=-640){
                self.left=640+self.left;
                self.el.style.transition="";
                self.render()
            }
        },time)       
    }
}

land.move(100);

//土豆
var tudou={
    el:document.getElementsByClassName("tudou")[0],
    top:466,
    maxTop:466,
    rotate:0,
    render(){
        this.el.style.top=this.top+"px";
    },
    jump(v){
        var a=2000;
        var t=0.016;
        var self=this;
        var allTime=2*Math.abs(v)/a*1000;
        var hv=Math.abs(v)/2;
        var distance=allTime*hv/1000;
        this.rotate+=90;
        this.el.style.transition="transform "+allTime+"ms linear";
        this.el.style.transform="rotate("+this.rotate+"deg)";
        land.move(distance,allTime);
        this.timer=setInterval(function(){
            var dis=v*t+0.5*a*t*t;
            self.top+=dis;
            v=v+a*t;
            if(self.top>=self.maxTop){
                self.top=self.maxTop;
                clearInterval(this.timer);
                bar.clear()
            }
            // bar.start();
            self.render()
        },t*1000);
    }
}


    window.onmousedown=function(){
        bar.start();
    }

    window.onmouseup=function(){
        bar.stop();
        // var width=bar.el.offsetWidth;
        var speed=(bar.width/100)*(1000-400)+300;
        tudou.jump(-speed);
    }
