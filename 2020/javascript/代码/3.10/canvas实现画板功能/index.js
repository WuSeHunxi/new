var canvas={
    canvas:document.getElementsByTagName("canvas")[0],
    ctx:document.getElementsByTagName("canvas")[0].getContext('2d'),
    colorBtn:document.getElementById("color"),
    rangeBtn:document.getElementById('range'),
    ulNode:document.getElementsByTagName("ul")[0],
    btnAlls:document.getElementsByTagName('ul')[0].getElementsByTagName("input"),
    imgArr:[],
    init:function(){
        this.ctx.lineCap='round';
        this.ctx.lineJoin='round';
        this.drawing();
        this.allClick();
    },
    drawing:function(){
        var self=this;
        var top=this.canvas.offsetTop,
            left=this.canvas.offsetLeft;
        this.canvas.onmousedown=function(e){
            var e_x=e.pageX;
            var e_y=e.pageY;
            self.ctx.beginPath();
            self.ctx.moveTo(e_x-left,e_y-top);
            var img=self.ctx.getImageData(0,0,700,330);
            self.imgArr.push(img);
            document.onmousemove=function(e){
                self.ctx.lineTo(e.pageX-left,e.pageY-top);
                self.ctx.stroke();
            }
            document.onmouseup=function(){
                document.onmousemove=null;
                self.ctx.closePath();
            }
        }   
    },
    allClick:function(){
        var self=this;
        this.ulNode.onclick=function(e){
            console.log(e.target.id);
            switch (e.target.id){
                case 'clear':
                    self.ctx.clearRect(0,0,700,330);
                    break;
                case 'eraser':
                    self.ctx.strokeStyle='#fff';
                    break;
                case 'reset':
                    self.ctx.putImageData(self.imgArr.pop(),0,0);
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