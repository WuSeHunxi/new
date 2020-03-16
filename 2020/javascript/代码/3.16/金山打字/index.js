var board={
    dom:document.createElement("div"),
    get:0,
    lost:0,
    maxLost:2,
    getNode:document.getElementsByClassName("get")[0],
    lostNode:document.getElementsByClassName("lost")[0],
    render(){
        this.getNode.innerHTML=this.get;
        this.lostNode.innerHTML=this.lost+"/"+this.maxLost;
    },
    getLost(){            
        if(this.lost>=this.maxLost){
            return;
        }
        this.lost++;
        this.render();
    },
    getScore(){
        if(this.maxLost==this.lost){
            return;
        }
        this.get++;
        this.render();     
    }
}

Letter.prototype={
    init(){
        this.initData();
        // this.render();
        this.gameResult();
        this.downRun();
        this.bindEvent();
        
    },
    initData(){ 
        // console.log(0)
        this.speed=10;
        this.top=-100;
        this.dom=document.createElement("div");
        this.letterContainer=document.getElementsByClassName("letters-container")[0];
        this.dom.className="letter";  
        this.imgRandom=String.fromCharCode(parseInt(randNum(65,65+21)));
        this.dom.style.backgroundImage='url("img/letter/'+this.imgRandom+'.png")';
        this.letterContainer.appendChild(this.dom);
        this.dom.style.left=randNum(0,this.letterContainer.clientWidth-this.dom.offsetWidth)+"px";
    },
    render(){
        this.dom.style.top=this.dom.offsetTop+this.speed+'px';
    },
    downRun(){
        var self=this;
        this.runTimer=setInterval(function(){
            // console.log(self.dom.offsetTop)
            if(self.dom.offsetTop>=self.letterContainer.clientHeight-100){
                self.dom.remove()
                board.getLost()
            }
            self.render();
        },randNum(50,100));
        console.log(this.runTimer);
    },
    bindEvent(){
        var self=this;
        window.onkeydown=function(e){
            var key=e.key.toUpperCase();
            console.log(key,self.imgRandom)
            if(key==self.imgRandom){            
                console.log(10)
                self.dom.remove();
                board.getScore();
            }            
        }
    },
    gameResult(){
        var self=this;
        console.log('p')
        console.log(this)
        console.log(this.runTimer);
        var mask=document.getElementsByClassName("game-over")[0];
        if(board.maxLost==board.lost){
            clearInterval(timer);
            clearInterval(self.runTimer);
            mask.style.display="block";
            window.onkeydown='null';
        }
    }
}


var timer=null;
function createLetters(){
    timer=setInterval(function(){
        new Letter();
    },2000);
}

createLetters();

function Letter(){
    this.init()
}

function randNum(low,high){
    return Math.random()*(high-low)+low;
}