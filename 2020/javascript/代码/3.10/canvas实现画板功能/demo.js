var canvas={
    can:document.getElementsByClassName("canvas")[0],
    ctx:document.getElementsByClassName('canvas')[0].getContext("2d"),
    allBtns:document.getElementsByTagName("ul")[0].getElementsByTagName("input"),
    colorBtn:document.getElementById("color"),
    rangeBtn:document.getElementById("range"),
    ulNode:document.getElementsByTagName("ul")[0],
    imgArr:[],
    init:function(){
        this.ctx.lineCap='round';
        this.ctx.lineJoin='round';
        this.drawing();
        this.btnClick();
    },
    drawing:function(){
        var self=this;
        this.can.onmousedown=function(e){
            var x=e.pageX,
                y=e.pageY,
                left=self.can.offsetLeft,
                top=self.can.offsetTop;
            self.ctx.beginPath();
            self.ctx.moveTo(x-left,y-top);
            var img=self.ctx.getImageData(0,0,self.can.offsetWidth,self.can.offsetHeight);
            self.imgArr.push(img);
            console.log(x-left)

            document.onmousemove=function(e){
                self.ctx.lineTo(e.pageX-left,e.pageY-top);
                // self.closePath();
                self.ctx.stroke();
            }

            document.onmouseup=function(){
                document.onmousemove=null;
                self.ctx.closePath();
            }
        }
    },
    btnClick:function(){
        var self=this;
        this.ulNode.onclick=function(e){
            // console.log(e.target.id);
            switch (e.target.id){
                case 'clear':
                    self.ctx.clearRect(0,0,700,330);
                    break;
                case 'eraser':
                    self.ctx.strokeStyle="#fff"
                    break;
                case 'reset':
                    if(self.imgArr.length>0){
                        self.ctx.putImageData(self.imgArr.pop(),0,0);
                    }
                    break;
            }
        }

        this.colorBtn.onchange=function(){
            self.ctx.strokeStyle=this.value;
        }

        this.rangeBtn.onchange=function(){
            self.ctx.lineWidth=this.value;
        }
    }
}

canvas.init();

// console.log(canvas.can,canvas.ctx)