var mouse={
    init:function(options){
        var self=this;
        this.initData(options);
        this.renderScore();
        this.handle();
        // console.log(this.el)
        this.timer=setInterval(function(){
            self.renderMouse();
            // console.log(8)
        },this.speed);
    },
    initData(options){
        this.el=options.el;
        this.holes=this.el.getElementsByClassName("holes")[0];
        this.holeList=this.el.getElementsByClassName("hole");
        this.holeLength=this.holeList.length;
        this.score=0;
        this.scoreNode=this.el.getElementsByTagName('span')[0];
        this.holeArr=this.createArr(this.holeLength);
        this.speed=1000;
    },
    renderScore(){
        this.scoreNode.innerText=this.score;
    },
    createArr(length){
        var arr=[];
        for(var i=0;i<length;i++){
            arr.push(i);
        }
        console.log(arr)
        return arr;
    },
    randNum(){
        var ranNum=Math.floor(Math.random()*this.holeArr.length);
        return this.holeArr.splice(ranNum,1);
    },
    renderMouse(){
        mouse=document.createElement("div");
        mouse.className='mouse';
        var index=this.randNum();
        mouse.num=index;
        // this.holeArr.splice(index,1);
        // console.log(index);
        this.holeList[index].appendChild(mouse);

        if(this.isFill()){
            this.failGame();
        }
    },
    isFill(){
        if(this.holeArr.length){
            return false;
        }else{
            return true;
        }
    },
    failGame(){
        // alert("失败");
        var self=this;
        clearInterval(this.timer);
        setTimeout(function(){
            alert('游戏失败');
            self.score=0;
            self.renderScore();
            self.clearMouse();
        },300);
    },
    clearMouse(){
        var mouseList=this.el.getElementsByClassName("mouse");
        var mouseLength=mouseList.length;
        
    },
    handle(){
        this.handleMouseDown();
        this.handleMouseUp();
    },
    handleMouseDown(){
        var self=this;
        this.holes.onmousedown=function(e){
            // console.log(e.target);
            if(e.target.className=='mouse'){
                self.hit('down');
                self.mouseClick(e.target);
            }else{
                self.holeClick();
            }
        }
    },
    handleMouseUp(){
        var self=this;
        this.holes.onmouseup=function(e){
            self.hit('up');
        }
    },
    hit(state){
        if(state=='down'){
            this.holes.style.cursor="url('./image/hammerdown.ico'), auto"
        }else{
            this.holes.style.cursor="url('./image/hammer.ico'), auto";
        }
    },
    mouseClick(dom){
        this.holeArr.push(dom.num);
        dom.remove();
        var boom=document.createElement("div");
        boom.className='boom';
        this.holeList[dom.num].appendChild(boom);
        setTimeout(function(){
            boom.remove();
        },300)
        this.addScore(100);
    },
    holeClick(){
        this.addScore(-500);
    },
    addScore(score){
        this.score+=score;
        this.renderScore();
        this.judgeResult(this.changeSpeed);
    },
    judgeResult(){
        if(this.score<0){
            this.failGame();
        }else if(this.score>=0&&this.score<1000){
            this.changeSpeed(1);
        }else if(this.score>1000&&this.score<5000){
            this.changeSpeed(2);
        }else if(this.score>=5000&&this.score<15000){
            this.changeSpeed(3);
        }else{
            this.winGame();
        }
        
    },
    changeSpeed(lev){
        this.speed=1000/lev;
        var self=this;
        clearInterval(this.timer);
        this.timer=setInterval(function(){
            self.renderMouse();
        },this.speed);
    },
    winGame(){     
        clearInterval(this.timer);
        setTimeout(function(){
            alert("你赢了！");
        },300);
    }
}