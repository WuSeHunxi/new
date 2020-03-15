var sheep={
    options:{
        backPostion:0,
        speed:8,
        frequence:70,
        stage:document.getElementsByClassName("stage")[0],
        top:0
    },
    init(){
        this.createSheep();
        // console.log(0);
        this.moreSheep();
    },
    createSheep(){
        function Sheep(options){
            this.dom=document.createElement("div");
            this.speed=options.speed;
            this.frequence=options.frequence;
            this.stage=options.stage
            this.dom.className="sheep";
            this.backPostion=options.backPostion;
            this.top=0;
            this.stage.appendChild(this.dom);
            this.curspeed=this.speed;
        }

        Sheep.prototype.selfRunning=function(){
            var self=this;
            // console.log(self)
            var width=this.dom.offsetWidth;
            // console.log(this.curspeed)
            this.running=setInterval(function(){
                self.backPostion+=width;
                if(self.backPostion==1312){
                    self.backPostion=0;
                }
                self.dom.style.backgroundPosition=-self.backPostion+"px "+ self.top+"px";
                self.dom.style.left=self.dom.offsetLeft-self.speed+"px";
                if(self.dom.offsetLeft<=-width){
                    clearInterval(self.running);
                    self.dom.remove()
                }
            },randomNum(0,this.frequence)+30);
        }
        return new Sheep(this.options);
    },
    moreSheep(){
        var self=this;
        // console.log(this.options.stage.children)
        this.createTimer=setInterval(function(){
            if(self.options.stage.children.length<=5){
                var sheep=self.createSheep();
                sheep.selfRunning()
                self.bindEvent(sheep);
            }
            
        },1000);
        
    },
    bindEvent(sheep){
        var self=this;
        sheep.dom.onmousedown=function(e){
            //在事件中需要注意的是修改的是谁身上的内容，options本来就是初始化，我们要修改的是羊身上的内容
            sheep.speed=0;
            var x=e.pageX;
            var y=e.pageY;
            sheep.top=-128;
            document.onmousemove=function(e){
                var chax=e.pageX-x;
                var chay=e.pageY-y;
                sheep.dom.style.left=chax+sheep.dom.offsetLeft+"px";
                sheep.dom.style.top=chay+sheep.dom.offsetTop+"px";
                
                //注意每次修改的是先鼠标按下的那个点
                x=e.pageX;
                y=e.pageY;
            }

            document.onmouseup=function(){
                document.onmousemove=null;
                self.top=0;
                self.speed=sheep.curspeed;
            }
        }
    }
}

function randomNum(low,high){
    return Math.random()*(high-low)+low;
}

sheep.init()