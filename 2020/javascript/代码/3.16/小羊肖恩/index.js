Sheep.prototype={
    init(){
        this.initData();
        this.createSheep()
        this.running();
    },
    initData(){
        this.dom.className="sheep"
        this.wrapper.appendChild(this.dom);
    },
    running(){
        var self=this;
        this.selfTimer=setInterval(function(){
            self.dom.style.left=self.dom.offsetLeft-self.speed+"px";
            self.dom.style.backgroundPosition=(self.imgX)+"px "+self.imgY+"px";
            self.imgX-=164;
            if(self.imgX==-1312){
                self.imgX=0;
            }
            if(self.dom.offsetLeft<=-164){
                clearInterval(this.selfTimer);
                self.dom.remove()
                // console.log(0)
            }
        },randomNum(0,this.frequence)+30);
    },
    createSheep(){
        var self=this;
        this.createTimer=setInterval(function(){
            // console.log(self.wrapper.children)
            if(self.wrapper.children.length<=5){
                new Sheep({
                    el:document.getElementsByClassName("wrapper")[0],
                    speed:10,
                    frequence:70,
                    imgPosition:{
                        x:0,
                        y:0
                    },
                })
                self.bindEvent();
            }
            
        },1000);
    },
    bindEvent(){
        var self=this;
        this.dom.onmousedown=function(e){
            var x=e.pageX;
            var y=e.pageY;
            self.speed=0;
            self.imgY=-128;
            document.onmousemove=function(e){
                var chax=e.pageX-x;
                var chay=e.pageY-y;
                self.dom.style.left=chax+"px";
                self.dom.style.top=chay+"px";
            }

            document.onmouseup=function(){
                document.onmousemove=null;
                self.speed=10;
                self.imgY=0;
            }
        }
    }
}

function Sheep(options){
    this.wrapper=options.el;
    this.dom=document.createElement("div");
    this.speed=options.speed;
    this.frequence=options.frequence;
    this.imgX=options.imgPosition.x;
    this.imgY=options.imgPosition.y;
    this.init()
}

function randomNum(low,high){
    return Math.random()*(high-low)+low;
}