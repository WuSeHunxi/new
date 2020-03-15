Puzzle.prototype={
    el:null,
    oPuzzle:null,
    puzzleWdith:0,
    puzzleHeight:0,
    row:0,
    col:0,
    blockWidth:0,
    blockHeight:0,
    puzzleImg:'',
    init(options){
        this.initData(options);
        this.render();
        this.handle();
    },
    initData(options){
        this.el=document.querySelector(options.el);
        this.oPuzzle=document.createElement("div"); 
        this.puzzleWidth=options.data.width;
        this.puzzleHeight=options.data.height;
        this.row=options.data.row;
        this.col=options.data.col;
        this.blockWidth=this.puzzleWidth/this.row;
        this.blockHeight=this.puzzleHeight/this.col;
        this.puzzleImg=options.data.img;
        this.blockImgPosition=this.getBlockImgPosition();
        this.blockPosition=this.getBlockPosition();
    },
    getBlockImgPosition(){
        //把背景图片的位置放到一个数组中
        var arr=[];
        for(var i=0;i<this.row;i++){
            for(var j=0;j<this.col;j++){
                arr.push({
                    x:i*this.blockWidth,
                    y:j*this.blockHeight
                })
            }
        }
    },
    getBlockPosition(){
        var newArr=[];
        var length=this.row*this.col;
        for(var i=0;i<length;i++){
            newArr[i]=this.blockImgPosition[i];
        }
        var lastEle=newArr[newArr.length-1];
        newArr.length=newArr.length-1;
        newArr.sort(Math.random()-0.5);
        newArr.push(lastEle);
        return newArr;
    },
    render(){
        var length=this.row*this.col;
        var tempalte="";
        for(var i=0;i<length;i++){
            var blockImgX=this.blockImgPosition[i].x;
            var blockImgY=this.blockImgPosition[i].y;
            var blockPositionX=this.blockPosition[i].x;
            var blockPositionY=this.blockPosition[i].y;
            var isLastEle=i===this.blockPosition.length-1;
            tempalte+=`
                <div class="block"
                    style="
                        width:${this.blockWidth}px;
                        height:${this.blockHeight}px;
                        left:${blockPositionX}px;
                        top:${blockPositionY}px;
                        background-image:${this.puzzleImg};
                        background-position:${blockImgX}px ${blockImgY}px;
                        opcity:${isLastEle?0:1};
                    "
                    ref="${isLastEle?'empty':'block'}"
                ></div>
                `;
        }
        this.oPuzzle.className="puzzle";
        this.oPuzzle.style.width=this.puzzleWidth+"px";
        this.oPuzzle.style.height=this.puzzleHeight+"px";
        this.oPuzzle.innerHTML=tempalte;
        this.el.appendChild(this.oPuzzle);  
    },
    handle(){
        var self=this;
        this.oPuzzle.onclick(function(e){
            if(e.target.ref=='block'){
                this.handleBlock(e.target);
            }
        })
    },
    handleBlock(dom){
        var canMove=this.checkMove(dom);
        if(!canMove){
            return ;
        }
        this.moveBlock(dom);
        this.checkWin();
    },
    checkMove(dom){
        //根据行和列进行判断-->仅仅是判断，出现的行和列属于另一个功能
        var blockIndex=this.getEleIndex(dom);
        var blockRow=blockIndex.row;
        var blockCol=blockIndex.col;
        var lastEle=document.querySelector("data[ref='empty']");
        var emptyIndex=this.getEleIndex(lastEle);
        var emptyRow=emptyIndex.row;
        var emptyCol=emptyIndex.col;
        if(emptyCol==blockCol&&Math.abs(emptyRow-blockRow)==1||
            emptyRow==blockRow&&Math.abs(emptyCol-blockRow==1)){
                return true;
            }else{
                return false;
            }
    },
    getEleIndex(dom){
        var row=Math.round(dom.style.left/this.blockHeight);
        var col=Math.round(dom.style.height/this.blockWidth);
        return {
            row:row,
            col:col
        }
    },
    moveBlock(dom){
        var blockLeft=dom.style.left;
        var blockTop=dom.style.top;
        var oEmptyBlock=document.querySelector("data[ref='empty']");
        dom.style.left=oEmptyBlock.style.left+"px";
        dom.style.top=oEmptyBlock.style.top+"px";
        oEmptyBlock.style.left=blockLeft+"px";
        oEmptyBlock.style.top=blockTop+"px";
    },
    checkWin(){
        var oBlockList=document.querySelectorAll('data[ref="block"]');
        var isWin=true;
        for(var i=0;i<oBlockList.length;i++){
            var oBLock=oBlockList[i];
            // 将字符串转化成数字更方便比较大小
            var blockLeft=parseInt(oBlock.style.left);
            var blockTop=parseInt(oBLock.style.top);
            var imgLeft=parseInt(oBlock.style.backgroundPositionX);
            var imgTop=parseInt(oBlock.style.backgroundPositionY);
            if(!blockLeft==imgLeft&&blockTop==imgTop){
                isWin=false;
                break;
            }
        }
        if(isWin){
            this.winGame();
        }
    },
    winGame(){
        var lastEle=document.querySelector('data[ref="empty"]');
        setTimeout(function(){
            alert("你赢了！");
            lastEle.style.opcity=1;
        },300);
        this.oPuzzle.onclick=null;
    }
}



function Puzzle(options){
    this.init(options);
}