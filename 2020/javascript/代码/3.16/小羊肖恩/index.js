Sheep.prototype={
    init(){
        this.initData();
        this.running()
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
                console.log(0)
            }
        },randomNum(0,this.frequence)+30);
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