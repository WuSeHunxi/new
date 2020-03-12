var mouse={
    init(){
        var self=this; 
        this.initData();
        this.handle();
        this.timer=setInterval(function(){
            self.renderMouse()
        },this.speed); 
    },
    initData(){   
         
        this.wrapper=document.getElementsByClassName("wrapper")[0];
        this.holeList=this.wrapper.getElementsByClassName('hole');
        this.hole=this.wrapper.getElementsByClassName("holes")[0];
        this.scoreNode=this.wrapper.getElementsByTagName("span")[0];
        this.score=0;
        this.listLength=this.holeList.length;
        this.speed=1000;   
        this.holeArr=this.pushArray();  
        
    },
    renderScore(){
        this.scoreNode.innerText=this.score;
    },
    pushArray(){
        var arr=[];
        for(var i=0;i<this.listLength;i++){
            arr.push(i);
        }
        return arr;
    },
    rangeNum(){
        var num=Math.floor(Math.random()*this.holeArr.length);
        return this.holeArr.splice(num,1);
    },
    renderMouse(){
        var mouse=document.createElement("div");
        mouse.className='mouse';
        var num=this.rangeNum();
        mouse.num=num;
        // console.log(num)
        this.holeList[num].appendChild(mouse);

        if(this.isFill()){
            this.failGame();
        }
    },
    isFill(){
        if(this.holeArr.length==0){
            return true;
        }else{
            return false;
        }
    },
    failGame(){
        var self=this;
        clearInterval(this.timer);
        setTimeout(function(){
            alert("你失败了！");
            self.score=0;
            self.renderScore();
            self.clearMouse();
        },300);
    },
    clearMouse(){
        var oMouseList=document.getElementsByClassName('mouse')
        var length=oMouseList.length;
        // console.log(length)
        for(var i=0;i<length;i++){
            var j=0;
            var mouse=oMouseList[j];
            mouse.remove()
        }
    },
    handle(){
        this.handleDown();
        this.handleUp();
    },
    handleDown(){
        var self=this;
        this.hole.onmousedown=function(e){
            self.styleCursor('down');
            var name=e.target.className;
            if(name=='mouse'){
                var num=e.target.num;
                self.holeArr.push(num);
                self.renderBoom(num);
                e.target.remove();
                self.addScore(100);
            }else{
                self.addScore(-500);
            }
        }
        
    },
    handleUp(){
        var self=this;
        this.hole.onmouseup=function(){
            self.styleCursor('up');
        }
    },
    styleCursor(status){
        if(status=='down'){
            this.hole.style.cursor="url('./image/hammerdown.ico'), auto";
        }else{
            this.hole.style.cursor="url('./image/hammer.ico'), auto";
        }
    },
    renderBoom(num){
        var boom=document.createElement("div");
        boom.className='boom';
        this.holeList[num].appendChild(boom);
        setTimeout(function(){
            boom.remove()
        },300);
    },
    addScore(score){
        this.score+=score;
        this.renderScore();
        this.judgeResult();
    },
    changeSpeed(lev){
        var self=this;
        this.speed=1000/lev;
        clearInterval(this.timer);
        this.timer=setInterval(function(){
            self.renderMouse();
        },this.speed);
    },
    judgeResult(){
        if(this.score<0){
            this.failGame();
        }else if(this.score>=0&&this.score<500){
            this.changeSpeed(1);
        }else if(this.score>=500&&this.score<1200){
            this.changeSpeed(2);
        }else if(this.score>=1200&&this.score<2000){
            this.changeSpeed(3);
        }else if(this.score>=2000){
            this.winGame();
        }
    },
    winGame(){
        var self=this;
        clearInterval(this.timer);
        setTimeout(function(){
            alert("你赢了！");
            self.clearMouse();
        },300);
    }
}

mouse.init();
mouse.pushArray()
// mouse.renderMouse()
// console.log(mouse.rangeNum())