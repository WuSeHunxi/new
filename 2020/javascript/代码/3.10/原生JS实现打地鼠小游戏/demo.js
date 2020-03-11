var hitMouse={
    el:null,
    score:0,
    oHoles:null,
    oHoleList:[],
    holeLength:0,
    randomArr:[],
    timer:null,
    speed:1000,
    init:function(){
        this.initData(options);
    },
    initData(options){
        this.el=options.el;
        this.oHoles=this.el.getElementsByClassName('holes')[0];
        this.oHoleList=this.el.getElementsByClassName("hole");
        this.holeLength=this.oHoleList.length;
        this.randomArr=this.getRandomArr(this.holeLength);
    },
    getRandomArr(length){
        var arr=[];
        for(var i=0;i<length;i++){
            arr.push(i)
        }
        return arr;
    },
    renderScore(){
        var oScore=this.el.getElementsByClassName("score")[0];
        oScore.innerText=this.score;
    },
    showMouse(){
        var randonNum=this.getRandomNum();
        var oHoleList=this.oHoleList;
        var oMouse=document.createElement("div");
        oMouse.setAttribute('class','mouse');
        oMouse.num=randomNum;
        oHoleList[randomNum].appendChild(oMouse);
        if(this.checkFail()){
            this.failGame()
        }
    },
    getRandomNum(){
        var randomArrLength=this.randomArr.length;
        var ranNum=Math.floor(Math.random()*randomArrLength);
        var num=this.randomArr.splice(ranNum,1);
        return num;
    },
    checkFail(){
        if(this.randomArr.length==0){
            return true;
        }else{
            return false;
        }
    },
    failGame(){
        var self=this;
        clearInterval(this.timer);
        setTimeout(function(){
            self.score=0;
            self.renderScore();
            self.clearMouse();
        },300);
    },
    clearMouse(){
        var oMouseList=this.el.getElementsByClassName("mouse");
        var mouseLength=oMouseList.length;

    },
    handle(){
        this.handleHolesDown();
        this.handleHoleUp();
    },
    handleHolesDown(){
        var self=this;
        this.oHoles.onmousedown=function(e){
            self.hit('down');
            var isMouse=e.target.classList.contains('mouse');
            var isHoles=e.target.classList.contains('hole');
            if(isMouse){
                slef.handleMouseClick(e.target);
            }else if(isHoles){
                slef.handleHoleClick();
            }
        }
    },
    handleHoleUp(){
        var self=this;
        this.oHoles.onmouseup=function(){
            self.hit('up');
        }
    },
    hit(attr){
        // this.oHoles
        if(attr=='down'){
            this.oHoles.style.cursor="url('./image/hammerdown.ico'), auto"
        }else if(attr=='up'){
            this.oHoles.style.cursor= "url('./image/hammer.ico'), auto";
        }
    },
    handleMouseClick(dom){
        var num=dom.num;
        this.randomArr.push(num);
        this.renderBoom(dom);
        this.addScore(100); 
    },
    handleHoleClick(){
        this.addScore(-500);    
    },
    renderBoom(dom){
        var boom=document.createElement("div");
        boom.setAttribute('class','boom');
        var hole=dom.parentNode;
        hole.appendChild(boom);
        setTimeout(function(){
            boom.remove();
        },300);
    },
    addScore(score){
        this.score+=score;
        this.renderScore();
        this.judgeResult();
    },
    judgeResult(){
        var score=this.addScore;
        if(score<0){
            this.failGame();
        }else if(score>=0&&score<1000){
            this.level(1);
        }else if(score>=1000&&score<5000){
            this.level(2);
        }else if(score>=5000&&score<=15000){
            this.level(3);
        }else{
            this.winGame();
        }
    },
    level(lev){
        if(this.speed==1000){
            return;
        }
        this.speed=1000/lev;
        var self=this;
        clearInterval(this.timer);
        this.timer=setInterval(function(){
            self.showMouse();
        },this.speed);
    },  
    winGame(){
        clearInterval(this.timer);
        setTimeout(function(){
            alert('You are the winner');
        },300);
    }
}